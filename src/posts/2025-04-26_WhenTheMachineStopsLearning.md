---
title: "When The Machine Stops Learning: Reviving a Collapsed Neural Network"
date: "2025-04-26"
tags: ["machine learning", "neural networks", "debugging", "ai"]
---

Following last week's thoughts on the lean coding style of data scientists, my second week at the Machine Learning Institute has involved a lot of debugging neural networks. I experienced the fascinating yet frustrating phenomenon of model collapse whilst working on a search engine using the [MS MARCO](https://microsoft.github.io/msmarco/) dataset. This highlighted not just technical pitfalls, but the iterative nature of machine learning development.

## When it all collapses

Model collapse manifested in our search engine as all documents receiving identical similarity scores of -0.2393 regardless of their actual relevance to a query. Imagine a recommendation system suggesting the same five books to everyone—not particularly useful.

Our task was building a [_two-tower neural network_](https://cloud.google.com/blog/products/ai-machine-learning/scaling-deep-retrieval-tensorflow-two-towers-architecture) ¹ that could encode queries and documents into the same embedding space, allowing us to retrieve relevant documents by finding those closest to the query. The model would learn through [_triplet loss_](https://en.wikipedia.org/wiki/Triplet_loss) ², encouraging query embeddings to be closer to relevant documents than irrelevant ones.

```python
def cosine_similarity(query, document):
    query_norm = torch.norm(query, dim=1, keepdim=True)
    doc_norm = torch.norm(document, dim=1, keepdim=True)
    return torch.sum(
        query * document,
        dim=1
    ) / (query_norm * doc_norm + 1e-8).squeeze()

def triplet_loss_function(
    query,
    relevant_document,
    irrelevant_document,
    margin=0.3
):
    relevant_similarity = cosine_similarity(query, relevant_document)
    irrelevant_similarity = cosine_similarity(query, irrelevant_document)
    # Convert similarity to distance (1 - similarity)
    relevant_distance = 1 - relevant_similarity
    irrelevant_distance = 1 - irrelevant_similarity
    # Compute triplet loss with proper batching (element-wise maximum)
    triplet_loss = torch.clamp(
        relevant_distance - irrelevant_distance + margin, min=0
    )
    return triplet_loss.mean()
```

The function looked sound, but quite soon after training began, every document received the exact same similarity score.

## The parameter puzzle

What made this interesting was that I had just made multiple changes to our training configuration in response to previous results that suggested overfitting:

```python
# Original parameters
MARGIN = 0.3
LEARNING_RATE = 0.003
DROPOUT_RATE = 0.2

# Experimental parameters
MARGIN = 0.2  # Decreased
LEARNING_RATE = 0.0002  # Decreased
DROPOUT_RATE = 0.3  # Increased
WEIGHT_DECAY = 1e-5  # Added
# Plus gradient clipping
```

Like an overcorrection when driving, I had pushed too far in multiple directions simultaneously. I was trying to correct a divergence between [_training and validation loss_](https://medium.com/@penpencil.blr/what-is-the-difference-between-training-loss-validation-loss-and-evaluation-loss-c169ddeccd59) ³ (a classic sign of [_overfitting_](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting) ⁴) with a barrage of regularisation techniques. But instead of guiding the model toward generalisation, I effectively overwhelmed it.

## Data preparation matters

The model architecture used a [_bidirectional GRU_](https://vtiya.medium.com/gru-vs-bi-gru-which-one-is-going-to-win-58a45ede5fba) ⁵ for encoding each "tower" - queries and documents:

```python
from torch import nn # PyTorch's neural network library

class TowerBase(nn.Module):
    def __init__(
        self,
        vocab_size,
        embedding_dim,
        hidden_dim,
        output_dim,
        dropout_rate=0.2,
        skipgram_model,
        freeze_embeddings=True
    ):
        super().__init__()
        # Set up embedding layer (either from SkipGram or new)
        self.embedding = skipgram_model.in_embed
        self.embedding.weight.requires_grad = not freeze_embeddings
        # Bidirectional GRU for encoding
        self.bi_gru = nn.GRU(
            embedding_dim,
            hidden_dim,
            batch_first=True,
            bidirectional=True
        )
        # Projection from GRU output to final embedding space
        self.fc = nn.Linear(hidden_dim * 2, output_dim)
        # Layer normalisation as specified in requirements
        self.layer_norm = nn.LayerNorm(output_dim)
        # Dropout for regularisation
        self.dropout = nn.Dropout(dropout_rate)
```

I chose [_GRU_](https://en.wikipedia.org/wiki/Gated_recurrent_unit) ⁶ over [_LSTM_](https://en.wikipedia.org/wiki/Long_short-term_memory) ⁷ for several reasons: better efficiency-to-performance ratio for MS MARCO's scale, simpler architecture with fewer parameters, sufficient capability for medium-length sequences, and lower memory requirements allowing larger batch sizes.

But the true issue lay in our dataset preparation. Here's how I was preparing _negative samples_ ⁸ for the data triplets (query, relevant document, irrelevant document):

```python
class MSMARCOTripletDataset(Dataset):
    def __init__(
        self,
        df,
        max_query_len=20,
        max_doc_len=200,
        max_neg_samples=5
    ):
        queries = df['queries']
        documents = df['documents']
        labels = df['labels']
        # Process lists of lists structure
        for i in range(len(queries)):
            query = queries[i]
            # List of documents for this query in the dataset
            docs_list = documents[i].tolist()
            # List of labels for these documents
            labels_list = labels[i].tolist()
            # Find positive and negative documents
            pos_idx = labels_list.index(1)
            neg_indices = [j for j in range(
                len(labels_list)) if labels_list[j] == 0]
            pos_doc = docs_list[pos_idx]
            # Limit number of negative samples per positive example
            neg_samples = min(max_neg_samples, len(neg_indices))
            for j in range(neg_samples):
                neg_doc = docs_list[neg_indices[j]]
                self.triplets.append((query, pos_doc, neg_doc))
```

The problem: our negative sampling (the "irrelevant" documents) was taking documents from the "not selected" list of that same query in the MS MARCO dataset, but these "negative" documents could actually be very relevant to the original query, rather than being subtly irrelevant. It turns out the reason why these documents are labelled as "not selected" is because Microsoft's Bing did not use them to formulate the answer for the user, not necessarily becuase it is a [_hard negative_](https://medium.com/@sundardell955/hard-negative-mining-91b5792259c5) ⁹. When using triplet loss, the model learns by comparing distances (described above). If many of our supposed "irrelevant" documents were actually relevant, the model couldn't establish a clear decision boundary.

To fix this, I used randomly selected documents from unrelated queries as negative samples, and treated all documents from the same query (whether "selected" or not) as positive samples. This would mean hard negative mining would need to take place afterwards as a mostly manual process.

## Lessons from the collapse

This experience reinforced several key lessons:

1. **Change one thing at a time**: When debugging, resist the temptation to change multiple parameters simultaneously.
2. **Trust but verify your data pipeline**: Assumptions about data flow can lead to subtle bugs. Log and visualise at each stage.
3. **Understand your loss function**: If your loss function doesn't accurately reflect your problem, your model will optimise for the wrong thing.

The solution wasn't adding more safeguards but returning to basics:

```python
# Simplified configuration that worked
MARGIN = 0.3
TWOTOWERS_LR = 0.003
WEIGHT_DECAY = 0 # removed
DROPOUT_RATE = 0.3
```

By removing [_weight decay_](https://paperswithcode.com/method/weight-decay) ¹⁰, returning the _margin_ ¹¹ and [_learning rate_](https://en.wikipedia.org/wiki/Learning_rate) ¹² to their original values, and keeping just a moderate [_dropout rate_](https://medium.com/biased-algorithms/the-role-of-dropout-in-neural-networks-fffbaa77eee7) ¹³, the model began learning effectively again. However, the [_gradient clipping_](https://medium.com/data-science/what-is-gradient-clipping-b8e815cdfb48) ¹⁴ proved useful in isolation. This simplification, combined with proper embedding initialisation and real negative sampling (albeit without using any hard negatives), brought our document retrieval system back from the brink. The final trained model ran for 11 epochs and yielded a validation accuracy of 99.04%.

## Finding balance

As someone trained in software engineering, I found a certain irony in this situation. In my previous post, I reflected on how data scientists embrace a leaner approach to code compared to the robust, defensive style of software engineers. Yet here I was, overthinking the regularisation of our model—essentially applying too much "defensive coding" to the learning process itself. Sometimes less truly is more.

This debugging experience revealed the inherently iterative nature of machine learning development. Unlike traditional software where we can often reason through problems deterministically, neural networks require a more empirical approach—hypothesise, experiment, observe, repeat.

The most elegant solution isn't the most engineered one—it's the one that gives the model just enough structure to learn without overwhelming it with constraints.

## Glossary

1. **Two Tower Architecture**: Separate encoders for queries and documents to handle their different structures
2. **Triplet Loss**: Trains model to minimise distance between query and relevant documents while maximising distance to irrelevant ones
3. **Training vs Validation Loss**: Training loss measures model performance on training data; validation loss measures it on unseen data to detect overfitting
4. **Overfitting**: When a model performs well on training data but poorly on new data because it's learned noise instead of patterns
5. **Bidirectional GRU**: Combines GRU architecture with bidirectional processing to capture context from both past and future tokens
6. **GRU (Gated Recurrent Unit)**: An RNN variant that better manages information flow using gates
7. **LSTM (Long Short-Term Memory)**: An RNN variant with additional cell state to preserve long-term information
8. **Negative Sampling**: Randomly selecting irrelevant documents to make training manageable
9. **Hard Negative**: Challenging irrelevant document that is semantically similar to the query, making it difficult to distinguish from truly relevant documents
10. **Weight Decay**: Regularisation technique that penalises large weights to prevent overfitting
11. **Margin**: Parameter in triplet loss that defines the minimum desired difference between relevant and irrelevant document distances
12. **Learning Rate**: Controls how much model parameters change during each update step
13. **Dropout rate**: Regularisation technique that randomly disables neurons during training to prevent overfitting
14. **Gradient Clipping**: Prevents exploding gradients by limiting maximum gradient values during training

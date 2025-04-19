---
title: "When Less Is More: Coding Like a Data Scientist"
date: "2025-04-19"
tags: ["data science", "machine learning", "best practice", "software"]
---

Having recently embarked on a machine learning bootcamp at the Machine Learning Institute (MLX), I've been struck by a fascinating contrast in coding styles. Having formally trained in software engineering quite recently, I felt a strange dissonance working with data scientists and how they write their Python code. It was so... lean. Almost sparse compared to the robust, defensive code I'm accustomed to writing. This observation sparked some interesting reflections about the different approaches these two disciplines take to solving problems.

## When two worlds collide

In my first week at MLX, we dove straight into neural networks, which was both exhilarating and slightly overwhelming. During the exploratory data analysis session, I examined my peers' code for how to evaluate features for our MLP model using a simple regression:

```python
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

df = pd.read_csv('data.csv')
df['log_price'] = np.log(df.price)
model = LinearRegression().fit(df[['log_price']], df.sales)
print(model.coef_)
```

Had this been my code, I'd have included error handling, logging, type hints, thorough documentation, and probably split it into multiple functions. What's worse, I'd have probably written a whole spec on how to write it before even starting. But here was the stark reality: this approach was _perfect_ for learning. While my software engineer instincts screamed for more structure, I realised this stripped-down style kept the focus exactly where it needed to be—on understanding the machine learning concepts, not the surrounding code architecture. It is about expressing that logic through simple code.

## Different priorities, different practices

This experience made me reflect more deeply on the fundamental differences between how data scientists and software engineers approach coding. It's not about skill or quality—it's about purpose.

Data scientists typically work in an exploratory, research-oriented environment. Their code serves as both a discovery tool and a means of communication. They prioritise readability, speed of iteration, and flexibility to test hypotheses quickly. Code that clearly shows each step in an analysis is more valuable than code that anticipates every edge case.

Software engineers, on the other hand, build systems that must withstand the unpredictability of production environments. Our code must be robust, maintainable, and scalable. We anticipate failure modes, build defensive code, and optimise for long-term maintainability rather than short-term clarity.

Consider how differently we might approach a data processing task:

**Software engineer's version:**

```python
import logging
from src.config import get_config
from src.utils.data_loader import load_data
from src.app.model import Model

logger = logging.getLogger(__name__)

def main():
    try:
        config = get_config()
        data = load_data(config.data_path)
        model = Model(config.model_params)
        result = model.predict(data)
        logger.info("Prediction completed")
    except FileNotFoundError as e:
        logger.error(f"Data file not found: {e}")
    except Exception as e:
        logger.exception("Unexpected error")

if __name__ == "__main__":
    main()
```

The contrast is striking. Behind this code there is also a great deal of abstracted code that can run in the hundreds of lines compared to the 8 lines needed in the previous example. Both accomplish similar tasks, but with vastly different assumptions about context and purpose.

## Documentation: embedded vs external

In the data science world, I've noticed that documentation takes on a completely different form. Rather than extensive external documentation, data scientists embed their explanations directly within notebooks using markdown cells and descriptive variable names. The code and explanation flow together like a narrative, telling the story of their analysis.

As a software engineer, I'm used to maintaining separate README files, architecture diagrams, API docs, and even wikis. There's a clear separation between code and documentation. While this feels more structured and comprehensive, I can see how the integrated approach favours the rapid iteration that data scientists need.

## Testing: formal vs intuitive

One other difference I've encountered is the approach to testing. In software engineering, we live by our test suites—unit tests, integration tests, end-to-end tests—all automated and running in CI pipelines. Code without tests is considered incomplete at best, dangerous at worst.

Data scientists, however, take a more intuitive approach. Their "tests" might be visual checks of a plot, examining summary statistics, or simply rerunning cells to see if results make sense. They rely on the immediate feedback loop of the notebook environment to catch issues.

In our first week building neural networks, we didn't write a single formal test. Instead, we checked our implementation by sharing outputs and comaring with one another and visualising decision boundaries. Was it rigorous by engineering standards? No. But it was remarkably effective for learning and confirming our understanding.

## CI/CD: pipelines vs exploration

Continuous Integration and Deployment are cornerstones of modern software engineering. We build elaborate pipelines to ensure code quality, run tests, and deploy safely. Every pull request goes through this gauntlet before it can be merged.

Data science workflows, by contrast, are much more fluid. Version control might be used sporadically, or not at all. When it is used, changes are often pushed directly to main branches. Instead of feature development, branches might be used to develop parallel workflows. Code reviews are often conducted in person, looking at notebooks together rather than through formal pull request processes.

At MLX, I feel encouraged to experiment freely without these constraints. It feels almost rebellious coming from a structured engineering background, but I can see how it removes barriers to creativity and exploration.

## Dependencies: locked down vs flexible

In software engineering, managing dependencies is a critical discipline. We use lockfiles, containerisation, and separate dev/prod environments to guarantee consistent behaviour across different systems.

The data science approach is notably more relaxed. A simple requirements.txt or Conda environment often suffices, with less concern for exact version pinning. This flexibility allows for quicker setup and experimentation, albeit with the occasional "it works on my machine" moment.

During the bootcamp setup, we were given a relatively simple environment file without strict version constraints. While this would have made me a bit jittery normally, it worked perfectly for our learning environment where absolute reproducibility was less critical. The code simply needs to run on the specific dataset we need.

## Learning through simplicity

What has become increasingly clear during my bootcamp experience is that the data science approach offers distinct advantages when learning complex concepts like machine learning:

1. **Focus on concepts, not code**: With simpler code structures, more mental bandwidth is available for grasping the mathematical and statistical concepts.

2. **Immediate feedback**: Quick, iterative coding allows for rapid experimentation and immediate visualisation of results.

3. **Reduced cognitive load**: Without worrying about error handling, graceful fallbacks, modularity or passing tests, it's easier to concentrate on the transformations and algorithms themselves.

4. **Visible logic flow**: When code follows a clear, linear progression without abstractions, the core logic is clearly revealed.

In our first week at MLX, building neural networks from scratch, the focus wasn't on creating production-ready code but on understanding how neural networks operate, backpropagation and loss calculations. Had we been concerned with proper error handling and architecture, we likely would have missed the forest for the trees.

## Finding the right tool for the job

This isn't to say one approach is universally better than the other. Rather, each has its place. The data science approach optimises for learning and discovery; the software engineering approach optimises for reliability and maintainability.

As I progress through the bootcamp, I'm learning to appreciate both methodologies and context-switch between them. When I'm trying to understand a new algorithm or statistical concept, I will embrace the leaner style that prioritises clarity and exploration. When I need to integrate a model into a larger system, I will bring in the software engineering practices that ensure robustness.

The industry has already identified this need for a middle ground some years ago so I don't think I'm pointing out anything new here. The field of MLOps bridges these worlds, bringing software engineering best practices into the data science workflow while maintaining the flexibility needed for effective experimentation. Tools like DVC, MLflow, and even Pydantic help to formalise experimental work without sacrificing too much agility.

## Final thoughts

Perhaps the most valuable lesson I've taken from this experience is the importance of adaptability. Efficient technical practitioners know when to apply rigour and when to prioritise exploration. As I continue my machine learning journey, I'm trying to cultivate both mindsets — using the right approach for the context rather than dogmatically sticking to either extreme.

Learning to embrace the lean, focused code of data scientists has been unexpectedly liberating. It's teaching me not just about machine learning, but also about when to let go of certain practices to prioritise understanding. Sometimes, the most elegant solution isn't the most engineered one—it's the one that most clearly expresses the idea.

After just one week at MLX, I'm already seeing how this minimalist approach can accelerate my learning. By focusing less on engineering ceremony and more on core concepts, I'm able to grasp neural networks more quickly. There's something very elegant about stripping away the layers of abstraction and seeing the raw algorithms at work.

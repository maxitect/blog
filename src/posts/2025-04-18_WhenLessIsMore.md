---
title: "When Less Is More: Coding Like a Data Scientist"
date: "2025-04-19"
tags: ["data science", "machine learning", "best practice", "software"]
---

Starting the Machine Learning Institute (MLX) bootcamp has been a bit like stepping into a parallel coding universe. Last year, I learned to code formally as a software engineer where code is pristine, modular, tested to the nines, and ready to survive anything the real world throws at it. It is filled with type hints and abstraction that tends to bloat the codebase quickly. But the moment I opened a Jupyter notebook at MLX, I was hit by something that felt both jarring and oddly liberating: the sheer _lean-ness_ of the code.

It's not sloppy. It's not lazy. It’s… focused. And there's something to learn here.

### Different Goals, Different Rules

At its core, the difference between software engineers and data scientists comes down to purpose. We, the engineers, build systems designed to last. Our code has to be bulletproof, because one wrong input in production could take down a service, corrupt a database, or send a user’s delivery to the wrong continent.

Data scientists? They’re explorers. Their code is built for speed—quick hypotheses, fast feedback, minimal ceremony. That means favouring readability, brevity and reproducibility over rigid structure.

Where we scaffold an app, they script a story.

### The Magic of Rapid Feedback

In the MLX course, I noticed how much faster I could iterate when I let go of some of my old habits. Here's a typical snippet from a data science notebook:

```python
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

df = pd.read_csv('data.csv')
df['log_price'] = np.log(df.price)
model = LinearRegression().fit(df[['log_price']], df.sales)
print(model.coef_)
```

That's it. No logging. No error handling. No config files. And yet—it does the job. The focus is clear: transform the data, fit the model, get the insight. It invites you to ask questions, not manage dependencies.

### Now Contrast That With Engineering Code

```python
import logging
from myapp.config import get_config
from myapp.data_loader import load_data
from myapp.model import Model

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

Here we’ve got error handling, separation of concerns, logging, and externalised config. This is what you’d want in production. But for experimentation? It’s a straightjacket.

### Notebooks vs Pipelines, Print vs Logs

Data scientists lean on notebooks for their narrative, running blocks of code like paragraphs in an essay. They share insights, not APIs. While this makes for an incredibly readable and interactive environment, it does create a bit of chaos for long-term maintenance.

Engineers, on the other hand, live in versioned repositories, pull requests, and continuous integration. It’s a different game: slower to start, but scalable in the long run.

### Testing Is… Optional?

This one took me by surprise: tests are rare in exploratory work. Instead of formalised unit tests, data scientists often use quick sanity checks—eyeballing plots, looking at summary statistics, rerunning cells to see if results make sense.

Data‑science code tends to “fail fast,” surfacing errors immediately so you can clean or adjust the data on the fly. Production‑grade code, however, implements structured exception handling, logging and graceful degradation to maintain uptime and user trust.

I had to remind myself: when you’re trying to understand _why_ a pattern exists in your data, the best test might be your brain, not `pytest`.

### Readme? What Readme?

In data science, documentation is often baked right into the code—think clear variable names and a few markdown cells explaining what’s going on. It’s fast, it’s close to the code, and it works… until it doesn’t.

Engineers, meanwhile, are the kings and queens of external docs—README files, architecture diagrams, wikis, you name it. It might feel like overkill at first, but when a teammate jumps into your code six months later (or future-you does), it does pay off.

### Dependency Roulette

Pip install and hope for the best? That’s how a lot of small data projects start. And to be fair, a simple `requirements.txt` or Conda env does the job—for a while. But once things get serious, engineers go full ops mode: locked dependencies, Docker containers, and separate dev vs prod environments. It might sound like a headache, but it’s the only way to stop the “it works on my machine” monster from crashing the party.

### Learning to Let Go

If there’s one thing I’ve taken away from this experience, it’s that sometimes our engineering instincts can get in the way of learning. Overengineering a prototype won’t help you understand gradient descent faster. Sometimes, you just need to `print(model.coef_)` and move on.

This stripped-down approach has helped me focus more on what I came here to learn—machine learning, not production-level tooling. And ironically, the clarity of this code makes it easier to grasp the maths, the model behaviour, the “magic” that drew me in the first place.

### Bridging the Gap

The two worlds are converging. MLOps is bringing rigour to data workflows. Tools like `dvc`, `mlflow`, and `pydantic` are helping formalise experimentation. Meanwhile, engineers are learning to embrace the power of exploratory analysis.

But the best lessons? They come from seeing both sides.

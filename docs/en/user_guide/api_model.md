# API-based Models

Currently, OpenCompass supports API-based model inference for the following:

- OpenAI (`opencompass.models.OpenAI`)
- More coming soon

Let's take the OpenAI configuration file as an example to see how API-based models are used in the
configuration file.

```python
from opencompass.models import OpenAI

models = [
    dict(
        type=OpenAI,                             # Using the OpenAI model
        # Parameters for `OpenAI` initialization
        path='gpt-4',                            # Specify the model type
        key='YOUR_OPENAI_KEY',                   # OpenAI API Key
        max_seq_len=2048,                        # The max input number of tokens
        # Common parameters shared by various models, not specific to `OpenAI` initialization.
        abbr='GPT-4',                            # Model abbreviation used for result display.
        max_out_len=512,                         # Maximum number of generated tokens.
        batch_size=1,                            # The size of a batch during inference.
        run_cfg=dict(num_gpus=0),                # Resource requirements (no GPU needed)
    ),
]
```

# Custom Models

If the above methods do not support your model evaluation requirements, you can refer to
[Supporting New Models](../advanced_guides/new_model.md) to add support for new models in OpenCompass.

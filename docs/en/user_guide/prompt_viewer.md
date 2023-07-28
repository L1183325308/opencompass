# Prompt Viewer

This tool allows you to directly view the generated prompt without starting the full training process. If the passed configuration is only the dataset configuration (such as `configs/datasets/nq/nq_gen.py`), it will display the original prompt defined in the dataset configuration. If it is a complete evaluation configuration (including the model and the dataset), it will display the prompt received by the selected model during operation.

Running method:

```bash
python tools/prompt_viewer.py CONFIG_PATH [-n] [-a] [-p PATTERN]
```

- `-n`: Do not enter interactive mode, select the first model (if any) and dataset by default.
- `-a`: View the prompts received by all models and all dataset combinations in the configuration.
- `-p PATTERN`: Do not enter interactive mode, select all datasets that match the input regular expression.

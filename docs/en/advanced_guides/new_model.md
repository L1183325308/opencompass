# Add a Model(optional)

- If the model is loaded using AutoModelForCausalLM, AutoTokenizer, specify model_type (model name) as auto, and fill in the rest of the parameters normally to load the new model.

- If the model is loaded in other ways (AutoModelForCausalLM, AutoTokenizer cannot load the model), you can modify the /code/evaluators/unify_evaluator.py file

  
1. Customize and add model loading information, modify the /code/evaluators/unify_evaluator.py file, and import this parameter at transformers:
   
    ```
    from transformers import (
        AutoModel,
        AutoTokenizer,
        AutoModelForCausalLM,
        BloomForCausalLM,
        BloomTokenizerFast,
        LlamaTokenizer,
        LlamaForCausalLM,
        AutoConfig,
        模型新的加载方式
    )
    ```

2. Add custom model modification information:

    ```
    MODEL_CLASSES = {
        "bloom": (BloomForCausalLM, BloomTokenizerFast),
        "chatglm": (AutoModel, AutoTokenizer),
        "llama": (LlamaForCausalLM, LlamaTokenizer),
        "baichuan": (AutoModelForCausalLM, AutoTokenizer),
        "auto": (AutoModelForCausalLM, AutoTokenizer),
        "moss":(AutoConfig, AutoTokenizer),
        "自定义模型":(模型加载方式,分词器加载方式)
    }
    ```
 

# 基于 API 的模型

OpenCompass 目前支持以下基于 API 的模型推理：

- OpenAI（`opencompass.models.OpenAI`）
- Coming soon

以下，我们以 OpenAI 的配置文件为例，模型如何在配置文件中使用基于 API 的模型。

```python
from opencompass.models import OpenAI

models = [
    dict(
        type=OpenAI,                             # 使用 OpenAI 模型
        # 以下为 `OpenAI` 初始化参数
        path='gpt-4',                            # 指定模型类型
        key='YOUR_OPENAI_KEY',                   # OpenAI API Key
        max_seq_len=2048,                        # 最大输入长度
        # 以下参数为各类模型都有的参数，非 `OpenAI` 的初始化参数
        abbr='GPT-4',                            # 模型简称
        run_cfg=dict(num_gpus=0),                # 资源需求（不需要 GPU）
        max_out_len=512,                         # 最长生成长度
        batch_size=1,                            # 批次大小
    ),
]
```

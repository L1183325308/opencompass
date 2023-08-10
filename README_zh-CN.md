<div align="center">
  <img src="docs/zh_cn/_static/image/FinEval.jpg" width="500px"/>
  <br />
  <br />

[![docs](https://readthedocs.org/projects/opencompass/badge)](https://opencompass.readthedocs.io/zh_CN)
[![license](https://img.shields.io/github/license/InternLM/opencompass.svg)](https://github.com/InternLM/opencompass/blob/main/LICENSE)

<!-- [![PyPI](https://badge.fury.io/py/opencompass.svg)](https://pypi.org/project/opencompass/) -->

[🌐Website](https://opencompass.org.cn/) |
[📘Documentation](https://opencompass.readthedocs.io/zh_CN/latest/index.html) |
[🛠️Installation](https://opencompass.readthedocs.io/zh_CN/latest/get_started.html) |
[🤔Reporting Issues](https://github.com/InternLM/opencompass/issues/new/choose)

[English](/README.md) | 简体中文

</div>

<p align="center">
    👋 加入我们的 <a href="https://discord.gg/xa29JuW87d" target="_blank">Discord</a> 和 <a href="https://github.com/InternLM/InternLM/assets/25839884/a6aad896-7232-4220-ac84-9e070c2633ce" target="_blank">微信社区</a>
</p>

欢迎来到OpenCompass！

就像指南针在我们的旅程中为我们导航一样，我们希望OpenCompass能够帮助你穿越评估大型语言模型的重重迷雾。OpenCompass提供丰富的算法和功能支持，期待OpenCompass能够帮助社区更便捷地对NLP模型的性能进行公平全面的评估。



## 介绍

大型语言模型（LLMs）在各种自然语言处理任务中表现出色，然而它们在更具挑战性和特定领域任务中的效力仍然很少被探索。本文介绍了FinEval，这是一个专门为LLMs中的金融领域知识设计的基准测试。

FinEval是一个包含**金融、经济、会计和证书**等领域高质量多项选择题的集合。它包括了4,738个问题，涵盖了34个不同的学科。为了确保对模型性能的全面评估，FinEval采用了零样本、少样本、仅答案和链式思维提示等多种方法。在FinEval上评估最先进的中文和英文LLMs，结果显示只有GPT-4在不同的提示设置下达到了70%的准确率，表明LLMs在金融领域知识方面具有显著的增长潜力。我们的工作提供了一个更全面的金融知识评估基准，利用纸质实践题目，涵盖了广泛的LLMs评估范围。


## 性能排行榜

我们分为**仅预测答案**和**思维链**对模型进行评估，如果需要了解两种方法的Prompt样例，请参考[仅预测答案的zero-shot](/docs/zh_cn/prompt/zero_shot.md)、[仅预测答案的few-shot](/docs/zh_cn/prompt/few_shot.md)和[思维链](/docs/zh_cn/prompt/cot.md)

下面是模型的zero-shot和five-shot准确率。


### 仅预测答案

#### Zero-shot
| Model               | Finance | Accounting | Economy | Certificate | Average |
| ------------------- | :-----: | :--------: | :-----: | :---------: | :-----: |
| Random              | 25.0    |    25.0    |  25.0   |    25.0     |  25.0  |
| GPT-4               | 65.2 |      74.7      |    62.5    | 64.7  |  **66.4**   |
| GPT-3.5-turbo       | 49.0 |      58.0      |    48.8    | 50.4  |  51.0   |
| Baichuan-7B         | 48.5 |      58.6      |    47.3    | 50.1  |  50.5   |
| Baichuan-13B-base   | 39.1 |      53.0      |    47.7    | 42.7  |  44.3   |
| Baichuan-13B-chat   | 36.7 |      55.8      |    47.7    | 43.0  |  44.0   |
| LLaMA-7B-hf | 38.6 |      47.6      |    39.5    | 39.0  |  40.6   |
| Chinese-Alpaca-Plus-7B    | 33.3 |      48.3      |    41.3    | 38.0  |  38.9   |
| LLaMA-2-7B-base          | 32.6 |      41.2      |    34.1    | 33.0  |  34.7   |
| LLaMA-2-13B-base   | 31.6 |      37.0      |    33.4    | 32.1  |  33.1   |
| LLaMA-2-13B-chat   | 27.4 |      39.2      |    32.5    | 28.0  |  30.9   |
| LLaMA2-70B-chat    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| ChatGLM-6B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| ChatGLM2-6B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Bloomz-7B1    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| InternLM-7B-chat    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Ziya-LLaMA-13B-v1    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Falcon-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Falcon-40B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Aquila-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| AquilaChat-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| moss-moon-003-base    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| moss-moon-003-sft    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |


#### Five-shot
| Model               | Finance | Accounting | Economy | Certificate | Average |
| ------------------- | :-----: | :--------: | :-----: | :---------: | :-----: |
| Random              | 25.0    |    25.0    |  25.0   |    25.0     |  25.0  |
| GPT-4               | 65.2 |      74.7      |    62.5    | 64.7  |  **66.4**   |
| GPT-3.5-turbo       | 49.0 |      58.0      |    48.8    | 50.4  |  51.0   |
| Baichuan-7B         | 48.5 |      58.6      |    47.3    | 50.1  |  50.5   |
| Baichuan-13B-base   | 39.1 |      53.0      |    47.7    | 42.7  |  44.3   |
| Baichuan-13B-chat   | 36.7 |      55.8      |    47.7    | 43.0  |  44.0   |
| LLaMA-7B-hf | 38.6 |      47.6      |    39.5    | 39.0  |  40.6   |
| Chinese-Alpaca-Plus-7B    | 33.3 |      48.3      |    41.3    | 38.0  |  38.9   |
| LLaMA-2-7B-base          | 32.6 |      41.2      |    34.1    | 33.0  |  34.7   |
| LLaMA-2-13B-base   | 31.6 |      37.0      |    33.4    | 32.1  |  33.1   |
| LLaMA-2-13B-chat   | 27.4 |      39.2      |    32.5    | 28.0  |  30.9   |
| LLaMA2-70B-chat    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| ChatGLM-6B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| ChatGLM2-6B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Bloomz-7B1    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| InternLM-7B-chat    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Ziya-LLaMA-13B-v1    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Falcon-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Falcon-40B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Aquila-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| AquilaChat-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| moss-moon-003-base    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| moss-moon-003-sft    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |


### 思维链 (chain-of-thought)

#### Zero-shot
| Model               | Finance | Accounting | Economy | Certificate | Average |
| ------------------- | :-----: | :--------: | :-----: | :---------: | :-----: |
| Random              | 25.0    |    25.0    |  25.0   |    25.0     |  25.0  |
| GPT-4               | 65.2 |      74.7      |    62.5    | 64.7  |  **66.4**   |
| GPT-3.5-turbo       | 49.0 |      58.0      |    48.8    | 50.4  |  51.0   |
| Baichuan-7B         | 48.5 |      58.6      |    47.3    | 50.1  |  50.5   |
| Baichuan-13B-base   | 39.1 |      53.0      |    47.7    | 42.7  |  44.3   |
| Baichuan-13B-chat   | 36.7 |      55.8      |    47.7    | 43.0  |  44.0   |
| LLaMA-7B-hf | 38.6 |      47.6      |    39.5    | 39.0  |  40.6   |
| Chinese-Alpaca-Plus-7B    | 33.3 |      48.3      |    41.3    | 38.0  |  38.9   |
| LLaMA-2-7B-base          | 32.6 |      41.2      |    34.1    | 33.0  |  34.7   |
| LLaMA-2-13B-base   | 31.6 |      37.0      |    33.4    | 32.1  |  33.1   |
| LLaMA-2-13B-chat   | 27.4 |      39.2      |    32.5    | 28.0  |  30.9   |
| LLaMA2-70B-chat    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| ChatGLM-6B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| ChatGLM2-6B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Bloomz-7B1    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| InternLM-7B-chat    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Ziya-LLaMA-13B-v1    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Falcon-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Falcon-40B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Aquila-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| AquilaChat-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| moss-moon-003-base    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| moss-moon-003-sft    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |


#### Five-shot
| Model               | Finance | Accounting | Economy | Certificate | Average |
| ------------------- | :-----: | :--------: | :-----: | :---------: | :-----: |
| Random              | 25.0    |    25.0    |  25.0   |    25.0     |  25.0  |
| GPT-4               | 65.2 |      74.7      |    62.5    | 64.7  |  **66.4**   |
| GPT-3.5-turbo       | 49.0 |      58.0      |    48.8    | 50.4  |  51.0   |
| Baichuan-7B         | 48.5 |      58.6      |    47.3    | 50.1  |  50.5   |
| Baichuan-13B-base   | 39.1 |      53.0      |    47.7    | 42.7  |  44.3   |
| Baichuan-13B-chat   | 36.7 |      55.8      |    47.7    | 43.0  |  44.0   |
| LLaMA-7B-hf | 38.6 |      47.6      |    39.5    | 39.0  |  40.6   |
| Chinese-Alpaca-Plus-7B    | 33.3 |      48.3      |    41.3    | 38.0  |  38.9   |
| LLaMA-2-7B-base          | 32.6 |      41.2      |    34.1    | 33.0  |  34.7   |
| LLaMA-2-13B-base   | 31.6 |      37.0      |    33.4    | 32.1  |  33.1   |
| LLaMA-2-13B-chat   | 27.4 |      39.2      |    32.5    | 28.0  |  30.9   |
| LLaMA2-70B-chat    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| ChatGLM-6B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| ChatGLM2-6B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Bloomz-7B1    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| InternLM-7B-chat    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Ziya-LLaMA-13B-v1    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Falcon-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Falcon-40B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| Aquila-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| AquilaChat-7B    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| moss-moon-003-base    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |
| moss-moon-003-sft    | 28.8 |      32.9      |    29.7    | 28.0  |  29.6   |


## 安装

下面展示了快速安装的步骤，详细请参考[安装指南](docs/zh_cn/get_started/install.md)。


 ```python
    conda create --name fineval_venv python=3.8
    conda activate fineval_venv
 ```

```python
    git clone https://github.com/caiweige/FinEval
    cd FinEval
    pip install -r requirements.txt
    
    requirements.txt 文件如下:
    pandas
    torch
    tqdm
    peft 
    sentencepiece
```

## 评测

请阅读[快速上手](/docs/zh_cn/get_started/quick_start.md)了解如何运行一个评测任务。

## 支持新数据集和模型

如果需要新加入数据集进行评测，请参考[支持新数据集](/docs/zh_cn/advanced_guide/new_dataset.md)。

如果需要加载新模型，请参考[支持新模型](/docs/zh_cn/advanced_guide/new_model.md)。

## 如何提交

您首先需要准备一个 UTF-8编码的JSON文件，并按照以下格式编写。
```
## 每个学科内部的键名是数据集中的"id"字段
{
    "banking_practitioner_qualification_certificate": {
        "0": "A",
        "1": "B",
        "2": "B",
        ...
    },
    
    "学科名称":{
    "0":"答案1",
    "1":"答案2",
    ...
    }
    ....
}
```

然后你可以将准备好的JSON文件提交到zhang.liwen@shufe.edu.cn。

## 引用

```bibtex
@misc{2023opencompass,
    title={OpenCompass: A Universal Evaluation Platform for Foundation Models},
    author={OpenCompass Contributors},
    howpublished = {\url{https://github.com/InternLM/OpenCompass}},
    year={2023}
}
```

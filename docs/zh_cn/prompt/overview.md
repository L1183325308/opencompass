# Prompt 概括

在 LLM 的 Supervised Fine-Tuning (SFT) 过程中，我们常常会根据实际的要求往对话内注入一些预定义的字符串，以求模型能按照一定的要求输出内容。

例如，在一些 `chat` 模型的微调中，我们可能会在每段对话的开头加入系统层级的指令，并约定一套的格式表示用户与模型之间的对话。在评测时，我们也需要按照约定的格式输入问题，模型才能发挥出其最大的性能。

prompt 的格式非常重要！！注意要换行！！注意每行末尾不要有空格。

根据参数配置中讲解，few-shot和CoT参数组合，可以产生四种评测方式。根据不同的评测方式，我们有不同的Prompt。

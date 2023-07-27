# 数据集

我们的数据可以直接从[Huggingface](https://huggingface.co/datasets)数据集下载。请参考我们的GitHub了解如何读取和使用数据。


## 评测结果

评测完成后，会打印评测结果表格如下：

```text
dataset    version    metric    mode      opt350m    opt125m
---------  ---------  --------  ------  ---------  ---------
siqa       e78df3     accuracy  gen         21.55      12.44
winograd   b6c7ed     accuracy  ppl         51.23      49.82
```

所有过程的日志，预测，以及最终结果会放在 `outputs/demo/` 目录下。目录结构如下所示：

```text
outputs/default/
├── 20200220_120000
├── 20230220_183030   # 一次实验
│   ├── configs       # 每次实验都会在此处存下用于追溯的 config
│   ├── logs          # 运行日志
│   │   ├── eval
│   │   └── infer
│   ├── predictions   # 储存了每个任务的推理结果
│   ├── results       # 储存了每个任务的评测结果
│   └── summary       # 汇总每次实验的所有评测结果
├── ...
```

## 更多教程

想要更多了解 OpenCompass, 可以点击下列链接学习。

- [数据集配置](./user_guides/dataset_prepare.md)
- [准备模型](./user_guides/models.md)
- [任务运行和监控](./user_guides/experimentation.md)
- [如何调Prompt](./prompt/overview.md)
- [学习配置文件](./user_guides/config.md)

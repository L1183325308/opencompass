# 快速上手

我们会以测试chatglm2模型的性能为例，带你熟悉FinEval的一些基本功能,默认为zero-shot和answer-only。

- 运行前确保已经安装了FinEval。
- fineval文件夹下放置数据集，并命名为data

- 下载模型权重，chatglm2-6b到data的同级目录
- fineval的评测配置文件以配置.sh脚本为主，使用eval.sh启动。

模型如果一切正常，屏幕上会出现

```
0.0 Inference starts at 2023-07-27_12-06-31 on chatglm2 with subject of finance!
0% 0/58 [00:00<00:00,  2.61s/it]
```

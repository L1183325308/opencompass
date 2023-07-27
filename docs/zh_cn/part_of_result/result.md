# F-Eval评测结果

## F-Eval部分结果展示
本项目在推出的F-Eval评测数据集上测试了相关模型效果，其中测试集包含xxx个选择题，涵盖经济、金融课程和证书。以下是部分模型的valid和test集评测结果（Average），完整结果请参考技术报告（此处放论文链接？）。


```text
dataset    version    metric    mode      opt350m    opt125m
---------  ---------  --------  ------  ---------  ---------
siqa       e78df3     accuracy  gen         21.55      12.44
winograd   b6c7ed     accuracy  ppl         51.23      49.82
```

接下来将介绍F-Eval数据集的预测方法。



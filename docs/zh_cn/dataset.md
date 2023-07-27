# 数据集

FIN-EVAL数据集由4,543个选择题组成，涵盖33个不同的学术科目。这些问题收集自四个类别:会计、金融、会计认证和专业认证。Fin-eval还包括一些特别具有挑战性的题目，需要非常高级的推理能力来解决，比如中国的精算师考试。

```text
dataset    version    metric    mode      opt350m    opt125m
---------  ---------  --------  ------  ---------  ---------
siqa       e78df3     accuracy  gen         21.55      12.44
winograd   b6c7ed     accuracy  ppl         51.23      49.82
```

我们的数据可以直接从[Huggingface](https://huggingface.co/datasets)数据集下载。请参考我们的[Github](https://github.com/SJTU-LIT/ceval)了解如何读取和使用数据。

# F-Eval评测结果与脚本

## F-Eval部分结展示
本项目在推出的F-Eval评测数据集上测试了相关模型效果，其中测试集包含xxx个选择题，涵盖经济、金融课程和证书。以下是部分模型的valid和test集评测结果（Average），完整结果请参考技术报告（此处放论文链接？）。


```text
dataset    version    metric    mode      opt350m    opt125m
---------  ---------  --------  ------  ---------  ---------
siqa       e78df3     accuracy  gen         21.55      12.44
winograd   b6c7ed     accuracy  ppl         51.23      49.82
```

接下来将介绍F-Eval数据集的预测方法。

## 准备数据

从F-Eval官方指定路径下载评测数据集，并解压至`data`文件夹：

```python
wget https://huggingface.co/datasets/ceval/ceval-exam/resolve/main/ceval-exam.zip
unzip ceval-exam.zip -d data
```
将`data`文件夹放置于本项目的`scripts/ceval`目录下。

## 运行脚本

运行以下脚本：

```python
model_path=path/to/chinese_llama_or_alpaca
output_path=path/to/your_output_dir

cd scripts/ceval
python eval.py \
    --model_path ${model_path} \
    --cot False \
    --few_shot False \
    --with_prompt True \
    --constrained_decoding True \
    --temperature 0.2 \
    --n_times 1 \
    --ntrain 5 \
    --do_save_csv False \
    --do_test False \
    --output_dir ${output_path} \
```

## 参数说明
- `model_path`：待评测模型所在目录（合并LoRA后的HF格式模型）
- `model_path`：待评测模型所在目录（合并LoRA后的HF格式模型）
- `model_path`：待评测模型所在目录（合并LoRA后的HF格式模型）
- `model_path`：待评测模型所在目录（合并LoRA后的HF格式模型）

## 输出结果

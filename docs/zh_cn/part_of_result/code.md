# 运行脚本

FIN-EVAL代码可在[Github](https://github.com/SJTU-LIT/ceval)上获得。

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

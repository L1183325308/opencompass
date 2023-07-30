# 基于 API 的模型

以OpenAi的api模型为例，使用`code/run_chatgpt_eval.sh`脚本文件运行评测。

```python
export PROJ_HOME=$PWD
export KMP_DUPLICATE_LIB_OK=TRUE

# 确定api的key
openai_key=sk-*****************

exp_name=chatgpt
exp_date=$(date +"%Y%m%d%H%M%S")
output_path=$PROJ_HOME/output_dir/${exp_name}/$exp_date

echo "exp_date": $exp_date
echo "output_path": $output_path

python eval_chatgpt.py \
    --openai_key ${openai_key} \
    --cot False \
    --few_shot False \
    --n_times 1 \
    --ntrain 5 \
    --do_test False \
    --do_save_csv False \
    --output_dir ${output_path} \
    --model_name gpt4 
```




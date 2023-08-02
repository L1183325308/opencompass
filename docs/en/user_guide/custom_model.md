# Custom model

```
When defining a new model, define the model type as auto to load the new model. You can change other parameters by yourself. Here, the Baichuan model is taken as an example to load a custom model.
#baichuan-13b
model_type=auto #模型类型中不存在的，可以使用auto方式进行加载，采用AutoModelForCausalLM,AutoTokenizer方式加载
model_path=/data/sufeModel/MedicalGPT/Model/baichuan-13b
exp_name=baichuan13b

exp_date=$(date +"%Y%m%d%H%M%S")
echo "exp_date": $exp_date
output_path=$PROJ_HOME/output_dir/${exp_name}/$exp_date
echo "output_path": $output_path

python eval.py \
    --model_type  ${model_type} \
    --model_path ${model_path} \
    ${lora_model:+--lora_model "$lora_model"} \
    --cot True \
    --few_shot True \
    --with_prompt False \
    --ntrain 5 \
    --constrained_decoding True \
    --temperature 0.2 \
    --n_times 1 \
    --do_save_csv True \
    --do_test False \
    --gpus 0,1,2,3 \
    --only_cpu False \
    --output_dir ${output_path}
```


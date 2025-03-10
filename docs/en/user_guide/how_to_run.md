# How to run

Let's continue to take the Llama-2-7b-hf model as an example to give a detailed explanation of the instructions for use. We complete a test and score four steps.

- First place the dataset under the FinEval/code folder and name it data.

- Download the evaluation model weights.

- Modify the parameters of the evaluation script `code/run_eval.sh`.

  Run the following command to modify the configuration file

  ```
  vi run_eval.sh
  ```

  After running the above command, the content of the configuration file is as follows.

  ```
  export PROJ_HOME=$PWD
  export KMP_DUPLICATE_LIB_OK=TRUE
  
  # Llama-2-7b-hf model
  # Modify the model name to determine the model weight loading method. There are five default loading methods here, llama, bloom, auto, moss, chatglm, baichuan, and the first and second generation models are all supported
  model_type=llama
  # The location of the weight of the model downloaded through huggingface. Here, a relative location path is used. If the model path is downloaded to another location, an absolute path can be used.
  model_path=/Llama-2-7b-hf
  # The name of the directory generated by the model results. If the following parameter do_save_csv format is True, the model running information will be saved in a folder named as the directory generation name.
  exp_name=Llama-2-7b-hf
  
  exp_date=$(date +"%Y%m%d%H%M%S")
  echo "exp_date": $exp_date
  output_path=$PROJ_HOME/output_dir/${exp_name}/$exp_date
  echo "output_path": $output_path
  
  python eval.py \
      --model_type  ${model_type} \
      --model_path ${model_path} \
      ${lora_model:+--lora_model "$lora_model"} \
      --cot False \
      --few_shot True \
      --with_prompt False \
      --ntrain 5 \
      --constrained_decoding True \
      --temperature 0.2 \
      --n_times 1 \
      --do_save_csv True \
      --do_test False \
      --gpus 0 \ # Graphics card number for evaluation
      --only_cpu False \ # The default is False. If it is True, the cpu will be used for evaluation, and the speed will be slowed down. It is not recommended to use cpu for evaluation.
      --output_dir ${output_path}
  ```

  

- Run the evaluation script `code/run_eval.sh`.

  ```
  bash run_eval.sh
  ```

  After running the assessment script, specific scores for each subject and a total weighted score will be generated.

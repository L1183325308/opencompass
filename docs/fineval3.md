# 本文介绍了FinEval，这是一个专门为中国金融领域设计的评估基准。FinEval为一系列高质量的选择题，涵盖金融、经济、会计和专业证书四个主题。它包括4738个问题，涵盖34个不同的学术科目。为了确保对模型性能进行全面评估，FinEval采用了各种方法，包括zero-shot，few-shot，Answer Only(AO,仅回答答案)和Chain-of-thought(CoT,思维链提示)。在FinEval上评估最先进的中文和英文大语言模型，结果表明，只有GPT-4在不同的提示设置中达到了70%的准确率，这表明大语言模型在金融领域的增长潜力很大。总体而言，这项研究为未来的大语言模型提供了强大的评估基准，并对其发展局限性提供了宝贵的见解。

您可以在 **支持新数据集**（附上超链接）中查看我们的数据集示例，或查看我们的**论文（放链接）**了解更多细节。



开始你的第一步：
1.安装

​	1.准备FinEval运行环境:	

```python
conda create --name fineval_venv python=3.8
conda activate fineval_venv
```

如果你希望自定义PyTorch版本或者相关CUDA版本，请参考官方文档准备Pytorch环境。FinEval环境中，要求pytorch>=1.13

# 	2.安装FinEval:

```python
git clone https://github.com/caiweige/FinEval
cd FinEval
pip install -r requirements

requirements文件如下:
pandas
torch
tqdm
peft 
sentencepiece
```

2.数据集准备

使用Hugging Face datasets下载数据集。运行命令进行手动下载解压，在Fineval/code的项目目录下运行下面命令，并改名为data，数据集准备至FinEval/code/data目录下。

```
cd code
git clone *----------------
unzip xx.zip
mv xx data
```

data文件夹格式为:

-----data

​		----dev：每个科目的dev集中包含五个示范实例以及few-shot评估提供的解释

​		----val: val集主要作用于超参调整

​		----test：用于模型评估，test集的标签不会公开，需用户提交其结果，才可以获得测试准确值。

3.快速上手

我们会以测试Llama-2-7b-hf模型的性能为例，带你熟悉FinEval的一些基本功能,默认为zero-shot和answer-only。

- 运行前确保已经安装了FinEval，本次实验在单张A800显卡上成功运行。更大的参数量，请参考不同模型的推理资源大小，合理选择计算资源。

- FinEval/code文件夹下放置数据集，并命名为data。

- 下载模型权重，Llama-2-7b-hf权重到data的同级目录(FinEval/code文件夹下)

  ```python
  cd FinEval/code
  git clone https://huggingface.co/NousResearch/Llama-2-7b-hf
  ```

  以下为该项目结构目录

  ```
  Fineval/
  ├── requirements
  ├── docs
  ├── README.md
  ├── ...
  ├── code  # 评测代码
  │   ├── Llama-2-7b-hf  # 模型权重（模型位置可以任意放置，在run_eval.sh文件中model_path更改为模型权重绝对地址即可）
  │   ├── data  # 数据集
  │	     ├── dev 
  │	     ├── val 
  │	     ├── test
  │   ├── evaluators
  │	     ├── chatgpt.py
  │	     ├── evaluator.py
  │	     ├── unify_evaluator.py
  │   ├── README.md
  │   ├── eval.py # 基于权重的模型运行文件
  │   ├── eval_chatgpt.py # 基于chatgpt的模型运行文件
  │   ├── run_eval.sh # 基于模型权重的模型配置脚本
  │   ├── subject_mapping.json # 文件配置信息 文件名称和data下文件名称对应
  │   └── run_chatgpt_eval.sh # chatgpt的配置脚本
  ```

- # FinEval的评测配置文件以配置.sh脚本为主，使用run_eval.sh启动。

- 模型如果一起正常，屏幕上会出现

```
0.0 Inference starts at 2023-07-27_12-06-31 on llama with subject of finance!
0% 0/58 [00:00<00:00,  2.61s/it]
```

注：可以使用ctrl+c中断程序执行。运行demo期间，我们来详细讲解本案例中详细内容和参数配置。

最终运行结果如下：

```
Accuracy_subject:
banking_practitioner_qualification_certificate :  37.57225433526011
financial_management :  25.0
economic_law :  26.923076923076923
certified_management_accountan :  12.5
auditing :  25.0
china_actuary :  31.03448275862069
international_finance :  33.333333333333336
investments :  29.545454545454547
central_banking :  52.0
public_finance :  40.0
financial_markets :  45.0
international_economics :  10.0
finance :  28.0
intermediate_financial_accounting :  15.384615384615385
commercial_bank_finance :  30.0
monetary_finance :  25.58139534883721
corporate_strategy_and_risk_management :  22.22222222222222
fund_qualification_certificate :  39.705882352941174
econometrics :  40.0
certified_practising_accountant :  23.529411764705884
insurance :  33.333333333333336
securities_practitioner_qualification_certificate :  18.181818181818183
statistics :  25.714285714285715
advanced_financial_accounting :  26.08695652173913
financial_engineering :  56.0
political_economy :  20.0
microeconomics :  61.111111111111114
corporate_finance :  32.432432432432435
tax_law :  37.77777777777778
cost_accounting :  44.11764705882353
futures_practitioner_qualification_certificate :  38.46153846153846
accounting :  19.444444444444443
management_accounting :  43.18181818181818
macroeconomics :  30.434782608695652
--------------------------------------------------------------------------------
Accuracy_grouped:
Accounting :  30.434782608695652
Certificate :  34.120734908136484
Economy :  32.16374269005848
Finance :  35.042735042735046
Avg: 
33.19467554076539
```

- 模型分数解读：

​		1、Accuracy_subject下分数为每个科目的具体分数、Accuracy_grouped为各个科目所属类别的具体分数、Avg为该模型的最终分数（即基于类别总数对四个类别加权平均的结果）

​		2、四选一，所以 baseline 是 25 分，但是模型没训练好的话可能低于 25 分。

​		3、CoT 不一定能显著提升模型分数因为只有在推理数据类任务上，模型强到一定程度之后，CoT 才会有效，这也是为什么 CoT 是一个典型的涌现能力。

​		4、CoT 的模式下，目前只评价最终答案对不对，不评价中间过程对不对，这是因为中间过程和最终答案在大部分时候显著正相关，最终答案对了，中间不会错到哪里去；中间错的多了，最终答案不会对；这种做法可以绕开中间过程难以评价的问题。

​		5、具体的分数的显著性还跟模型天生的 variance 相关，因此推荐多跑实验观察。



使用说明

1.如何运行

​	我们继续以Llama-2-7b-hf这个模型为例，进行使用说明的详细解释，我们完成一次测评分四步走。

- 首先在FinEval/code文件夹下放置数据集，并命名为data。

- 下载测评模型权重。

- 修改评测脚本code/run_eval.sh的参数。

  运行下面命令，进行修改配置文件

  ```
  vi run_eval.sh
  ```

  运行上述命令后，配置文件内容如下。

  ```
  export PROJ_HOME=$PWD
  export KMP_DUPLICATE_LIB_OK=TRUE
  
  # Llama-2-7b-hf模型
  # 修改模型名称确定模型权重加载方式，此处默认有五种加载方式，llama,bloom,auto,moss,chatglm,baichuan，一二代模型均支持
  model_type=llama 
  # 通过huggingface下载的模型权重的位置，此处采用相对位置路径，如果模型路径下载至其他位置，可以使用绝对路径。
  model_path=/Llama-2-7b-hf 
  # 模型结果生成的目录名称，如果以下参数do_save_csv格式为True,模型运行信息将保存在一个文件夹中，文件夹命名为目录生成名称。
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
      --gpus 0 \ # 测评进行的显卡编号
      --only_cpu False \ # 默认为False，如果为True将使用cpu进行评估，速度会减慢，不推荐使用cpu进行评估。
      --output_dir ${output_path}
  ```

  

- 运行评测脚本code/run_eval.sh

  ```
  bash run_eval.sh
  ```

  运行评测脚本后，将会产生每个科目具体的分数以及总的加权分数。

2.参数配置说明

###### few-shot和cot进行参数组合，可以产生四种评测方式:

- few-shot为False cot为False：即为zero-shot采用只回答答案的方式。
- few-shot为True  cot为False: 即为few-shot采用只回答答案的方式。
- few-shot为False cot为True: 即为zero-shot方式采用CoT方式回答。
- few-shot为True cot为True: 即为few-shot方式采用CoT方式回答。

###### few-shot or zero-shot？

- 一般来说，pretraining阶段的模型few-shot 的效果总是会比 zero-shot 好一些，但是经过instruction tuning之后的模型，且instruction tuning没有few-shot data的话，很可能zero-shot会更好。

###### 不同的model_type代表不同的模型模型读取配置，model_type请从以下模型中选择：

```
"bloom": (BloomForCausalLM, BloomTokenizerFast),
"chatglm": (AutoModel, AutoTokenizer),
"llama": (LlamaForCausalLM, LlamaTokenizer),
"baichuan": (AutoModelForCausalLM, AutoTokenizer),
"auto": (AutoModelForCausalLM, AutoTokenizer),
"moss":(AutoConfig, AutoTokenizer)
```

- 以下为模型配置信息

```
--model_type 模型类别，决定模型加载方式
--model_path 模型路径
--cot  是否采用Chain-of-thought
--few_shot  是否采用few-shot学习
--with_prompt  是否采用alpaca的prompt模板，默认不使用
--ntrain few-shot的个数，few-shot为False,此参数失效
--constrained_decoding 是否采用有限制解码方式，由于fineval的评测标准答案为ABCD,提供了两种从模型中提取的答案方案：当constrained_decoding=True,计算模型生成的第一个token分别为ABCD的概率，选择其中概率最大的作为答案；当constrained_decoding=False，用正则表达式从模型生成内容中提取答案。
--temperature 模型解码的温度，降低问题会保证variance低，保证多次测评产生的结果相同。
--n_times 指定评测的重复次数，将模型放在output_dir下生成指定次数的文件夹，默认为1，生成文件夹为toke0
--do_save_csv 是否将模型生成结果、提取的答案等内容保存在csv文件中
--do_test 在valid和test集上测试,当do_test=False，在valid集上进行测试;当do_test=True,在test集上测试
--gpus 模型测试时使用的gpu个数
--only_cpu True 是否只采用cpu进行评估
--output_dir 指定评测结果的输出路径

```

3.基于 API 的模型

以OpenAi的api模型为例，使用code/run_chatgpt_eval.sh脚本文件运行评测。除openai_key参数之外，其他参数与基于模型权重的测评参数一致，核心参数为model_name和openai_key。

model_name名称处请填写正确的模型名称，若测评gpt4，请规范填写，最终评测脚本中请填写为gpt-4。正确的模型信息请参考OpenAI官网。

此外此处openai_key建议使用付费版本，5美刀版本有速度限制影响测评。

```python
export PROJ_HOME=$PWD
export KMP_DUPLICATE_LIB_OK=TRUE

# 确定api的key
openai_key=sk-***************** #此处填写您的openai_key进行测评

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
    --model_name gpt-4 # 请填写正确的OpenAI模型名称
```



4.自定义模型

定义新模型时，将模型类型定义为auto，即可加载新模型。其他参数自行更改即可。此处以百川模型为例，加载自定义模型。

如果新加入模型参数配置为AutoModelForCausalLM,AutoTokenizer方式加载，模型类型为auto既可进行测评。

```
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

5.Prompt_Template

配置文件中with_prompt，可以决定我们使用否采用回答模板，我们的模板定义如下，Alpaca模型推荐使用，除Alpaca模型外其他模型不推荐使用此模板，经实测其他模型使用该模板分数会降低。

```
if with_prompt:
                prompt_template = (
                    "Below is an instruction that describes a task. "
                    "Write a response that appropriately completes the request.\n\n"
                    "### Instruction:\n{instruction}\n\n### Response: ")

                instruction = prompt_template.format_map({'instruction': instruction,'subject':subject_name})
```



提示词
	1.Prompt概括：在 LLM 的 Supervised Fine-Tuning (SFT) 过程中，我们常常会根据实际的要求往对话内注入一些预定义的字符串，以求模型能按照一定的要求输出内容。例如，在一些 `chat` 模型的微调中，我们可能会在每段对话的开头加入系统层级的指令，并约定一套的格式表示用户与模型之间的对话。在评测时，我们也需要按照约定的格式输入问题，模型才能发挥出其最大的性能。prompt 的格式非常重要！！注意要换行！！注意每行末尾不要有空格。

​	2、根据参数配置中讲解，few-shot和cot参数组合，可以产生四种评测方式。根据不同的评测方式，我们有不同的prompt。	2 AO（Answer-Only ）

  AO zero-shot

仅预测答案的zero-shot的prompt

	下列有关组成部分重要性的说法中，错误的是____。
	A. 组成部分重要性的汇总数可以高于集团财务报表整体的重要性
	B. 组成部分重要性可以由集团项目组或组成部分注册会计师确定
	C. 如果仅计划在集团层面对某组成部分实施分析程序，无须为该组成部分确定重要性
	D. 集团财务报表整体的重要性应当高于组成部分重要性
	答案：
​	AO few-shot

仅预测答案的few-shot的prompt:对话格式的 prompt 相当于我们让 AI 假装已经正确回答了五个问题，然后 AI 实际上只回答最后一轮的问题

```python
以下是中国关于financial_management考试的单项选择题，请选出其中的正确答案。

下列有关增加股东财富的表述中，正确的是____。
A. 收入是增加股东财富的因素，成本费用是减少股东财富的因素
B. 股东财富的增加可以用股东权益的市场价值来衡量
C. 多余现金用于再投资有利于增加股东财富
D. 提高股利支付率，有助于增加股东财富
答案：C

甲公司 2013 年实现税后利润 1000 万元，2013 年年初未分配利润为 200 万元。公司按 10%提取法定盈余公积。预计 2014 年需要新增投资资本 500 万元。目标资本结构（债务/权益）为 4/6。公司执行剩余股利分配政策，2013 年可分配现金股利____万元。
A. 700
B. 800
C. 900
D. 600
答案：A

甲公司是一家模具制造企业，正在制定某模具的标准成本。加工一件该模具需要的必不可少的加工操作时间为 90 小时，设备调整时间为 1 小时，必要的工间休息为 5 小时。正常的废品率为 4%。该模具的直接人工标准工时是____小时。
A. 93.6
B. 96
C. 99.84
D. 100
答案：D

下列预算中，属于财务预算的是____。
A. 销售预算
B. 生产预算
C. 产品成本预算
D. 现金预算
答案：D

同时卖出一支股票的看涨期权和看跌期权，它们的执行价格和到期日均相同。该投资策略适用的情况是____。
A. 预计标的资产的市场价格将会发生剧烈波动
B. 预计标的资产的市场价格将会大幅度上涨
C. 预计标的资产的市场价格将会大幅度下跌
D. 预计标的资产的市场价格稳定
答案：D

甲公司采用配股方式进行融资。每 10 股配 2 股，配股前股价为 6.2元。配股价为 5 元。如果除权日股价为 5.85 元。所有股东都参加了配股。除权日股价下跌____。
A. 0.0242
B. 0.025
C. 0.0256
D. 0.0565
答案：
```

# 3.CoT(chain-of-thought)

CoT模式中，我们需要加入一句话：让我们一步一步思考，

- # CoT zero-shot:

```
甲公司采用配股方式进行融资。每 10 股配 2 股，配股前股价为 6.2元。配股价为 5 元。如果除权日股价为 5.85 元。所有股东都参加了配股。除权日股价下跌____。
A. 0.0242
B. 0.025
C. 0.0256
D. 0.0565
答案：让我们一步一步思考，
```

- # CoT few-shot:

```
以下是中国关于financial_management考试的单项选择题，请选出其中的正确答案。

下列有关增加股东财富的表述中，正确的是____。
A. 收入是增加股东财富的因素，成本费用是减少股东财富的因素
B. 股东财富的增加可以用股东权益的市场价值来衡量
C. 多余现金用于再投资有利于增加股东财富
D. 提高股利支付率，有助于增加股东财富
答案：让我们一步一步思考，
对于上市公司，在资本市场完全有效的情况下，其股票价格可以代表公司股权的价值。股价高低代表投资大众对公司股权价值的客观评价，反映资本和获利的关系，反映每股收益的大小和取得时间，反映每股收益的风险。
所以答案是C。

甲公司 2013 年实现税后利润 1 000 万元，2013 年年初未分配利润为 200 万元。公司按 10%提取法定盈余公积。预计 2014 年需要新增投资资本 500 万元。目标资本结构（债务/权益）为 4/6。公司执行剩余股利分配政策，2013 年可分配现金股利____万元。
A. 700
B. 800
C. 900
D. 600
答案：让我们一步一步思考，
2013 年利润留存＝500×60%＝300（万元），股利分配＝1 000－300＝700（万元）。
所以答案是A。

甲公司是一家模具制造企业，正在制定某模具的标准成本。加工一件该模具需要的必不可少的加工操作时间为 90 小时，设备调整时间为 1 小时，必要的工间休息为 5 小时。正常的废品率为 4%。该模具的直接人工标准工时是____小时。
A. 93.6
B. 96
C. 99.84
D. 100
答案：让我们一步一步思考，
标准工时是指在现有生产技术条件下，生产单位产品所需要的时间，包括直接加工操作必不可少的时间，以及必要的间歇和停工，如工间休息、调整设备时间、不可避免的废品耗用工时等，所以该模具的直接人工标准工时＝（90＋1＋5）/（1－4%）＝100（小时）。
所以答案是D。

下列预算中，属于财务预算的是____。
A. 销售预算
B. 生产预算
C. 产品成本预算
D. 现金预算
答案：让我们一步一步思考，
财务预算是关于利润、现金和财务状况的预算，包括利润表预算、现金预算和资产负债表预算等。
所以答案是D。

同时卖出一支股票的看涨期权和看跌期权，它们的执行价格和到期日均相同。该投资策略适用的情况是____。
A. 预计标的资产的市场价格将会发生剧烈波动
B. 预计标的资产的市场价格将会大幅度上涨
C. 预计标的资产的市场价格将会大幅度下跌
D. 预计标的资产的市场价格稳定
答案：让我们一步一步思考，
预计标的资产的市场价格将会发生剧烈波动适合多头对敲策略，错误，预计标的资产的市场价格稳定正确，对敲策略分为多头对敲和空头对敲，多头对敲是同时买进一支股票的看涨期权和看跌期权，它们的执行价格和到期日均相同；而空头对敲则是同时卖出一支股票的看涨期权和看跌期权，它们的执行价格和到期日均相同。多头对敲适用于预计市场价格将发生剧烈变动，但是不知道升高还是降低的情况，而空头对敲正好相反，它适用于预计市场价格稳定的情况。
所以答案是D。

甲公司采用配股方式进行融资。每 10 股配 2 股，配股前股价为 6.2元。配股价为 5 元。如果除权日股价为 5.85 元。所有股东都参加了配股。除权日股价下跌____。
A. 0.0242
B. 0.025
C. 0.0256
D. 0.0565
答案：让我们一步一步思考，
```

进阶教程
1.支持新数据集

- 修改subject_mapping.json

​		以下为subject_mapping.json中格式：

	{
		"filename":[
		"英文名称",
		"中文名称"
		"类别"
		]
	}
​	  以下为subject_mapping.json中税法例子:

```
{
	"tax_law":[
	"Tax_law",
	"\u7a0e\u6cd5"
	"Accounting"
	]
}
```

- 如需添加新的数据集及所属类别，按上述格式进行修改subject_mapping.json文件。

- 确定data数据集格式，新加入数据集由三个部分组成：dev、val 和 test。每个科目的 dev 集包含五个示范实例以及为 few-shot 评估提供的解释。val 集旨在用于超参数调整。而 test 集则用于模型评估。

  以下为会计科目的dev文件(accounting_dev.csv)实例:

  ```
  id,question,A,B,C,D,answer,explanation
  0,甲公司 2×14 年 12 月 20 日与乙公司签订商品销售合同。合同约定：甲公司应于 2×15 年 5 月 20 日前将合同标的商品运抵乙公司并经验收，在商品运抵乙公司前灭失、毁损、价值变动等风险由甲公司承担。甲公司该项合同中所售商品为库存W 商品，2×14 年 12 月 30 日，甲公司根据合同向乙公司开具了增值税专用发票并于当日确认了商品销售收入。W 商品于 2×15 年 5 月 10 日发出并于 5 月 15 日运抵乙公司验收合格。对于甲公司 2×14 年 W 商品销售收入确认的恰当性判断，除考虑与会计准则规定的收入确认条件的符合性以外，还应考虑可能违背的会计基本假设是____。,会计主体,会计分期,持续经营,货币计量,B,题目中明确提到在商品运抵乙公司前灭失、毁损、价值变动等风险由甲公司承担，即相关商品的控制权并未转移，应在2×15年确认收入，甲公司在2×14年确认收入，违背了会计分期假设。
  ```

  以下为会计科目的test文件(accounting_test.csv)实例:

  ```
  id,question,A,B,C,D
  0,下列做法中，不违背会计信息质量可比性要求的有____。,因客户的财务状况好转，将坏账准备的计提比例由应收账款余额的30%降为15%,为了扭转亏损，将本应费用化的借款费用进行资本化,被投资企业本年严重亏损，投资企业将长期股权投资从权益法转为成本法,鉴于本期利润完成不理想，将应费用化的研发支出改成资本化处理
  ```

  以下为会计科目的val文件(accounting_val.csv)实例:

  ```
  id,question,A,B,C,D,answer
  0,甲公司在非同一控制下企业合并中取得 10 台生产设备，合并日以公允价值计量这些生产设备。甲公司可以进入 X 市场或 Y 市场出售这些生产设备，合并日相同生产设备每台交易价格分别为 180 万元和 175 万元。如果甲公司在 X 市场出售这些合并中取得的生产设备，需要支付相关交易费用 100 万元，将这些生产设备运到 X 市场需要支付运费 60 万元。如果甲公司在 Y 市场出售这些合并中取得的生产设备，需要支付相关交易费用 80 万元，将这些生产设备运到 Y 市场需要支付运费 20 万元。假定上述生产设备不存在主要市场，不考虑增值税及其他因素，甲公司上述生产设备的公允价值总额是____。,1640万元,1650万元,1730万元,1740万元,C
  ```

2.支持新模型（选用）

- 如果模型采用AutoModelForCausalLM,AutoTokenizer方式加载,指定model_type（模型名称）为auto，其余参数正常填写，即可加载新模型。

- 如果模型采用其他方式加载(AutoModelForCausalLM,AutoTokenizer无法加载模型)，可修改/code/evaluators/unify_evaluator.py文件，以下为具体修改步骤。
  1. 自定义增加模型加载信息,修改/code/evaluators/unify_evaluator.py文件，在transformers处进行导入此参数

```
from transformers import (
    AutoModel,
    AutoTokenizer,
    AutoModelForCausalLM,
    BloomForCausalLM,
    BloomTokenizerFast,
    LlamaTokenizer,
    LlamaForCausalLM,
    AutoConfig,
    模型新的加载方式
)
```

​		2.加入自定义模型修改信息		

```
MODEL_CLASSES = {
    "bloom": (BloomForCausalLM, BloomTokenizerFast),
    "chatglm": (AutoModel, AutoTokenizer),
    "llama": (LlamaForCausalLM, LlamaTokenizer),
    "baichuan": (AutoModelForCausalLM, AutoTokenizer),
    "auto": (AutoModelForCausalLM, AutoTokenizer),
    "moss":(AutoConfig, AutoTokenizer),
    "自定义模型":(模型加载方式,分词器加载方式)
}
```

​	3.在/code/evaluators/unify_evaluator.py中加入您新的模型加载逻辑。

其他说明
1.如何提交你的测评

```
## 每个学科内部的键名是数据集中的"id"字段
{
    "banking_practitioner_qualification_certificate": {
        "0": "A",
        "1": "B",
        "2": "B",
        ...
    },
    
    "学科名称":{
    "0":"答案1",
    "1":"答案2",
    ...
    }
    ....
}
```

2.联络我们




开始你的第一步：
1.安装

​	1.准备FinEval运行环境:	

```python
conda create --name fineval_venv python=3.8
conda activate fineval_venv
```

​	2.安装fineval:

```python
git clone https://github.com/caiweige/fineval
cd fineval
pip install -r requirements

requirements文件如下:
pandas
torch
tqdm
peft
sentencepiece
```



2.数据集准备

使用Hugging Face datasets下载数据集，并命名为data

```
git clone *----------------
```

data文件夹格式为:

-----data

​		----dev

​		----val

​		----test



3.快速上手

我们会以测试chatglm2模型的性能为例，带你熟悉FinEval的一些基本功能,默认为zero-shot和answer-only。

- 运行前确保已经安装了FinEval。
- fineval文件夹下放置数据集，并命名为data

- 下载模型权重，chatglm2-6b到data的同级目录
- fineval的评测配置文件以配置.sh脚本为主，使用eval.sh启动。

模型如果一起正常，屏幕上会出现

```
0.0 Inference starts at 2023-07-27_12-06-31 on chatglm2 with subject of finance!
0% 0/58 [00:00<00:00,  2.61s/it]
```



使用说明
1.如何运行

- 首先在fineval文件夹下放置数据集，并命名为data
- 下载测评模型权重
- 修改评测脚本code/run_eval.sh的参数
- 运行评测脚本code/run_eval.sh

2.参数配置说明

```
--model_type 模型名称
--model_path 模型路径
--cot  是否采用Chain-of-thought
--few_shot  是否采用few-shot学习
--with_prompt  是否采用alpaca的prompt模板，默认不适用
--ntrain few-shot的个数，few-shot为False,此参数失效
--constrained_decoding 是否采用有限制解码方式，由于fineval的评测标准答案为ABCD,提供了两种从模型中提取的答案方案：当constrained_decoding=True,计算模型生成的第一个token分别为ABCD的概率，选择其中概率最大的作为答案；当constrained_decoding=False，用正则表达式从模型生成内容中提取答案。
--temperature 模型解码的温度
--n_times 指定评测的重复次数，将模型放在output_dir下生成指定次数的文件夹，默认为1，生成文件夹为toke0
--do_save_csv 是否将模型生成结果、提取的答案等内容保存在csv文件中
--do_test 在valid和test集上测试,当do_test=False，在valid集上进行测试;当do_test=True,在test集上测试
--gpus 模型测试时使用的gpu个数
--only_cpu True 是否只采用cpu进行评估
--output_dir 指定评测结果的输出路径

```

3.基于 API 的模型

以OpenAi的api模型为例，使用code/run_chatgpt_eval.sh脚本文件运行评测。

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



4.自定义模型

```
定义新模型时，将模型类型定义为auto，即可加载新模型。其他参数自行更改即可。此处以百川模型为例，加载自定义模型。
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

5.Prompt Viewer

提示词
	1.Prompt概括：在 LLM 的 Supervised Fine-Tuning (SFT) 过程中，我们常常会根据实际的要求往对话内注入一些预定义的字符串，以求模型能按照一定的要求输出内容。例如，在一些 `chat` 模型的微调中，我们可能会在每段对话的开头加入系统层级的指令，并约定一套的格式表示用户与模型之间的对话。在评测时，我们也需要按照约定的格式输入问题，模型才能发挥出其最大的性能。prompt 的格式非常重要！！注意要换行！！注意每行末尾不要有空格。

​	2 AO（Answer-Only ）

  AO zero-shot

	下列有关组成部分重要性的说法中，错误的是____。
	A. 组成部分重要性的汇总数可以高于集团财务报表整体的重要性
	B. 组成部分重要性可以由集团项目组或组成部分注册会计师确定
	C. 如果仅计划在集团层面对某组成部分实施分析程序，无须为该组成部分确定重要性
	D. 集团财务报表整体的重要性应当高于组成部分重要性
	答案：
​	AO few-shot

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

3.Cot(chain-of-thought)

- cot zero-shot:

```
甲公司采用配股方式进行融资。每 10 股配 2 股，配股前股价为 6.2元。配股价为 5 元。如果除权日股价为 5.85 元。所有股东都参加了配股。除权日股价下跌____。
A. 0.0242
B. 0.025
C. 0.0256
D. 0.0565
答案：让我们一步一步思考，
```

- cot few-shot:

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

   	如需添加新的数据集及所属类别，按上述格式进行修改subject_mapping.json文件

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

2.支持新模型

- 如果模型采用AutoModelForCausalLM,AutoTokenizer方式加载,指定model_type（模型名称）为auto，其余参数正常填写，即可加载新模型。

- 如果模型采用其他方式加载(AutoModelForCausalLM,AutoTokenizer无法加载模型)，可修改/code/evaluators/unify_evaluator.py文件
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






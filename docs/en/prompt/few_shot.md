# Few-shot

## 1. AO（Answer-Only）
AO few-shot

Few-shot prompts with predicted answers only: Conversational format prompts are equivalent to us letting the AI ​​pretend to have answered five questions correctly, and then the AI ​​actually only answers the last round of questions.

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

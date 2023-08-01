# Installation

1. Set up the FinEval environment:

   ```bash
   conda create --name opencompass python=3.10 pytorch torchvision pytorch-cuda -c nvidia -c pytorch -y
   conda activate opencompass
   ```

2. Install OpenCompass:

   ```bash
   git clone https://github.com/InternLM/opencompass.git
   cd opencompass
   pip install -e .
   ```

    ```python
    conda create --name fineval_venv python=3.8
    conda activate fineval_venv
    ```

2. 安装 FinEval：

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

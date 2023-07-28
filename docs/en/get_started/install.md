# Installation

1. Set up the OpenCompass environment:

   ```bash
   conda create --name opencompass python=3.10 pytorch torchvision pytorch-cuda -c nvidia -c pytorch -y
   conda activate opencompass
   ```

   If you want to customize the PyTorch version or related CUDA version, please refer to the [official documentation](https://pytorch.org/get-started/locally/) to set up the PyTorch environment. Note that OpenCompass requires `pytorch>=1.13`.

2. Install OpenCompass:

   ```bash
   git clone https://github.com/InternLM/opencompass.git
   cd opencompass
   pip install -e .
   ```

3. Install humaneval (Optional)

   If you want to **evaluate your models coding ability on the humaneval dataset**, follow this step.

   <details>
   <summary><b>click to show the details</b></summary>

   ```bash
   git clone https://github.com/openai/human-eval.git
   cd human-eval
   pip install -r requirements.txt
   pip install -e .
   cd ..
   ```

   Please read the comments in `human_eval/execution.py` **lines 48-57** to understand the potential risks of executing the model generation code. If you accept these risks, uncomment **line 58** to enable code execution evaluation.

   </details>

4. Install Llama (Optional)

   If you want to **evaluate Llama / Llama-2 / Llama-2-chat with its official implementation**, follow this step.

   <details>
   <summary><b>click to show the details</b></summary>

   ```bash
   git clone https://github.com/facebookresearch/llama.git
   cd llama
   pip install -r requirements.txt
   pip install -e .
   cd ..
   ```

   You can find example configs in `configs/models`. ([example](https://github.com/InternLM/opencompass/blob/eb4822a94d624a4e16db03adeb7a59bbd10c2012/configs/models/llama2_7b_chat.py))

   </details>

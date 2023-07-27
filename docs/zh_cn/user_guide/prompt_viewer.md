# Prompt Viewer

本工具允许你在不启动完整训练流程的情况下，直接查看生成的 prompt。如果传入的配置仅为数据集配置（如 `configs/datasets/nq/nq_gen_3dcea1.py`），则展示数据集配置中定义的原始 prompt。若为完整的评测配置（包含模型和数据集），则会展示所选模型运行时实际接收到的 prompt。

运行方式：

```bash
python tools/prompt_viewer.py CONFIG_PATH [-n] [-a] [-p PATTERN]
```

- `-n`: 不进入交互模式，默认选择第一个 model （如有）和 dataset。
- `-a`: 查看配置中所有模型和所有数据集组合接收到的 prompt。
- `-p PATTERN`: 不进入交互模式，选择所有与传入正则表达式匹配的数据集。

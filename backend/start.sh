#!/bin/bash
# Reduce TensorFlow logs and force CPU mode
export TF_CPP_MIN_LOG_LEVEL=2
export CUDA_VISIBLE_DEVICES=-1

# Install missing OpenCV and system dependencies
apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0 libsm6 libxext6 libxrender-dev

# Reduce Gunicorn workers to lower memory usage
exec gunicorn -w 1 -b 0.0.0.0:$PORT app:app
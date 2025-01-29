#!/bin/bash
# Install missing OpenCV dependencies
apt-get update && apt-get install -y libgl1-mesa-glx
# Start Flask using Gunicorn
gunicorn -w 4 -b 0.0.0.0:$PORT app:app
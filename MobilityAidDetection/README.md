This Readme is based from IBM's Cloud Annotations guide in utilising a trained object detection model with Python. Link to the original repo is here: https://github.com/cloud-annotations/object-detection-python

# Object Detection Python Examples

Run your models trained using [Cloud Annotations](https://github.com/cloud-annotations/training) with python.

## Tflite Object Detection

Currently, `python-tflite.py` supports using Mobilenet-V1 SSD models trained using Cloud Annotations.

### Output:
Summary Information
```
Image 7 of 9.
Inference time: 0.15027356147766113
----------
Inference Summary:
Highest Score: 0.9407029747962952
Highest Scoring Box: [0.60926155 0.47011317 0.67576766 0.56898813]
----------
Image shape: (563, 1000, 3)
Boxes shape: (1917, 4)
Classes shape: (1917,)
Scores shape: (1917,)
['plate: 94%']
Image Saved
==========
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites and installing
Pip install the packages in `requirement.txt`.
```
pip install -r requirement.txt
```

### To run the model and obtain the output
This script below calls the tflite model interpreter for inference on all .jpg files inside the directory `PATH_TO_TEST_IMAGES_DIR`.

Similary the output .jpg files are storesd in `PATH_TO_OUTPUT_DIR`.

We can also specify the minimum confidence (score) for a given detection box to be displayed with `MINIMUM_CONFIDENCE`.
```
python python-tflite.py \
--MODEL_DIR /path/to/<model_name>/model_android \
--PATH_TO_TEST_IMAGES_DIR /path/to/test/images \
--PATH_TO_OUTPUT_DIR /path/to/output/images \
--MINIMUM_CONFIDENCE 0.01

```


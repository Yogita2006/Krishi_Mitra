import tensorflow as tf
import numpy as np
import os
import sys
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

IMG_SIZE = 224
MODEL_PATH = "../Models/soil_classifier.keras"
TRAIN_DIR = "../Data/train"

if not os.path.exists(MODEL_PATH):
    print("Model not found.")
    sys.exit()

model = tf.keras.models.load_model(MODEL_PATH)

dataset = tf.keras.preprocessing.image_dataset_from_directory(
    TRAIN_DIR,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=32
)

class_names = dataset.class_names

if len(sys.argv) < 2:
    print("Usage: python predict.py <image_path>")
    sys.exit()

img_path = sys.argv[1]

img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))
img_array = image.img_to_array(img)
img_array = preprocess_input(img_array)
img_array = np.expand_dims(img_array, axis=0)

predictions = model.predict(img_array, verbose=0)
predicted_index = np.argmax(predictions)
confidence = float(np.max(predictions))

print("\nPrediction Result")
print("------------------")
print("Predicted Class:", class_names[predicted_index])
print("Confidence: {:.2f}%".format(confidence * 100))

print("\nFull Probability Distribution:")
for i, prob in enumerate(predictions[0]):
    print(f"{class_names[i]}: {prob*100:.2f}%")

dataset = tf.keras.preprocessing.image_dataset_from_directory(
    TRAIN_DIR,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=32
)
print("Class indices mapping:")
print(dict(zip(dataset.class_names, range(len(dataset.class_names)))))

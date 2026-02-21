import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# =========================
# CONFIG
# =========================
MODEL_PATH = "../Models/soil_classifier.keras"
VAL_DIR = "../Data/val"
IMG_SIZE = 224
BATCH_SIZE = 32

# =========================
# LOAD MODEL
# =========================
print("\nLoading model...")
model = tf.keras.models.load_model(MODEL_PATH)

# =========================
# DATA
# =========================
val_datagen = ImageDataGenerator(
    preprocessing_function=tf.keras.applications.mobilenet_v2.preprocess_input
)

val_data = val_datagen.flow_from_directory(
    VAL_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=False
)

class_names = list(val_data.class_indices.keys())
print("\nDetected Classes:", class_names)

# =========================
# EVALUATE
# =========================
print("\nEvaluating model...\n")
loss, accuracy = model.evaluate(val_data, verbose=1)

print(f"\nValidation Accuracy: {accuracy * 100:.2f}%")

# =========================
# PREDICTIONS
# =========================
val_data.reset()
predictions = model.predict(val_data, verbose=0)
y_pred = np.argmax(predictions, axis=1)
y_true = val_data.classes

# =========================
# REPORT
# =========================
print("\nClassification Report:\n")
print(classification_report(y_true, y_pred, target_names=class_names))

# =========================
# METRICS
# =========================
cm = confusion_matrix(y_true, y_pred)
per_class_accuracy = cm.diagonal() / cm.sum(axis=1)
misclassified = np.sum(y_true != y_pred)

# =========================
# SINGLE DASHBOARD PLOT
# =========================
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1️⃣ Overall Accuracy
axes[0, 0].bar(["Validation Accuracy"], [accuracy * 100])
axes[0, 0].set_ylim(0, 100)
axes[0, 0].set_title("Overall Accuracy (%)")

# 2️⃣ Per-Class Accuracy
axes[0, 1].bar(class_names, per_class_accuracy * 100)
axes[0, 1].set_ylim(0, 100)
axes[0, 1].set_title("Per-Class Accuracy (%)")
axes[0, 1].tick_params(axis='x', rotation=45)

# 3️⃣ Confusion Matrix
sns.heatmap(
    cm,
    annot=True,
    fmt="d",
    xticklabels=class_names,
    yticklabels=class_names,
    ax=axes[1, 0]
)
axes[1, 0].set_title("Confusion Matrix")
axes[1, 0].set_xlabel("Predicted")
axes[1, 0].set_ylabel("Actual")

# 4️⃣ Actual vs Predicted (Scatter)
correct = y_true == y_pred
axes[1, 1].scatter(
    np.arange(len(y_true))[correct],
    y_pred[correct],
    label="Correct",
    alpha=0.5
)
axes[1, 1].scatter(
    np.arange(len(y_true))[~correct],
    y_pred[~correct],
    label="Incorrect",
    alpha=0.8
)
axes[1, 1].set_title("Actual vs Predicted")
axes[1, 1].set_xlabel("Sample Index")
axes[1, 1].set_ylabel("Predicted Class Index")
axes[1, 1].legend()

plt.tight_layout()
plt.show()

print(f"\nTotal Misclassified Samples: {misclassified}")

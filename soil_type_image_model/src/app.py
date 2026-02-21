import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image

# =========================
# CONFIG
# =========================
MODEL_PATH = "../Models/soil_classifier.keras"
IMG_SIZE = 224

CLASS_NAMES = [
    "Alluvial_Soil",
    "Arid_Soil",
    "Black_Soil",
    "Laterite_Soil",
    "Mountain_Soil",
    "Red_Soil",
    "Yellow_Soil"
]

# =========================
# PAGE CONFIG
# =========================
st.set_page_config(
    page_title="Soil Classification System",
    page_icon="🌱",
    layout="centered"
)

st.title("🌱 Soil Classification System")
st.write("Upload a soil image to predict its type.")

# =========================
# LOAD MODEL (Cached)
# =========================
@st.cache_resource
def load_model():
    model = tf.keras.models.load_model(MODEL_PATH)
    return model

model = load_model()

# =========================
# IMAGE PREPROCESSING
# =========================
def preprocess_image(image):
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image = np.array(image)

    if image.shape[-1] == 4:  # RGBA → RGB
        image = image[:, :, :3]

    image = tf.keras.applications.mobilenet_v2.preprocess_input(image)
    image = np.expand_dims(image, axis=0)
    return image

# =========================
# FILE UPLOADER
# =========================
uploaded_file = st.file_uploader(
    "Upload Soil Image",
    type=["jpg", "jpeg", "png"]
)

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", use_container_width=True)

    processed_image = preprocess_image(image)

    with st.spinner("Predicting..."):
        predictions = model.predict(processed_image)
        predicted_index = np.argmax(predictions)
        confidence = float(np.max(predictions)) * 100

    predicted_class = CLASS_NAMES[predicted_index]

    st.success(f"Predicted Soil Type: {predicted_class}")
    st.write(f"Confidence: {confidence:.2f}%")

    st.subheader("Full Probability Distribution")
    for i, class_name in enumerate(CLASS_NAMES):
        prob = float(predictions[0][i]) * 100
        st.write(f"{class_name}: {prob:.2f}%")

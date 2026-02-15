import streamlit as st
import pandas as pd
import joblib

# Load trained model
model = joblib.load("crop_yield_model.pkl")
model_columns = joblib.load("model_columns.pkl")

st.title("🌾 Crop Yield Prediction System")

st.write("Enter crop details below:")

# Example inputs (replace with your actual dataset columns)
Rainfall_mm = st.number_input("Rainfall (mm)", min_value=0.0)
Temperature_Celsius = st.number_input("Temperature (°C)", min_value=0.0)
Fertilizer_Used = st.number_input("Fertilizer Used (kg)", min_value=0.0)

if st.button("Predict Yield"):

    # Create dataframe from input
    input_data = pd.DataFrame([[Rainfall_mm, Temperature_Celsius, Fertilizer_Used]],
                              columns=["Rainfall", "Temperature", "Fertilizer"])

    # One-hot encoding alignment
    input_data = pd.get_dummies(input_data)

    # Add missing columns
    for col in model_columns:
        if col not in input_data.columns:
            input_data[col] = 0

    input_data = input_data[model_columns]

    # Predict
    prediction = model.predict(input_data)

    st.success(f"Predicted Yield: {prediction[0]:.2f} tons/hectare")

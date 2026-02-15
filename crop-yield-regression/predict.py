import joblib
import pandas as pd

# Load model and columns
model = joblib.load("crop_yield_model.pkl")
model_columns = joblib.load("model_columns.pkl")

# Example new input
input_data = {
    "Region": "North",
    "Soil_Type": "Loamy",
    "Crop": "Wheat",
    "Rainfall_mm": 120,
    "Temperature_Celsius": 25,
    "Fertilizer_Used": 1,
    "Irrigation_Used": 1,
    "Weather_Condition": "Sunny",
    "Days_to_Harvest": 110
}

# Convert to DataFrame
df = pd.DataFrame([input_data])

# One-hot encode
df = pd.get_dummies(df)

# Align columns
df = df.reindex(columns=model_columns, fill_value=0)

# Predict
prediction = model.predict(df)

print("Predicted Yield (tons per hectare):", prediction[0])


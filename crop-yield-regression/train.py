import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import r2_score, mean_squared_error
import joblib

df = pd.read_csv("crop_yield.csv")  # Load dataset

print("Dataset shape:", df.shape)

target_column = "Yield_tons_per_hectare"    # Define target column

cat_cols = df.select_dtypes(include=["object", "string"]).columns   # Handle categorical columns

df = df.dropna()    # Drop missing values

# Separate features and target
X = df.drop(target_column, axis=1)
y = df[target_column]

X = pd.get_dummies(X, columns=cat_cols, drop_first=True)    # One-hot encode categorical features


print("Feature shape after encoding:", X.shape)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model (Optimized)
model = HistGradientBoostingRegressor(
    max_iter=300,
    learning_rate=0.05,
    max_depth=12,
    l2_regularization=0.1,
    random_state=42
)

model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)

print("\nModel Performance:")
print("R2 Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))

# Save model
joblib.dump(model, "crop_yield_model.pkl")

print("\nModel training complete and saved as crop_yield_model.pkl")

from sklearn.model_selection import cross_val_score

cv_scores = cross_val_score(
    model,
    X,
    y,
    cv=5,
    scoring="r2",
    n_jobs=-1
)

print("\nCross Validation R2 Scores:", cv_scores)
print("Mean CV R2:", cv_scores.mean())

joblib.dump(X.columns.tolist(), "model_columns.pkl")

import matplotlib.pyplot as plt

plt.figure()
plt.scatter(y_test, y_pred)
plt.xlabel("Actual Yield")
plt.ylabel("Predicted Yield")
plt.title("Actual vs Predicted Yield")

# Perfect prediction line
plt.plot(
    [y_test.min(), y_test.max()],
    [y_test.min(), y_test.max()]
)

plt.show()

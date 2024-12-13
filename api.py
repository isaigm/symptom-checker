from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


import xgboost as xgb
import numpy as np
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


with open("diseases_names.txt") as file:
    diseases_names = np.array([line.replace('\n', '') for line in file.readlines()])


model = xgb.XGBClassifier()
model.load_model("model.bin")


def make_inference(user_input):
    temp_input = np.array([False  for _ in range(131)])
    temp_input[np.array(user_input)] = True
    probas = model.predict_proba([temp_input])[0] * 100
    idx = (-probas).argsort()[:3]
    result = dict(zip(diseases_names[idx], np.array(probas[idx], dtype="float64") ))
    return result

class SymptomList(BaseModel):
    symptom_list: List[int]

@app.get("/")
def read_root():
    return {"Hello": "World"}




@app.post("/inference")
def read_inference(symptoms: SymptomList):
    return make_inference(symptoms.symptom_list)


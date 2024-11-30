import streamlit as st
import requests

with open("sintomas.txt") as file:
    symptoms_names = [line.replace('\n', '') for line in file.readlines()]

# URL de la API

API_URL = "http://127.0.0.1:8000/inference"  # Cambia según sea necesario

st.title("Predicción de Enfermedades")

# Simula los síntomas (por ejemplo, 0 y 1 para 10 síntomas)
symptoms = []
for i, symptom in enumerate(symptoms_names):  # Ajusta según el número de características de tu modelo
    symptoms.append(st.checkbox(symptom, key=i))

# Botón para enviar la solicitud
if st.button("Predecir"):
    # Construir la solicitud
    #payload = {"symptoms": [int(x) for x in symptoms]}
    # Enviar la solicitud a la API
    print(type(symptoms[0]))
    response = requests.get(API_URL, json={"symptom_list":symptoms})
    
    if response.status_code == 200:
        result = response.json()
        st.success(f"{result}")
    else:
        st.error("Error al conectar con la API")

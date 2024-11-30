



import json

with open("sintomas.txt") as file:
    trad = [line.replace('\n', '') for line in file.readlines()]

with open("symptoms.txt") as file:
    original = [line.replace('\n', '') for line in file.readlines()]


to_json = dict()
for i, (name, traduction) in enumerate(zip(original, trad)):
    to_json[name] = {"idx": i, "traduccion": traduction}

print(json.dumps(to_json))
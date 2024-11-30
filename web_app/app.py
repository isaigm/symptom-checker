from flask import Flask, render_template
import json 
app = Flask(__name__)

# Datos de los síntomas por categorías

with open ('../categories.json') as file:
    categories = json.load(file)

with open ('../symptoms.json') as file:
    symptoms = json.load(file)

@app.route('/')
def index():
    return render_template('index.html', categories=list(categories.keys()))

@app.route('/categoria/<categoria>')
def categoria(categoria):
    symp_per_cat = categories.get(categoria, [])
    symp_per_cat = [symptoms[cat]["traduccion"] for cat in symp_per_cat]
    return render_template('index.html', categories=list(categories.keys()), category=categoria, symp_per_cat=symp_per_cat)

if __name__ == '__main__':
    app.run(debug=True)

import json

from flask import Flask, render_template


app = Flask(__name__)


# Open and read the JSON file
with open('../symptoms.json', 'r') as file:
    data = json.load(file)

@app.route("/")
def main():
    return render_template("index.html", symptoms=data)


if __name__ == "__main__":
    app.run(debug=True)
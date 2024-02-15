from flask import Flask, request
from flask import jsonify
import random

app = Flask(__name__)


@app.route('/submit-data', methods=['POST'])
def submit_data():
    data = request.json
    value = data.get('key')
    return value

@app.route("/random_numbers")
def home():
    random_nums = {"elements": []}
    for _ in range(10):
        random_number = round(random.random()*10)
        random_nums["elements"].append(random_number)
    return jsonify(random_nums)


@app.route("/persons")
def members():
    return {"elements": ['Jason', 'Dave', 'borbones', 'Jet']}
        
@app.route("/items")
def items():
    return {"elements": ['Cellphone', 'Id', 'Laptop', 'T-shirt']}


if __name__ == "__main__":
    app.run(debug=True)
        
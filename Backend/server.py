from flask import Flask, request
from flask import jsonify
import random
import openpyxl
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

@app.route("/students")
def students():
    students = {"elements": []}
    workbook = openpyxl.load_workbook('ANSC121.xlsx')
    sheet = workbook['Attendance']
    col = 'A'
    i = 2
    max_row = sheet.max_row # Get the maximum number of rows with data in the sheet
    for i in range(1, max_row + 1):
        cell_address = col + str(i)
        cell_value = sheet[cell_address].value
        if cell_value is not None:
            students["elements"].append(cell_value)
    print(max)
    return students

# @app.route("/questions-and-choices")
# def questionsAndChoices():
#     correct_answers = []
#     questions = {"elements": []}
#     workbook = openpyxl.load_workbook('ANSC121.xlsx')
#     sheet = workbook['Questions']
#     col = 'A'
#     max_row = sheet.max_row # Get the maximum number of rows with data in the sheet
#     for i in range(2, max_row + 1):
#         cell_address = col + str(i)
#         cell_value = sheet[cell_address].value
#         if cell_value is not None:
#             questions["elements"].append(cell_value)
#     print(max)
#     return questions

@app.route("/questions-with-choices")
def questions_with_choices():
    questions_with_choices = []
    workbook = openpyxl.load_workbook('ANSC121.xlsx')
    sheet = workbook['Questions']
    max_row = sheet.max_row
    columns = ['B', 'C', 'D', 'E', 'F']
    correct_answers = []
    for column in columns:
        for row in range(2, max_row + 1):
            cell_address = sheet[column + str(row)]
            cellAddress_Color = cell_address.fill.start_color.rgb
            if cellAddress_Color == 'FFFFFF00':
                correct_answer = cell_address.coordinate
                correct_answers.append(correct_answer)
    print(correct_answers)
    for i in range(2, max_row + 1):  # Assuming the first row contains headers
        question = sheet['A' + str(i)].value
        choices = [
            sheet['B' + str(i)].value,
            sheet['C' + str(i)].value,
            sheet['D' + str(i)].value,
            sheet['E' + str(i)].value,
            sheet['F' + str(i)].value
        ]
        questions_with_choices.append({'choices': choices,'question': question})
    
    return {'questions_with_choices': questions_with_choices}

if __name__ == "__main__":
    app.run(debug=True)
        
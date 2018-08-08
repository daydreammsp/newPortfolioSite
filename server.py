from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def hello():  
    return render_template('index.html')



@app.route('/signUpUser', methods=['POST'])
def signUpUser():
    print('hello server side')
    return 'it worked'


# run the application
if __name__ == "__main__":  
    app.run(debug=True)

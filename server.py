from flask import Flask, request, render_template, json
from flask_mail import Mail
from flask_mail import Message
from dotenv import load_dotenv
import os
from flask import send_from_directory


load_dotenv()

app = Flask(__name__)
app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = os.getenv("mailUsername"),
    MAIL_PASSWORD = os.getenv("mailPassword"),
))
mail = Mail(app)
@app.route("/")
def hello():  
    return render_template('index.html')



@app.route('/contact', methods=['POST'])
def signUpUser():
    name =  request.form['name']
    email = request.form['email']
    subject = request.form['subject']
    message = request.form['message']
    
    print('hello server side', request.form)
    msg = Message("Hello",
                html='<h2>' + name + '</h2>''<h2>' + email + '</h2>''<h2>' + subject + '</h2>''<h2>' + message + '</h2>',
                  sender="jskruseportfoliosite@gmail.com",
                  recipients=['jonathanskruse@gmail.com'])

    mail.send(msg)
    return 'OK'

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/png')


# run the application
if __name__ == "__main__":  
    app.run(debug=True)

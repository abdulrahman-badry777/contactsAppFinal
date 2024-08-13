
from flask import Flask, Flask, render_template, request, redirect, url_for, session, jsonify

from utils.establishDBConnection import get_db_connection

app = Flask(__name__, template_folder='templates')

#The login page (Ahmed Naga)

 

if __name__ == "__main__":
    app.run(debug=True)

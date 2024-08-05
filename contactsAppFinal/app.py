
from flask import Flask, render_template, request, jsonify

from utils.establishDBConnection import get_db_connection

app = Flask(__name__, template_folder='templates')

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        conn=get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM contatcs' )
        data=cur.fetchall()
        cur.close()
        jsonify(data=data)

    else:
        return render_template("login.html")

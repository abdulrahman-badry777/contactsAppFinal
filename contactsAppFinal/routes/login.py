from flask import Blueprint, render_template, request, jsonify
from contactsAppFinal.utils.establishDBConnection import get_db_connection

login_bp = Blueprint('login', __name__)

@login_bp.route("/", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE email=? AND password=?", (email, password))
        user = cur.fetchall()
        cur.close()
        return jsonify(data=user) 
    else:
        return render_template("login.html", custom_css="login.css")

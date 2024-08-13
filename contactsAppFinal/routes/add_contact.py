from flask import Blueprint, render_template

add_contact_bp = Blueprint('add_contact', __name__)

@add_contact_bp.route('/addContact')
def addContact():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template("add_contact.html", custom_css="add_contact.css")

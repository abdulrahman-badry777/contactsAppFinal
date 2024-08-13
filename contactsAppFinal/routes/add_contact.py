from flask import Blueprint, render_template

add_contact_bp = Blueprint('add_contact', __name__)

@add_contact_bp.route('/addContact')
def addContact():
    return render_template("add_contact.html", custom_css="add_contact.css")

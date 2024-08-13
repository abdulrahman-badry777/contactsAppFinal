from flask import Blueprint, render_template

edit_contact_bp = Blueprint('edit_contact', __name__)

@edit_contact_bp.route("/edit_contact")
def edit_contact_page():
    return render_template("edit_contact.html", custom_css="edit_contact.css")

@edit_contact_bp.route("/Update_Contact")
def Update_Contact():
    return render_template("Update_Contact.html", custom_css="Update_Contact.css")

from app import app
from flask import Blueprint

#Routes of render Templetes
@app.route("/")
def login_render():
        return render_template("login.html",custom_css="login.css")

@app.route("/contactList")
def contactList():
        return render_template("contacts.html",custom_css="contacts.css")

@app.route("/View")
def View():
        return render_template("view.html",custom_css="view.css")

@app.route('/addContact')
def addContact():
        return render_template("add_contact.html",custom_css="add_contact.css")

@app.route("/edit_contact")
def edit_contact_page():
        return render_template("edit_contact.html",custom_css="edit_contact.css")

@app.route("/Update_Contact")
def Update_Contact():
        return render_template("Update_Contact.html",custom_css="Update_Contact.css")
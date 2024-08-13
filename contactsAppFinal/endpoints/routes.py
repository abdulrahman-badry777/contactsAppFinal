from flask import Blueprint, render_template

login_rednerBp=  Blueprint('login_renderBp', __name__)
contactListBp=  Blueprint('contactListBp', __name__)
ViewBp=  Blueprint('ViewBp', __name__)
addContactBp =  Blueprint('addContactBp', __name__)
edit_contactBp=  Blueprint('edit_contactBp', __name__)



#Routes of render Templetes
@login_renderBp.route("/")
def login_render():
        return render_template("login.html",custom_css="login.css")

@contactListBp.route("/contactList")
def contactList():
        return render_template("contacts.html",custom_css="contacts.css")

@ViewBp.route("/View")
def View():
        return render_template("view_contact.html",custom_css="view_contact.css")

@addContactBp.route('/addContact')
def addContact():
        return render_template("add_contact.html",custom_css="add_contact.css")

@edit_contactBp.route("/edit_contact")
def edit_contact_page():
        return render_template("edit_contact.html",custom_css="edit_contact.css")



from flask import Flask, render_template, request, jsonify
from utils.establishDBConnection import get_db_connection
from routes.contacts import contacts_bp

app = Flask(__name__, template_folder='templates')

# Register Blueprints
app.register_blueprint(contacts_bp)

# The login page (Ahmed Naga)
@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')  #not used currently
        password = request.form.get('password') #same as email
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users")
        data = cur.fetchall()
        cur.close()
        return jsonify(data=data)
    else:
        return render_template("login.html", custom_css="login.css")

# Routes for rendering templates
@app.route("/contactList")
def contactList():
    return render_template("contacts.html", custom_css="contacts.css")

@app.route("/View")
def View():
    return render_template("view.html", custom_css="view.css")

@app.route('/addContact')
def addContact():
    return render_template("add_contact.html", custom_css="add_contact.css")

@app.route("/edit_contact")
def edit_contact_page():
    return render_template("edit_contact.html", custom_css="edit_contact.css")

@app.route("/Update_Contact")
def Update_Contact():
    return render_template("Update_Contact.html", custom_css="Update_Contact.css")


if __name__ == "__main__":
    app.run(debug=True)

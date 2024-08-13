from flask import Flask
from routes.login import login_bp
from routes.contacts import contacts_bp
from routes.view import view_bp
from routes.add_contact import add_contact_bp
from routes.edit_contact import edit_contact_bp

app = Flask(__name__, template_folder='templates')

# تسجيل الـ Blueprints
app.register_blueprint(login_bp)
app.register_blueprint(contacts_bp)
app.register_blueprint(view_bp)
app.register_blueprint(add_contact_bp)
app.register_blueprint(edit_contact_bp)

if __name__ == "__main__":
    app.run(debug=True)

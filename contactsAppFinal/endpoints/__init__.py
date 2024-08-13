from .routes import addContactBp,login_renderBp,contactListBp,ViewBp,edit_contactBp
from flask import Flask


def create_app():
    app = Flask(__name__, template_folder='templates')
    app.register_blueprint(loginBp)
    app.register_blueprint(contactsBp)
    app.register_blueprint(contactRemoveBp)
    app.register_blueprint(add_contactsBp)
    app.register_blueprint(contact_detailsBp)
    app.config['EXPLAIN_TEMPLATE_LOADING'] = True

    return app

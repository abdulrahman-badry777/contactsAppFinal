from .routes import addContactBp,login_renderBp,contactListBp,ViewBp,edit_contactBp
from flask import Flask


def create_app():
    app = Flask(__name__, template_folder='templates')
    app.register_blueprint(login_renderBp)
    app.register_blueprint(contactListBp)
    app.register_blueprint(addContactBp)
    app.register_blueprint(ViewBp)
    app.register_blueprint(edit_contactBp)
    
    app.config['EXPLAIN_TEMPLATE_LOADING'] = True

    return app

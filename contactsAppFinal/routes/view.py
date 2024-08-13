from flask import Blueprint, render_template

view_bp = Blueprint('view', __name__)

@view_bp.route("/View")
def View():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template("view_contact.html", custom_css="view.css")

from flask import Blueprint, render_template, request, jsonify
from contactsAppFinal.utils.establishDBConnection import get_db_connection

contacts_bp = Blueprint('contacts', __name__)

@contacts_bp.route("/contactList")
def contactList():
    return render_template("contacts.html", custom_css="contacts.css")

@contacts_bp.route("/contacts", methods=['GET'])
def contact_list():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM contacts')
    contacts = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(contacts)

@contacts_bp.route("/contact/<int:contact_id>", methods=['GET'])
def view_contact(contact_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM contacts WHERE id = %s', (contact_id,))
    contact = cur.fetchone()
    cur.close()
    conn.close()
    if contact:
        contact_dict = {
            'id': contact[0],
            'name': contact[2],
            'email': contact[3],
            'phone': contact[4]
        }
        return jsonify(contact_dict)
    else:
        return jsonify({"error": "Contact not found"}), 404

@contacts_bp.route("/contact/<int:contact_id>/edit", methods=['POST'])
def edit_contact(contact_id):
    conn = get_db_connection()
    cur = conn.cursor()
    data = request.get_json()

    full_name = data.get('full_name')
    email = data.get('email')
    phone_number = data.get('phone_number')

    if not full_name or not email or not phone_number:
        return jsonify({"error": "Full name, email, and phone number are required fields"}), 400

    cur.execute('UPDATE contacts SET full_name = %s, email = %s, phone_number = %s WHERE id = %s',
                (full_name, email, phone_number, contact_id))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"success": "Contact updated successfully"})

@contacts_bp.route("/contact/<int:contact_id>/delete", methods=['POST'])
def delete_contact(contact_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM contacts WHERE id = %s', (contact_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"success": "Contact deleted successfully"})

@contacts_bp.route('/add_contact', methods=['POST'])
def add_contact():
    data = request.get_json()
    id = data.get('Uid')
    name = data.get('full-name')
    email = data.get('email')
    phone = data.get('phone-number')

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute('SELECT * FROM contacts WHERE email = %s OR phone_number = %s', (email, phone))
        check = cur.fetchall()

        if check:
            return jsonify({"error": "Contact already exists"}), 400

        cur.execute('INSERT INTO contacts (user_id, full_name, email, phone_number) VALUES (%s, %s, %s, %s)',
                    (id, name, email, phone))
        conn.commit()
        return jsonify({"success": "Contact added successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

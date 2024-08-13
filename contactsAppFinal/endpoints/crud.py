from flask import Blueprint,Flask, render_template, request, redirect, url_for, session, jsonify
from utils.establishDBConnection.get_db_connection

loginBp= Blueprint("loginBp",__name__)
contactsBp= Blueprint("contactsBp",__name__)
viewContactBp= Blueprint("viewContactBp",__name__)
editcontactBp= Blueprint("editcontactBp",__name__)
DeleteContactBp= Blueprint("DeleteContactBp",__name__)
add_conatactBp= Blueprint("add_conatactBp",__name__)

@loginBp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')  #not used currently
        password = request.form.get('password') #same as email
        conn=get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users")
        data=cur.fetchall()
        cur.close()
        return jsonify(data=data)
    else:
        return render_template("login.html",custom_css="login.css")
    

 #The contact Details page (Mohamed Ali)
@contactsBp.route("/contacts", methods=['GET'])
def contact_list(): 
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM contacts')
    contacts = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(contacts)


@viewContactBp.route("/contact/<int:contact_id>", methods=['GET'])
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



        

@editcontactBp.route("/contact/<int:contact_id>/edit", methods=['POST'])
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



@DeleteContactBp.route("/contact/<int:contact_id>/delete", methods=['POST'])
def delete_contact(contact_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM contacts WHERE id = %s', (contact_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"success": "Contact deleted successfully"})

# Added the add contact function
@add_conatactBp.route('/add_contact', methods=['POST'])
def add_contact():
    data = request.get_json()
    id = data.get('Uid')
    name = data.get('full-name')
    email = data.get('email')
    phone = data.get('phone-number')

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Check if the contact already exists
        cur.execute('SELECT * FROM contacts WHERE email = %s OR phone_number = %s', (email, phone))
        check = cur.fetchall()

        if check:
            return jsonify({"error": "Contact already exists"}), 400

        # Insert the new contact
        cur.execute('INSERT INTO contacts (user_id, full_name, email, phone_number) VALUES (%s, %s, %s, %s)',
                    (id, name, email, phone))
        conn.commit()
        return jsonify({"success": "Contact added successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cur.close()
        conn.close()

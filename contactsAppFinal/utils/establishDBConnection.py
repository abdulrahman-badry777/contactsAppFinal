import mariadb


def get_db_connection():
    conn = mariadb.connect(
        user='root',
        password='root', #change password to whatever you have it set
        host='localhost',
        port=3306,
        database='contacts'#choose your perfered database 
    )
    return conn

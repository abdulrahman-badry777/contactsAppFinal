document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('editButton');
    const editForm = document.getElementById('editContactForm');
    const contactInfo = document.getElementById('contactInfo');
    const contactId = window.localStorage.getItem("con_id");

    const spinnerContainer = document.getElementById('spinner-container');
    spinnerContainer.style.display = 'flex'; 

    fetch(`/contact/${contactId}`)
        .then(response => response.json())
        .then(data => {
            spinnerContainer.style.display = 'none'; 
            
            if (data.error) {
                alert(data.error);
            } else {
                document.getElementById('contactFullName').textContent = data.name;
                document.getElementById('contactEmail').textContent = data.email;
                document.getElementById('contactPhoneNumber').textContent = data.phone;
                
                document.getElementById('editContactFullName').value = data.name
                document.getElementById('editContactEmail').value = data.email;
                document.getElementById('editContactPhoneNumber').value = data.phone;
            }
        })
        .catch(error => {
            spinnerContainer.style.display = 'none'; 
            console.error('Error:', error);
            alert('Erorr while loading');
        });

    editButton.addEventListener('click', function() {
        contactInfo.style.display = 'none';
        editForm.style.display = 'block';
    });

    document.getElementById('saveEditButton').addEventListener('click', function() {
        const updatedData = {
            full_name: document.getElementById('editContactFullName').value,
            email: document.getElementById('editContactEmail').value,
            phone_number: document.getElementById('editContactPhoneNumber').value
        };

        fetch(`/contact/${contactId}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                Swal.fire({
                    title: "Success!",
                    text: data.success,
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    window.location.pathname = `/contactList`;
                });
            } else {
                alert(data.error)
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error while loading');
        });
    });
});

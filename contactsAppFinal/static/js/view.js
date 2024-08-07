document.addEventListener('DOMContentLoaded', function() {
    const enableEditCheckbox = document.getElementById('enableEdit');
    const saveButton = document.getElementById('saveButton');
    const inputs = document.querySelectorAll('.details input');

    enableEditCheckbox.addEventListener('change', function() {
        if (this.checked) {
            inputs.forEach(input => input.removeAttribute('readonly'));
            saveButton.style.display = 'block';
        } else {
            inputs.forEach(input => input.setAttribute('readonly', 'readonly'));
            saveButton.style.display = 'none';
        }
    });

    saveButton.addEventListener('click', function() {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;

        const data = {
            name: name,
            email: email,
            phone_number: phone
        };

        fetch('/update_contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Contact updated successfully!');
                // Optionally, you can redirect or refresh the page
                // window.location.reload();
            } else {
                alert('Failed to update contact.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the contact.');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const spinner = document.getElementById('spinner-container');
    
    const contactId = window.localStorage.getItem("con_id");
    fetch(`/contact/${contactId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                document.getElementById('contactName').textContent = data.name;
                document.getElementById('contactEmail').textContent = data.email;
                document.getElementById('contactPhone').textContent = data.phone;
            }
        })
        .catch(error => {
            spinner.style.display = 'none';
            console.error('Error:', error);
            alert('proplem while loading');
        });

    // document.getElementById('editButton').addEventListener('click', function() {
    //     window.location.href = `/edit_contact?id=${contactId}`;
    // });
    // Existing JavaScript...

// Add an event listener to the back button
document.getElementById('backButton').addEventListener('click', function() {
    window.location.pathname = '/contactList';
});

});

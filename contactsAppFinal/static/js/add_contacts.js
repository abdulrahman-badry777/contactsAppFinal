document.getElementById('newContactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const Uid = window.localStorage.getItem("user_id");
    const full_name = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone_number = document.getElementById('phone-number').value.trim();

    if (!full_name || !email || !phone_number) {
        Swal.fire({
            title: 'Error!',
            text: 'All fields are required.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
        return;
    }

    const iti = window.intlTelInput(document.getElementById('phone_number'), {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            fetch('https://ipinfo.io/json', { headers: { 'Accept': 'application/json' } })
                .then(response => response.json())
                .then(data => callback(data.country))
                .catch(() => callback('us'));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
    });

    const checkphone = iti.isValidNumber();
    if (checkphone) {
        fetch('/contacts')
            .then(response => response.json())
            .then(details => {
                const contactExists = details.find(detail => detail.email === email && detail.phone_number === phone_number);
                if (contactExists) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Contact already exists.',
                        icon: 'error',
                        confirmButtonText: 'Try Again'
                    });
                } else {
                    fetch('/contacts_add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: Uid,
                            full_name: full_name,
                            email: email,
                            phone_number: phone_number
                        })
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Failed to add contact.');
                        }
                    })
                    .then(data => {
                        if(data.success==="Contact added successfully"){
                        Swal.fire({
                            title: 'Success!',
                            text: data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.pathname = '/contacts';
                        });}
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'Try Again'
                        });
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            });
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid phone number.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    }
});

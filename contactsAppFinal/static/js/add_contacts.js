document.addEventListener("DOMContentLoaded", function () {
    const phoneInputField = document.getElementById('phone-number');
    const iti = window.intlTelInput(phoneInputField, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            fetch('https://ipinfo.io/json', { headers: { 'Accept': 'application/json' } })
                .then(response => response.json())
                .then(data => {
                    console.log('Country code detected:', data.country);
                    callback(data.country);
                })
                .catch(() => {
                    console.log('Could not detect country code, defaulting to US.');
                    callback('us');
                });
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
    });

    // Regular expression for email validation with @gmail.com
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|info|biz)$/;

    document.getElementById('newContactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const Uid = window.localStorage.getItem("user_id");
        const full_name = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone_number = phoneInputField.value.trim();
        
        // Check if all fields are filled
        if (!full_name || !email || !phone_number) {
            Swal.fire({
                title: "Error!",
                text: "All fields are required.",
                icon: "error",
                confirmButtonText: "Try Again"
            });
            return;
        }

        // Validate email
        if (!emailPattern.test(email)) {
            Swal.fire({
                title: "Error!",
                text: "Email must be in the format: <username>@gmail.com",
                icon: "error",
                confirmButtonText: "Try Again"
            });
            return;
        }

        // Validate phone number
        if (!iti.isValidNumber()) {
            Swal.fire({
                title: "Error!",
                text: "Invalid phone number.",
                icon: "error",
                confirmButtonText: "Try Again"
            });
            return;
        }

        // If all validations pass, send data to server
        fetch('/add_contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Uid": Uid,
                "full-name": full_name,
                "email": email,
                "phone-number": phone_number
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {throw new Error(err.error)});
            }
        })
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: "Success!",
                    text: data.success,
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    window.location.pathname = '/contactList';
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: data.error,
                    icon: "error",
                    confirmButtonText: "Try Again"
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "Try Again"
            });
        });
    });
});

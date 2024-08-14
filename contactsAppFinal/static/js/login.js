document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('mail').value;
    const password = document.getElementById('pass').value;

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            email: email,
            password: password
        })
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch users.');
        }
    })
    .then(data => {
        if (data.status === 'success') {
            window.localStorage.setItem("user_id", data.user_id);
            Swal.fire({
                title: 'Success!',
                text: 'You have logged in successfully.🥳',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.pathname = `/contactList`;
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        Swal.fire({
            title: 'Error!',
            text: 'An unexpected error occurred.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    });
});


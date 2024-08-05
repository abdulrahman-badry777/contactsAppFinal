document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    const email = document.getElementById('mail').value;
    const password = document.getElementById('pass').value;

    // Fetch users from backend
    fetch('/login')
        .then(response => {
            if(response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to fetch users.');
            }
        })
        .then(users => {
            // Check if the user exists
            console.log(users);
            let user = 0;
            users.forEach(u => {
                if(u.email === email && u.password === password) {
                    user = true;
                    window.localStorage.setItem("user_id",`${u.id}`);
                }
            });
            if (user) {
                console.log("exits")
                Swal.fire({
                    title: 'Success!',
                    text: 'You have logged in successfully.🥳',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.pathname = `/contact-list`;
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid email or password.🙄',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
                console.log("no exits")
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    const email = document.getElementById('mail').value;
    const password = document.getElementById('pass').value;

fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: new URLSearchParams({
        email: email,
        password: password
    })
})
.then(response => {
    if(response.status === 200) {
        return response.json();
    } else {
        throw new Error('Failed to fetch users.');
    }
})
.then(users => {
    console.log(users.data);
    let user = false;
    for (let i = 0; i < users.data.length; i++) {
        if(users.data[i][1] === email && users.data[i][2] === password) {
            user = true;
            window.localStorage.setItem("user_id", `${users.data[i][0]}`);
            break;
    }
}
    if (user) {
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
            text: 'Invalid email or password.🙄',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    }
})
.catch(error => {
    console.error('Error fetching user data:', error);
});
});

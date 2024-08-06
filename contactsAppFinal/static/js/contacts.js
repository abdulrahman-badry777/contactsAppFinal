setTimeout(function() {
    document.getElementById('spinner-container').style.display = 'none';
}, 1000);

// Function to add animation on icon hover
document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains("fa-trash")) {
        e.target.classList.add("fa-bounce");
        e.target.addEventListener('mouseleave', function () {
            e.target.classList.remove("fa-bounce");
        });
    }
    if (e.target.classList.contains("fa-eye")) {
        e.target.classList.add("fa-beat");
        e.target.addEventListener('mouseleave', function () {
            e.target.classList.remove("fa-beat");
        });
    }
    if (e.target.classList.contains("fa-arrows-spin")) {
        e.target.classList.add("fa-spin");
        e.target.addEventListener('mouseleave', function () {
            e.target.classList.remove("fa-spin");
        });
    }
});
let addbut = document.querySelector('.add-button');
if (addbut != null) {
    addbut.onclick = function () {
        window.location.pathname = '/add_contact';
    }
}
let contactdiv = document.querySelector('.contact');
let detailsdiv = document.querySelector('.contact-detalis');
var theId = 0;
if(window.location.pathname == '/contacts') {
document.addEventListener('DOMContentLoaded', () => {
    fetch('/contacts')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let box_con = document.querySelector(".box-con");
            data.forEach(contact => {
                if(contact.user_id === parseInt(window.localStorage.getItem("user_id")) ) {
                    // Clone icons
                let delIcon = document.querySelector('.fa-trash').cloneNode(true);
                let viewIcon = document.querySelector('.fa-eye').cloneNode(true);
                let updateIcon = document.querySelector('.fa-arrows-spin').cloneNode(true);

                // Create contact elements
                let newcontact = document.createElement("div");
                let namecontact = document.createElement("div");
                let buttons = document.createElement("div");

                // Set innerHTML and classes
                namecontact.innerHTML = contact.full_name;
                buttons.classList.add("buttons");
                newcontact.classList.add("box");
                namecontact.classList.add("name");
                delIcon.classList.add("remove");
                viewIcon.classList.add("view-list");
                updateIcon.classList.add("update-list");

                // Append elements
                buttons.appendChild(delIcon);
                buttons.appendChild(viewIcon);
                buttons.appendChild(updateIcon);
                newcontact.appendChild(namecontact);
                newcontact.appendChild(buttons);
                box_con.appendChild(newcontact);

                // Add event listener to delete icon
                delIcon.addEventListener('click', () => {
                    fetch(`/contact/${contact.id}/delete/`, {
                        method: 'POST'
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success === "Contact deleted successfully") {
                            delIcon.parentElement.parentElement.remove(); // REMOVE FROM DOM
                        } else {
                            console.error('Failed to delete contact');
                        }
                });
            })

                // Add event listener to Update icon
                updateIcon.addEventListener('click', function () {
                    theId = contact.id;
                    window.localStorage.setItem("id",`${theId}`);
                    window.location.pathname = `/contact/${theId}/edit`;
                })
                // Add event listener to View icon
                viewIcon.addEventListener('click',function () {
                    window.location.pathname = `/contact/${contact.id}`;
                })
                
                
                if (contactdiv != null && detailsdiv != null) {
                    contactdiv.style.minHeight = `${detailsdiv.offsetHeight + 200}px`;
                }
            }
        });
        })
        .catch(error => {
            console.error('Error fetching contacts:', error);
        });
});
}
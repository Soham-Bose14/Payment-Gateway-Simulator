function togglePassword(){
    var pswd_field = document.getElementById("pswd");
    var toggle_button = document.querySelector(".toggle_btn");

    if(pswd_field.type==="password"){
        pswd_field.type = "text";
        toggle_button.textContent = "Hide";
    }
    else{
        pswd_field.type = "password";
        toggle_button.textContent = "Show";
    }
}

function login(){
    console.log("Login Successful");
    
    //Get form data
    const fluxID = document.getElementById("f_id").value;
    const password = document.getElementById("pswd").value;

    // Send data to the API using fetch
    fetch("/login", {
        method: "POST", // Set method to POST
        headers: {
            "Content-Type": "application/json", // Ensure the data is sent in JSON format
        },
        body: JSON.stringify({ fluxID, password }), // Convert form data to JSON
    })
    .then((response) => {
        if (response.ok) {
            // If the response is successful, redirect to the home.html page
            window.location.href = "/home"; //Redirects to the 'home.html'
            console.log("Login successful!");
            return response.json(); // Parse the response JSON if needed
        } else {
            throw new Error("Login failed");
        }
    })
    
    .catch((error) => {
        console.error("Error:", error);
        alert("Login failed. Please try again.");
    });
}

function openSignUp(){
    // Directly navigate to the sign-up page
    window.location.href = "/signUp"; // This will call the /signUp route in app.js
}

function formatDateToMySQL(date) {
    return date.getFullYear() + '-' + 
           ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
           ('0' + date.getDate()).slice(-2) + ' ' +
           ('0' + date.getHours()).slice(-2) + ':' +
           ('0' + date.getMinutes()).slice(-2) + ':' +
           ('0' + date.getSeconds()).slice(-2);
}

// const formattedDate = formatDateToMySQL(currentDateTime);

function signUp(){
    //Get user data from sign up page
    let password = document.getElementById("pswd").value;
    const currentDateTime = new Date()

    const userData = {
        firstName: document.getElementById("f_name").value,
        lastName: document.getElementById("l_name").value,
        pin: document.getElementById("pin").value,
        email: document.getElementById("email").value,
        bank_acc: document.getElementById("bank_acc").value,
        phoneNumber: document.getElementById("phn_no").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        
        gateway_id: 12345999, //Get it done using python random function
        password_hash: 9439579347, //Get it done using python
        // last_login: 0, //Get it from python time.time() function
        last_login: formatDateToMySQL(currentDateTime),
    }
    fetch("/signUpDetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    window.location.href = "/home";
}
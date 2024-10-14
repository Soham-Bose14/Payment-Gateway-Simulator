function transferMoney(){
    window.location.href = "/pay"
}

function formatDateToMySQL(date) {
    return date.getFullYear() + '-' + 
           ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
           ('0' + date.getDate()).slice(-2) + ' ' +
           ('0' + date.getHours()).slice(-2) + ':' +
           ('0' + date.getMinutes()).slice(-2) + ':' +
           ('0' + date.getSeconds()).slice(-2);
}

function showBalance(){
    
}

function checkBalanceAndPay(){
    let date = new Date();
    date = formatDateToMySQL(date);
    sender_id = 12345675; //Find some mechanism to get sender's id
    recipient_id = document.getElementById("rcp_id").value;
    bank_account = document.getElementById("bank_acc_no").value;
    amount = document.getElementById("amount").value;
    pin = document.getElementById("PIN").value;
    //Verify pin using python
    //Check balance through app.js
    const recipient_details = {sender_id, recipient_id, bank_account, amount, pin, date};
    fetch("/sendMoney", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipient_details),
    })
    .then((response) => {
        if (response.ok) {
            window.location.href = "/success"; 
            console.log("Payment successful!");
            return response.json(); // Parse the response JSON if needed
        } else {
            throw new Error("Login failed");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Payment failed! Please try again.");
    });

}
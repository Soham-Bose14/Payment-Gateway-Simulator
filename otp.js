let countdown = 60;
let countdownInterval;

// Function to handle OTP login
function login() {
    const otpValue = document.getElementById("otp").value;
    // Add your login logic here (e.g., validate OTP)
    alert("Logging in with OTP: " + otpValue);
}

// Function to start the OTP resend countdown
function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    const resendButton = document.getElementById("resend-btn");
    countdown = 60;

    resendButton.disabled = true;
    countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            resendButton.textContent = "Resend OTP";
            resendButton.disabled = false;
        } else {
            resendButton.textContent = `Resend OTP (${countdown}s)`;
        }
    }, 1000);
}

// Function to resend OTP
function resendOTP() {
    alert("OTP has been resent to your email.");
    startCountdown();
}

// Start the countdown on page load
window.onload = startCountdown;

from email.message import EmailMessage
import ssl 
import smtplib
#import os
import random

def generate_random_6_digit()->str:
    return f"{random.randint(0,1000000):06d}"

otp = generate_random_6_digit()
print(otp)

email_sender = "sender_email"
password = "app_password" #remove this while uploading on GitHub

#replace with email from db
#email of person changing account password
email_receiver = "receiver_email" 
subject = "Request for Password Change"
body = f"""
<html>
    <body>
        <p>We have received a password change request for your account.<br><br>
        Your 6-digit OTP is: <br>
        <strong style="font-size: 24px;">{otp}</strong><br><br>
        Please enter it to change your password.<br>
        Ignore this message if it wasn't you.<br><br>
        From,<br>
        Payment Gateway Simulator Team
        </p>
    </body>
</html>
"""
em = EmailMessage()
em['From'] = email_sender
em['To'] = email_receiver
em['Subject'] = subject
em.set_content(body, subtype='html') 

context = ssl.create_default_context()

try:
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())
    print("Email sent successfully!")
except smtplib.SMTPAuthenticationError:
    print("Failed to send email: Authentication error. Please check your credentials.")
except smtplib.SMTPRecipientsRefused:
    print(f"Failed to send email: The recipient {email_receiver} was refused.")
except smtplib.SMTPException as e:
    print(f"Failed to send email: {e}")
except Exception as e:
    print(f"An error occurred: {e}")

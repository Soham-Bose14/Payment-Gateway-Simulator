from email.message import EmailMessage
import ssl 
import smtplib

email_sender = "@gmail.com"  # Sender's email
password = "app password"  # Remove this while uploading on GitHub
email_receiver = "@gmail.com"  # Corrected to be the recipient's email (the sender of the payment)
# Assuming these details are already fetched from the database
sender_first_name = "first"  # Sender's first name
sender_last_name = "last"  # Sender's last name
receiver_acc_num = 12345678  # Receiver's account number
receiver_first_name = "first"  # Receiver's first name
receiver_last_name = "last"  # Receiver's last name
sent_amt = 1000  # Amount sent

# Email to be sent to the sender

subject = "Payment Successful"
body = f"""
<html>
    <body>
        <p>Dear {sender_first_name} {sender_last_name},<br><br>
        
        Your payment of <strong>₹{sent_amt}</strong> to <strong>{receiver_first_name} {receiver_last_name}</strong> (Account Number: <strong>{receiver_acc_num}</strong>) has been successfully processed.<br><br>

        Please review the transaction details below:<br>
        <strong>Sender's Name:</strong> {sender_first_name} {sender_last_name}<br>
        <strong>Receiver's Name:</strong> {receiver_first_name} {receiver_last_name}<br>
        <strong>Receiver's Account Number:</strong> {receiver_acc_num}<br>
        <strong>Amount Sent:</strong>₹{sent_amt}<br><br>
        
        If you have any questions regarding this transaction, or if you didn't initiate this payment, please contact our support team immediately.<br><br>
        
        Thank you for using our service.<br><br>
        
        From,<br>
        Payment Gateway Simulator Team
        </p>
    </body>
</html>
"""

em = EmailMessage()
em['From'] = email_sender
em['To'] = email_receiver  # Corrected to the recipient's email
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

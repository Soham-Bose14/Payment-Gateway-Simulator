from email.message import EmailMessage
import ssl 
import smtplib

email_sender = "paymentgatewaysimulator@gmail.com"  # Sender's email (the service)
password = "bupz fhaj fzpp fwdp"  # Remove this before uploading to GitHub
email_receiver = "harshshah0070@gmail.com"

# Assuming these details are already fetched from the database
sender_first_name = "Harsh"  # Sender's first name
sender_last_name = "Shah"  # Sender's last name
receiver_acc_num = 12345678  # Receiver's account number
receiver_first_name = "Soham"  # Receiver's first name
receiver_last_name = "Bose"  # Receiver's last name
received_amt = 1000  # Amount received

# Email to be sent to the receiver
  # Receiver's email (replace with actual email from DB)
subject = "Payment Received"
body = f"""
<html>
    <body>
        <p>Dear {receiver_first_name} {receiver_last_name},<br><br>
        
        You have successfully received a payment of <strong>₹{received_amt}</strong> from <strong>{sender_first_name} {sender_last_name}</strong>.<br><br>

        Please review the transaction details below:<br>
        <strong>Receiver's Name:</strong> {receiver_first_name} {receiver_last_name}<br>
        <strong>Receiver's Account Number:</strong> {receiver_acc_num}<br>
        <strong>Amount Received:</strong> ₹{received_amt}<br>
        <strong>Sender's Name:</strong> {sender_first_name} {sender_last_name}<br><br>
        
        If you have any questions regarding this transaction, please contact our support team.<br><br>
        
        Thank you for using our service.<br><br>
        
        From,<br>
        Payment Gateway Simulator Team
        </p>
    </body>
</html>
"""

em = EmailMessage()
em['From'] = email_sender
em['To'] = email_receiver  # Receiver's email
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

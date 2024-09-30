#file  to check if a password is valid or no

import string
def valid_password(password:str)->bool:
    if(len(password)<8):
            return False
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    special_char = string.punctuation
    has_special_char = any(c in special_char for c in password)
    return has_upper and has_lower and has_digit and has_special_char

#get user inputed password to verify/ don't store password
password = "12#ajhdamASF^,"
password_status = valid_password(password)

#display message if password is valid/invalid
if(password_status):
      print("Valid Password")
else :
      print("Password must have at least 8 characters, 1 Lowercase letter, 1 Uppercase letter, 1 digit and 1 special character")

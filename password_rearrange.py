from valid_password import valid_password
from generate_salt import generate_salt

def rearrange_pass_salt(password : str,salt: str):
    n = ord(password[0])%16
    front = salt[:n]
    back  = salt[n:]
    return f"{front}{password}{back}"

password = input("Enter Password: ")

isvalid = valid_password(password)
salt = generate_salt()

if isvalid :
    pass_with_salt = rearrange_pass_salt(password,salt)
    print(f"The password {password} with salt: {pass_with_salt} ")
else:
    print(f"Is Password Valid: {isvalid}")


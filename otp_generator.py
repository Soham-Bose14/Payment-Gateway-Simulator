import random

def generate_random_4_digit()->str:
    return f"{random.randint(0,10000):04d}"

otp = generate_random_4_digit()
print(otp)

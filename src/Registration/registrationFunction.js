export function generateOTP() {
    var digits = '0123456789';
    var otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    // document.getElementById('otp').value = otp;
    return otp;
  }
  

  
  export function generatePassword() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var password = '';
    for (let i = 0; i < 8; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // document.getElementById('password').value = password;
    return password;
  }




  export function createTxtFile(email, name, mob,pass,otp, role, link) {
    const content = `Email:${email}\n Name:${name}\nMobile: ${mob}\nPassword: ${pass}\nOTP: ${otp}\nRole: ${role}\nLink To Login: ${link}`;

    // console.log(content)
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'formData.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
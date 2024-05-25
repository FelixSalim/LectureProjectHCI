const showHiddenPass = (registerPass, registerEye) => {
    const input = document.getElementById(registerPass);
    const iconEye = document.getElementById(registerEye);

    iconEye.addEventListener('click', () => {
        if(input.type === 'password') {
            input.type = 'text';
            iconEye.classList.remove('ri-eye-off-line');
            iconEye.classList.add('ri-eye-line');
        } else {
            input.type = 'password';
            iconEye.classList.remove('ri-eye-line');
            iconEye.classList.add('ri-eye-off-line');
        }
    })
}

showHiddenPass('register-pass', 'register-eye')
showHiddenPass('register-pass-conf', 'register-eye-conf')

loadLocalStorage()

let back = document.querySelector('#back');

back.addEventListener('click', () => {
    location.href = "index.html";
})

const pw = [document.getElementById("register-pass"), document.getElementById("register-pass-conf")]
const see = document.querySelectorAll(".see")
see.forEach((s, i) => {
    s.addEventListener("click", () => {
        if (pw[i].type == "password") {
            pw[i].type = "text"
        } else {
            pw[i].type = "password"
        }
    })
})

const btn = document.querySelector(".register-button")
const error = document.querySelector(".error")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    let fullName = document.getElementById("name").value
    let userName = document.getElementById("username").value
    let phoneNumber = document.getElementById("phone").value
    let email = document.getElementById("email").value
    let password = document.getElementById("register-pass").value
    let confPassword = document.getElementById("register-pass-conf").value
    if (fullName.length == 0 || userName.length == 0 || phoneNumber.length == 0 || email.length == 0 || password.length == 0 || confPassword.length == 0) {
        error.innerHTML = "Semua data harus diisi!"
        return
    }
    let flag = true
    for (let i = 0; i < phoneNumber.length; i++) {
        if (phoneNumber[i] >= "0" && phoneNumber[i] <= "9") {
            continue
        } else {
            flag = false
            break
        }
    }
    if (!flag) {
        error.innerHTML = "Nomor Telepon hanya terdiri dari angka!"
        return
    }
    let aCount = 0
    for (let i = 0; i < email.length; i++) {
        if (email[i] == "@") {
            aCount += 1
        }
    }
    if (aCount != 1) {
        error.innerHTML = "Email harus mengandung 1 @"
        return
    }

    if (password != confPassword) {
        error.innerHTML = "Password dan Konfirmasi Password harus sama"
        return
    }
    
    error.innerHTML = ""
    pushAcc(fullName, userName, password, phoneNumber, email)
    storeLocalStorage()
    document.location.href = "login.html"
})
loadLocalStorage()

let back = document.querySelector('#back');

back.addEventListener('click', () => {
    location.href = "index.html";
})

const pw = [document.getElementById("password"), document.getElementById("conf-password")]
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

const btn = document.querySelector(".button")
const error = document.querySelector(".error")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    let fullName = document.getElementById("name").value
    let userName = document.getElementById("username").value
    let phoneNumber = document.getElementById("phone").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confPassword = document.getElementById("conf-password").value
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
    let dCount = 0
    for (let i = 0; i < email.length; i++) {
        if (email[i] == "@") {
            aCount += 1
        }
        if (email[i] == ".") {
            dCount += 1
        }
    }
    if (aCount != 1 || dCount != 1) {
        error.innerHTML = "Email harus mengandung 1 @ dan 1 ."
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
loadLocalStorage()

let back = document.querySelector('#back');

back.addEventListener('click', () => {
    location.href = "index.html";
})

const pw = document.getElementById("password")
const see = document.querySelector(".see")
see.addEventListener("click", () => {
    if (pw.type == "password") {
        pw.type = "text"
    } else {
        pw.type = "password"
    }
})

const btn = document.querySelector(".button")
const error = document.querySelector(".error")
btn.addEventListener("click", (e) => {
    e.preventDefault()
    let userName = document.getElementById("username").value
    let password = document.getElementById("password").value
    if (userName.length == 0 || password.length == 0) {
        error.innerHTML = "Username dan Password tidak boleh kosong!"
        return
    }
    let found = false
    let userIndex = -1
    for (let i = 0; i < accounts.userNames.length; i++) {
        if (userName == accounts.userNames[i] && password == accounts.passwords[i]) {
            found = true
            userIndex = i
            break
        }
    }
    if (!found) {
        error.innerHTML = "User tidak ditemukan atau password tidak sesuai!"
        return
    }
    error.innerHTML = ""
    activeUser = userIndex
    storeCurrentUser()
    document.location.href = `index.html`
})
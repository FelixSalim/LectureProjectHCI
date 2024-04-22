const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass);
    const iconEye = document.getElementById(loginEye);

    iconEye.addEventListener("click", () => {
        if(input.type === "password") {
            input.type = "text";
            iconEye.classList.remove("ri-eye-off-line");
            iconEye.classList.add("ri-eye-line");
        } else {
            input.type = "password";
            iconEye.classList.remove("ri-eye-line");
            iconEye.classList.add("ri-eye-off-line");
        }
    })
}

showHiddenPass("login-pass", "login-eye")

loadLocalStorage()

let back = document.querySelector("#back");

back.addEventListener("click", () => {
    location.href = "index.html";
})

const pw = document.getElementById("login-pass")

const btn = document.querySelector(".login-button")
const error = document.querySelector(".error")
btn.addEventListener("click", (e) => {  
    e.preventDefault()
    let userName = document.getElementById("username").value
    let password = document.getElementById("login-pass").value
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
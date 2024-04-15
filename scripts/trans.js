loadLocalStorage()
loadCurrentUser()

const logRegSect = document.querySelector(".log-reg-section")
if (activeUser == -1) {
    logRegSect.innerHTML = `
    <a href="login.html">Login</a>
    <a href="register.html">Register</a>
    `
} else {
    let username = accounts.userNames[activeUser]
    if (username.length > 6) {
        username = username.substring(0, 6) + "..."
    }
    logRegSect.innerHTML = `
    <img src="assets/images/profilepic.png">
    <p>${username}</p>
    <p>Logout</p>
    `

    const logout = document.querySelector(".log-reg-section p:last-of-type")
    logout.addEventListener("click", () => {
        activeUser = -1;
        storeCurrentUser()
        document.location.href = "index.html"
    })
}

const desc = document.querySelector(".desc")

setInterval(() => {
    let rect = desc.getBoundingClientRect()
    if (rect.top >= 0 && rect.top + 30 <= (window.innerHeight || document.documentElement.clientHeight)) {
        let n = getComputedStyle(desc).getPropertyValue("--n")
        if (n <= 30) {
            setInterval(() => {
                n++
                desc.style.setProperty("--n", n)
            }, 100)
        }    
    }
}, 100)


const searchParam = new URLSearchParams(document.location.search)
let type = searchParam.get("type")
let imageSrc = type
const img = document.querySelectorAll(".type-img")
img.forEach((i) => {
    if (type == "voucher") {
        imageSrc = "game"
    }
    i.src = "assets/images/" + imageSrc + "-icon.png"
})

const gameTitle = document.querySelector(".game-title p")
const detTitle = document.querySelector(".det-title")
const det = document.querySelector(".det")
let date = new Date()
let method = searchParam.get("method")
let item = searchParam.get("item")
let price = searchParam.get("price")
if (type == "game") {
    let UID = searchParam.get("UID")
    let SID = searchParam.get("SID")
    gameTitle.innerHTML = "Mobile Legends [PROMO TERMURAH] V3"
    detTitle.innerHTML = `
    <p>Transaction ID</p>
    <p>Transaction Date</p>
    <p>User ID (Server)</p>
    <p>Payment Method</p>
    <p>Product Name</p>
    <p>Total Price</p>
    `
    det.innerHTML = `
    <p>#API1234554321</p>
    <p>${(date.getDate() < 10) ? "0" + date.getDate() : date.getDate()} - ${(date.getMonth() < 10) ? "0" + date.getMonth() : date.getMonth()} - ${date.getFullYear()} | ${(date.getHours() < 10) ? "0" + date.getHours() : date.getHours()}:${(date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()}:${(date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()}</p>
    <p>${UID} (${SID})</p>
    <p>${method}</p>
    <p>${item}</p>
    <p>${price}</p>
    `
} else if (type == "voucher") {
    gameTitle.innerHTML = "Mobile Legends [VOUCHERS] V3"
    detTitle.innerHTML = `
    <p>Transaction ID</p>
    <p>Transaction Date</p>
    <p>Payment Method</p>
    <p>Product Name</p>
    <p>Total Price</p>
    `
    det.innerHTML = `
    <p>#API1234554321</p>
    <p>${(date.getDate() < 10) ? "0" + date.getDate() : date.getDate()} - ${(date.getMonth() < 10) ? "0" + date.getMonth() : date.getMonth()} - ${date.getFullYear()} | ${(date.getHours() < 10) ? "0" + date.getHours() : date.getHours()}:${(date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()}:${(date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()}</p>
    <p>${method}</p>
    <p>${item}</p>
    <p>${price}</p>
    `
} else if (type == "pulsa") {
    let phone = searchParam.get("phone")
    gameTitle.innerHTML = "Pulsa Lengkap Telkomsel"
    detTitle.innerHTML = `
    <p>Transaction ID</p>
    <p>Transaction Date</p>
    <p>Phone Number</p>
    <p>Payment Method</p>
    <p>Product Name</p>
    <p>Total Price</p>
    `
    det.innerHTML = `
    <p>#API1234554321</p>
    <p>${(date.getDate() < 10) ? "0" + date.getDate() : date.getDate()} - ${(date.getMonth() < 10) ? "0" + date.getMonth() : date.getMonth()} - ${date.getFullYear()} | ${(date.getHours() < 10) ? "0" + date.getHours() : date.getHours()}:${(date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()}:${(date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()}</p>
    <p>${phone}</p>
    <p>${method}</p>
    <p>${item}</p>
    <p>${price}</p>
    `
} else {
    let phone = searchParam.get("phone")
    gameTitle.innerHTML = "Top Up Saldo Gopay"
    detTitle.innerHTML = `
    <p>Transaction ID</p>
    <p>Transaction Date</p>
    <p>Phone Number</p>
    <p>Payment Method</p>
    <p>Product Name</p>
    <p>Total Price</p>
    `
    det.innerHTML = `
    <p>#API1234554321</p>
    <p>${(date.getDate() < 10) ? "0" + date.getDate() : date.getDate()} - ${(date.getMonth() < 10) ? "0" + date.getMonth() : date.getMonth()} - ${date.getFullYear()} | ${(date.getHours() < 10) ? "0" + date.getHours() : date.getHours()}:${(date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()}:${(date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()}</p>
    <p>${phone}</p>
    <p>${method}</p>
    <p>${item}</p>
    <p>${price}</p>
    `
}

const btn = document.querySelector(".pay-btn")
btn.addEventListener("click", () => {
    document.location.href = "index.html"
})
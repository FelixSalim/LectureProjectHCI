loadLocalStorage()
loadCurrentUser()

const logo = document.querySelector(".logo")
logo.addEventListener("click", () => {
    document.location.href = "index.html"
})

const logRegSect = document.querySelector(".log-reg-section")
if (activeUser == -1) {
    logRegSect.innerHTML = `
    <a href="login.html">Login</a>
    <a href="register.html">Register</a>
    `
} else {
    let username = accounts.userNames[activeUser]
    if (username.length > 5) {
        username = username.substring(0, 5) + "<br>.."
    }
    logRegSect.innerHTML = `
    <div class="profile-section">
        <img src="assets/images/profilepic.png">
        <p>${username}</p>
    </div>
    <p>Logout</p>
    `

    const user = document.querySelector(".profile-section > p")
    user.addEventListener("click", () => {
        document.location.href = "trans_history.html"
    })

    const logout = document.querySelector(".log-reg-section > p")
    logout.addEventListener("click", () => {
        activeUser = -1;
        storeCurrentUser()
        document.location.href = "index.html"
    })
}

let alreadyIn = []

$(document).ready(() => {
    $(".search-input").keyup(() => {
        let search = $(".search-input").val()
        let regex = new RegExp(search, "i") // "i" = case insensitive
        let nameInsert = []
        let imageInsert = []
        let typeInsert = []
        $.getJSON("assets/data/game-data.json", (data) => {
            $.each(data, (key, value) => {
                if (value.name.search(regex) != -1 && search != "") { // exists
                    nameInsert.push(value.name)
                    imageInsert.push(value.image)
                    typeInsert.push(value.type)
                    
                }
            })
            if (typeInsert.length != alreadyIn.length) {
                $(".auto-complete-items").html("")
                for (let i = 0; i < nameInsert.length; i++) {
                    $(".auto-complete-items").append(
                        `
                        <div class="ac-items ${typeInsert[i]}">
                            <img src="${imageInsert[i]}">
                            <p>${nameInsert[i]}</p>
                        </div>
                        `
                    )
                    alreadyIn.push(typeInsert[i])
                    document.querySelector(`.${typeInsert[i]}`).addEventListener("click", () => {
                        window.location.href = "items.html?type=" + typeInsert[i]
                    })
                } 
            }
        })
    })
})

const showDashboard = document.querySelector(".dashboard-icon")
const dashboard = document.querySelector(".dashboard-area")
const dbContainer = document.querySelector(".dashboard-area-container")
showDashboard.addEventListener("click", (e) => {
    e.stopPropagation()
    removeSearch()
    dashboard.classList.add("opened-db")
    dbContainer.classList.add("opened")
})

function closeDB() {
    dashboard.classList.remove("opened-db")
    dbContainer.classList.remove("opened")
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 821) {
        closeDB()
    } 
})

dbContainer.addEventListener("click", () => {
    document.removeEventListener("click", closeDB)
    setTimeout(() => {
        document.addEventListener("click", closeDB)
    }, 10)
})

const closeIcon = document.querySelector(".close-icon")
closeIcon.addEventListener("click", closeDB)
document.addEventListener("click", closeDB)

const checkTrans = document.querySelectorAll(".check-trans")
const contentWarning = document.querySelector(".content-warning")
checkTrans.forEach((c) => {
    c.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (activeUser == -1) {
            contentWarning.classList.add("show-warning")
            closeDB()
        } else {
            document.location.href = "trans_history.html"
        }
    })
})

const searchBox = document.querySelector(".search-box")
const searchIcon = document.querySelector(".search-box img")
const search = document.querySelector(".search-box input")
searchIcon.addEventListener("click", () => {
    if (window.innerWidth <= 500) {
        search.classList.add("show-search")
        logRegSect.classList.add("hide-sect")
    }
})

function removeSearch() {
    search.classList.remove("show-search")
    logRegSect.classList.remove("hide-sect")
    search.value = ""
    document.querySelector(".auto-complete-items").innerHTML = ""
    alreadyIn = []
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 500) {
        removeSearch()
    }
})

searchBox.addEventListener("click", () => {
    document.removeEventListener("click", removeSearch)
    setTimeout(() => {
        document.addEventListener("click", removeSearch)
    }, 10)
})

document.addEventListener("click", removeSearch)

const exit = document.querySelector(".exit-container img")
const logWarn = document.querySelector(".login-warning")

function removePopUp() {
    contentWarning.classList.remove("show-warning")
}

logWarn.addEventListener("click", (e) => {
    document.removeEventListener("click", removePopUp)
    setTimeout(() => {
        document.addEventListener("click", removePopUp)
    }, 10)
})

document.addEventListener("click", removePopUp)
exit.addEventListener("click", removePopUp)

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
let currDate = `${(date.getDate() < 10) ? "0" + date.getDate() : date.getDate()} - ${(date.getMonth() < 10) ? "0" + date.getMonth() : date.getMonth()} - ${date.getFullYear()} | ${(date.getHours() < 10) ? "0" + date.getHours() : date.getHours()}:${(date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()}:${(date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()}`
let method = searchParam.get("method")
let item = searchParam.get("item")
let price = searchParam.get("price")
let transData = {
    transID : "#API1234554321",
    transDate : currDate,
    item : item,
    method : method,
    price : price
}
if (type == "game") {
    let UID = searchParam.get("UID")
    let SID = searchParam.get("SID")
    transData.ID = UID + " (" + SID + ")"
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
    <p>${transData.transDate}</p>
    <p>${transData.ID}</p>
    <p>${transData.method}</p>
    <p>${transData.item}</p>
    <p>${transData.price}</p>
    `
} else if (type == "voucher") {
    transData.ID = "-"
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
    transData.ID = phone
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
    transData.ID = phone
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
    if (activeUser != -1) {
        console.log(transData)
        accounts.trans[activeUser].push(transData)
        storeLocalStorage()
    }
    setTimeout(() => {
        document.location.href = "index.html"
    }, 10)
})
loadLocalStorage()
loadCurrentUser()

const logo = document.querySelectorAll(".logo img, .logo p")
logo.forEach((e) => {
    e.addEventListener("click", () => {
        document.location.href = "index.html"
    })
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
        username = username.substring(0, 5) + ".."
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

const mainProfile = document.querySelector(".main")
const details = document.querySelector(".details")

mainProfile.innerHTML = `
    <img src="assets/images/profilepic.png">
    <p>${accounts.userNames[activeUser]}</p>
`

details.innerHTML = `
    <div class="detail">
        <p>Fullname</p>
        <p>:&emsp;${accounts.fullNames[activeUser]}</p>
    </div>
    <div class="detail">
        <p>Username</p>
        <p>:&emsp;${accounts.userNames[activeUser]}</p>
    </div>
    <div class="detail">
        <p>Nomor Telepon</p>
        <p>:&emsp;${accounts.phones[activeUser]}</p>
    </div>
    <div class="detail">
        <p>Email</p>
        <p>:&emsp;${accounts.emails[activeUser]}</p>
    </div>
`

const trans = document.querySelector(".transaction-details")
trans.innerHTML = ""
if (accounts.trans[activeUser].length == 0) {
    trans.innerHTML = `
        <div class="trans-detail">
            <p> - </p>
            <p> - </p>
            <p> - </p>
            <p> - </p>
            <p> - </p>
        </div>
    `
}
for (let i = 0; i < accounts.trans[activeUser].length; i++) {
    let transaction = accounts.trans[activeUser][i]
    trans.innerHTML += `
    <div class="trans-detail">
        <div class="mobile-only">
            <p> Tanggal </p>
            <p> Invoice </p>
            <p> Produk  </p>
            <p> ID/No </p>
            <p> Status </p>
        </div>
        <div class="detail-items">
            <p> ${transaction.transDate} </p>
            <p> ${transaction.transID} </p>
            <p> ${transaction.item} </p>
            <p> ${transaction.ID} </p>
            <p> Pending </p>
        </div>
    </div>
    `
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
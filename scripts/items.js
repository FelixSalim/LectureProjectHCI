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

    const logout = document.querySelector(".log-reg-section p:last-of-type")
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

const checkTrans = document.querySelectorAll(".check-trans")
const contentWarning = document.querySelector(".content-warning")
checkTrans.forEach((c) => {
    c.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (activeUser == -1) {
            contentWarning.classList.add("show-warning")
        } else {
            document.location.href = "trans_history.html"
        }
    })
})

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

let type = new URLSearchParams(document.location.search).get("type")
let imageSrc = type
const images = document.querySelectorAll(".type-img")
images.forEach((image) => {
    if (type == "voucher") {
        imageSrc = "game"
    }
    image.src = "assets/images/" + imageSrc + "-icon.png"
})

const gameDescs = document.querySelectorAll(".game-descriptions p")

if(type == "game") {
    gameDescs[0].innerHTML = "Mobile Legends [PROMO TERMURAH] V3"
    gameDescs[1].innerHTML = "Moonton"
    gameDescs[2].innerHTML = "Top Up Mobile Legends [PROMO TERMURAH] V3"
} else if (type == "voucher") {
    gameDescs[0].innerHTML = "Mobile Legends [VOUCHERS] V3"
    gameDescs[1].innerHTML = "Moonton"
    gameDescs[2].innerHTML = "Beli Voucher Mobile Legends [HARGA TERMURAH]"
} else if (type == "pulsa") {
    gameDescs[0].innerHTML = "Pulsa Lengkap"
    gameDescs[1].innerHTML = "Telkomsel"
    gameDescs[2].innerHTML = "Isi Pulsa Telkomsel [HARGA TERMURAH]"
} else {
    gameDescs[0].innerHTML = "Top Up Saldo"
    gameDescs[1].innerHTML = "Gopay"
    gameDescs[2].innerHTML = "Top Up Saldo Gopay [HARGA TERMURAH]"
}

const nominals = document.querySelector(".nominals")

if(type == "game") {
    nominals.innerHTML = ""
    for (let i = 0; i < 24; i++) {
        nominals.innerHTML += `
        <div class="nominal-cards"> 
            <p>Weekly Diamond Pass</p>
            <p>Rp26.982</p>
        </div>
        `
    }
} else if (type == "voucher") {
    nominals.innerHTML = ""
    for (let i = 0; i < 24; i++) {
        nominals.innerHTML += `
        <div class="nominal-cards"> 
            <p>MLBB Gift Card $5</p>
            <p>Rp66.200</p>
        </div>
        `
    }
} else if (type == "pulsa") {
    nominals.innerHTML = ""
    for (let i = 0; i < 24; i++) {
        nominals.innerHTML += `
        <div class="nominal-cards"> 
            <p>Pulsa 10.000</p>
            <p>Rp10.519</p>
        </div>
        `
    }
} else {
    nominals.innerHTML = ""
    for (let i = 0; i < 24; i++) {
        nominals.innerHTML += `
        <div class="nominal-cards"> 
            <p>Gopay Customer 10.000</p>
            <p>Rp10.525</p>
        </div>
        `
    }
}

const accDetails = document.querySelector(".account-details")
if (type == "game") {
    accDetails.innerHTML = `
    <p>User ID</p>
    <input type="text" class="UID">
    <p>Server ID</p>
    <input type="text" class="SID">
    `
} else if (type == "pulsa" || type == "eWallet") {
    accDetails.innerHTML = `
    <p>Nomor Tujuan</p>
    <input type="text" class="Number">
    `
}

const methods = document.querySelectorAll(".methods")
const dropdown = document.querySelectorAll(".dropdown")

methods.forEach((method, index) => {
    method.addEventListener("click", () => {
        dropdown.forEach((drop, idx) => {
            if (idx != index) drop.classList.remove("active-dropdown")
        })
        dropdown[index].classList.toggle("active-dropdown")
    })
})

const items = document.querySelectorAll(".nominal-cards")
const methodItems = document.querySelectorAll(".dropdown-item")
items.forEach((item, index) => {
    item.addEventListener("click", () => {
        items.forEach((it, idx) => {
            if (idx != index) it.classList.remove("selected-item")
        })
        item.classList.toggle("selected-item")
    })
})
methodItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        e.stopPropagation()
        methodItems.forEach((it, idx) => {
            if (idx != index) it.classList.remove("selected-item")
        })
        item.classList.toggle("selected-method")
    })
})

const btn = document.querySelector(".continue-btn")
const error = document.querySelector(".error")
btn.addEventListener("click", () => {
    let selectedItem = document.querySelectorAll(".selected-item p")
    let selectedMethod = document.querySelector(".selected-method p")
    if (type == "game") {
        let UID = document.querySelector(".UID").value
        let SID = document.querySelector(".SID").value
        if (selectedItem != null && selectedMethod != null && UID.length != 0 && SID.length != 0) {
            let flag = true
            for (let i = 0; i < UID.length; i++) {
                if (UID[i] >= "0" && UID[i] <= "9") {
                    continue
                } else {
                    flag = false
                    break
                }
            }

            for (let i = 0; i < SID.length; i++) {
                if (SID[i] >= "0" && SID[i] <= "9") {
                    continue
                } else {
                    flag = false
                    break
                }
            }
            
            if (flag) document.location.href = `trans.html?type=${type}&item=${selectedItem[0].textContent}&price=${selectedItem[1].textContent}&UID=${UID}&SID=${SID}&method=${selectedMethod.textContent}`
            else {
                error.innerHTML = "User ID dan Server ID hanya boleh angka !"
                error.style.display = "flex"
            }
        } else {
            error.innerHTML = "Data belum lengkap!"
            error.style.display = "flex"
        }
    } else if (type == "eWallet" || type == "pulsa") {
        let phone = document.querySelector(".Number").value
        if (selectedItem != null && selectedMethod != null && phone.length != 0) {
            let flag = true
            for (let i = 0; i < phone.length; i++) {
                if (phone[i] >= "0" && phone[i] <= "9") {
                    continue;
                } else {
                    flag = false
                    break
                }
            }
            if (flag) document.location.href = `trans.html?type=${type}&item=${selectedItem[0].textContent}&price=${selectedItem[1].textContent}&phone=${phone}&method=${selectedMethod.textContent}`
            else {
                error.innerHTML = "Nomor Telepon hanya boleh angka!"
                error.style.display = "flex"
            }
        } else {
            error.innerHTML = "Data belum lengkap!"
            error.style.display = "flex"
        }
    } else {
        if (selectedItem != null && selectedMethod != null) {
            document.location.href = `trans.html?type=${type}&item=${selectedItem[0].textContent}&price=${selectedItem[1].textContent}&method=${selectedMethod.textContent}`
        } else {
            error.innerHTML = "Data belum lengkap!"
            error.style.display = "flex"
        }
    }
})


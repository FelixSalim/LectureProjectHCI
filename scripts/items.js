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
    let selectedItem = document.querySelector(".selected-item p:first-of-type")
    let selectedMethod = document.querySelector(".selected-method p")
    if (type == "game") {
        let UID = document.querySelector(".UID").value
        let SID = document.querySelector(".SID").value
        if (selectedItem != null && selectedMethod != null && UID.length != 0 && SID.length != 0) {
            document.location.href = `index.html?type=game&item=${selectedItem.textContent}&UID=${UID}&SID=${SID}&method=${selectedMethod.textContent}`
        } else {
            error.style.display = "flex"
        }
    } else if (type == "eWallet" || type == "pulsa") {
        let phone = document.querySelector(".Number").value
        if (selectedItem != null && selectedMethod != null && phone.length != 0) {
            document.location.href = `index.html?type=game&item=${selectedItem.textContent}&phone=${phone}&method=${selectedMethod.textContent}`
        } else {
            error.style.display = "flex"
        }
    } else {
        if (selectedItem != null && selectedMethod != null) {
            document.location.href = `index.html?type=voucher&item=${selectedItem.textContent}&methodd=${selectedMethod.textContent}`
        } else {
            error.style.display = "flex"
        }
    }
})


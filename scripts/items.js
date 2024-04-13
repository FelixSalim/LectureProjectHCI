const desc = document.querySelector(".desc")

window.addEventListener("scroll", () => {
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
})

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
            <p>Mobile Legends Gift Card $5</p>
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
    <input type="text">
    <p>Server ID</p>
    <input type="text">
    `
} else if (type == "pulsa" || type == "eWallet") {
    accDetails.innerHTML = `
    <p>Nomor Tujuan</p>
    <input type="text">
    `
}
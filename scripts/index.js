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

const selectors = document.querySelectorAll(".selection")
const cards = document.querySelectorAll(".cards")

selectors.forEach((selector, index) => {
    selector.addEventListener("click", () => {
        selectors.forEach((selector) => {
            selector.classList.remove("active-selector")
        })
        selector.classList.add("active-selector")
        cards.forEach((card) => {
            card.style.opacity = "0"
            setTimeout(() => {
                card.classList.remove("shown")
            }, 350); 
        })
        setTimeout(() => {
            cards[index].classList.add("shown")
            setTimeout(() => {
                cards[index].style.opacity = "1"
            }, 30)
        }, 350)
    })
})

cards.forEach((card) => {
    card.addEventListener("click", () => {
        let cells = ["game", "voucher", "pulsa", "eWallet"]
        let index = 0
        selectors.forEach((selector, idx) => {
            if (selector.classList.contains("active-selector")){
                index = idx
            }
        })
        window.location.href = `items.html?type=${cells[index]}`
    })
})

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
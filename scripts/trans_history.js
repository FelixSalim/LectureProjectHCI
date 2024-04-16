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
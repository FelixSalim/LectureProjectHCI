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
                card.classList.add("hidden")
            }, 350); 
        })
        setTimeout(() => {
            cards[index].classList.remove("hidden")
            cards[index].classList.add("shown")
            setTimeout(() => {
                cards[index].style.opacity = "1"
            }, 30)
        }, 350);  
    })
})

const desc = document.querySelector(".desc")

window.addEventListener("scroll", () => {
    let rect = desc.getBoundingClientRect()
    if (rect.top >= 0 && rect.top + 30 <= (window.innerHeight || document.documentElement.clientHeight)) {
        let n = getComputedStyle(desc).getPropertyValue("--n")
        if (n <= 30) {
            setInterval(() => {
                n++
                desc.style.setProperty("--n", n);
            }, 100)
        }    
    }
})
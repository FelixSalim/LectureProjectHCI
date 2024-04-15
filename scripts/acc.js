let accounts = {
    fullNames : [],
    userNames : [],
    passwords : [],
    phones : [],
    emails : [],
    trans : [],
}

var activeUser = -1

function pushAcc(fullName, userName, pw, phone, email) {
    accounts.fullNames.push(fullName)
    accounts.userNames.push(userName)
    accounts.passwords.push(pw)
    accounts.phones.push(phone)
    accounts.emails.push(email)
    accounts.trans.push([])
}

function storeLocalStorage() {
    localStorage.setItem("acc", JSON.stringify(accounts))
}

function loadLocalStorage() {
    accounts = JSON.parse(localStorage.getItem("acc"))
}

function storeCurrentUser() {
    localStorage.setItem("cur", JSON.stringify(activeUser))
}

function loadCurrentUser() {
    activeUser = JSON.parse(localStorage.getItem("cur"))
    if (activeUser == null) {
        activeUser = -1
    }
}
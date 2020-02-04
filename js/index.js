let currPage = 1

/*** DOM Elements ***/
const monsterContainer = document.querySelector("#monster-container")
const formContainer = document.querySelector("#create-monster")
const backBtn = document.querySelector("#back")
const fwdBtn = document.querySelector("#forward")

/*** Fetches ***/
// initial fetch: get monsters data
function initialFetch() {
    return fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then(r => r.json())
    .then(data => {
        renderMonsters(data)
    })
}

// another fetch for back/fwd btns
function fetchNewPage(currPage) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currPage}`)
    .then(r => r.json())
    .then(data => {
        renderMonsters(data)
    })
}

initialFetch()

/*** Helper Functions: monster creator ***/
function renderMonsters(data) {
    monsterContainer.innerHTML = ""
    data.forEach(monster => renderOneMonster(monster))
}

function renderOneMonster(monster) {
    // create element tags for name, age, description
    const monsterName = document.createElement("h2")
    const monsterAge = document.createElement("h4")
    const monsterDesc = document.createElement("p")
    // slap monster info on the DOM
    monsterName.innerText = monster.name
    monsterAge.innerText = monster.age
    monsterDesc.innerText = monster.description
    
    // create a wrapper to store monster info
    const monsterDiv = document.createElement("div")
    monsterDiv.append(monsterName, monsterAge, monsterDesc)
    // append the div to monster-container
    monsterContainer.append(monsterDiv)
}

/*** Form creator ***/
// create tags for form
const formTag = document.createElement("form")
const labelNameTag = document.createElement("label")
const labelAgeTag = document.createElement("label")
const labelDesTag = document.createElement("label")
const inputNameTag = document.createElement("input")
const inputAgeTag = document.createElement("input")
const textAreaTag = document.createElement("textarea")
const submitBtn = document.createElement("input")

// set form attributes
formTag.setAttribute("class", "monster-form")
labelNameTag.textContent = "Name"
labelAgeTag.textContent = "Age"
labelDesTag.textContent = "Description"
inputNameTag.setAttribute("id", "monster-name")
inputAgeTag.setAttribute("id", "monster-age")
textAreaTag.setAttribute("id", "monster-description")
textAreaTag.setAttribute("row", "5")
textAreaTag.setAttribute("cols", "33")
submitBtn.setAttribute("type", "submit")
submitBtn.setAttribute("value", "create")

// append form tags to form container
formTag.append(labelNameTag, inputNameTag, labelAgeTag, inputAgeTag, labelDesTag, textAreaTag, submitBtn)
formContainer.appendChild(formTag)



/*** Event Listeners ***/
formTag.addEventListener("submit", handleFormSubmit)
backBtn.addEventListener("click", handleBack)
fwdBtn.addEventListener("click", handleFwd)

/*** Event Handlers ***/
function handleFormSubmit(e) {
    e.preventDefault()

    const newName = e.target["monster-name"].value
    const newAge = e.target["monster-age"].value
    const newDesc = e.target["monster-description"].value
    
    const formData = {
        "name": newName,
        "age": newAge,
        "description": newDesc
    }

    addNewMonster(formData)

    e.target.reset()
}

// add new monster data
function addNewMonster(formData) {
    
    // debugger
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/monsters", configObj)

}

function handleBack(e) {
    if (currPage >= 2) {
        currPage--
        fetchNewPage(currPage)
    }
}

function handleFwd(e) {
    currPage++
    fetchNewPage(currPage)
}

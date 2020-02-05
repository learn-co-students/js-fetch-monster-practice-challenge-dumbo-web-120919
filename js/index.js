getMonsters()
let currentPage = 1
/*<--------------- INITIAL RENDER ----------------->*/
function getMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`)
    .then(r => r.json())
    .then(monsters => renderMonsters(monsters))
}

/*<------------------ NEXT PAGE ------------------->*/
let backButton = document.querySelector('#back')
let nextButton = document.querySelector('#forward')
backButton.addEventListener('click', goBack)
nextButton.addEventListener('click', goForward)
function goBack(e){
    if(currentPage >= 2){
        currentPage --;
        nextPage(currentPage);
    }
}

function goForward(e){
    currentPage++;
    nextPage(currentPage);
}

function nextPage(newPage){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${newPage}`)
    .then(r => r.json())
    .then(monsters => renderMonsters(monsters))
}

/*<------------- DOM Elements(global) --------------->*/
let container = document.querySelector('#create-monster')
let form = document.querySelector('#monster-form')


function renderMonsters(monsters){
    
    let monstersList = document.getElementById('monster-container')
    monsters.forEach(monster => renderOneMonster(monster))

    function renderOneMonster(monster){
        let monsterLi = document.createElement('div')
        monsterLi.innerHTML = `
        <p> <h2> ${monster.name} </h2>
            <h4>Age: ${monster.age} </h4>
            <p>Bio: ${monster.description} </p>
        </p>
        `
        monstersList.append(monsterLi)
    }
}

form.addEventListener('submit', renderNewMonster)
function renderNewMonster(e) {
    e.preventDefault()
    let name = e.target["name"].value
    let age = e.target["age"].value
    let desc = e.target["description"].value
    const newMonster = {
        name: name,
        age: age,
        description: desc,
    }
    postNewMonster(newMonster)

    e.target.reset() //resets data in the form each time
}

function postNewMonster(newMonster){
    const config = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(newMonster)
    }

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`, config)
}
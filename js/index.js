// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
document.addEventListener("DOMContentLoaded",() => {
const pageUp = document.querySelector("#forward")
const pageDown = document.querySelector("#back")
let currentPage = 1 


fetch("http://localhost:3000/monsters?_limit=50&_page=1")
   .then(r => r.json())
    .then(monster => renderMonsters(monster))

// Adding Form
const createForm = document.createElement('form')
  createForm.innerHTML= `
  <form id="new-form">
  <input type="text" name="Name"/>
  <input type="number" name="Age"/>
  <input type="text" name="Description"/>
  <input type="submit" name="Create Monster"/>
  </form>
`;
// above is the form we're creating
const newMonsterArea = document.querySelector("#create-monster")
newMonsterArea.append(createForm)
createForm.addEventListener('submit', handleFormSubmit)
// above grabs the form area
function handleFormSubmit(e){
  e.preventDefault()
  const newMonsterName = e.target["Name"].value
  const newMonsterAge = e.target["Age"].value
  const newMonsterDesc = e.target["Description"].value
// shows what happens to the form
const newMonster = {
  name: newMonsterName,
  age: newMonsterAge,
  description: newMonsterDesc
}
// creates a variable that we can stringify
  fetch('http://localhost:3000/monsters', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"          
      },
    body: JSON.stringify(newMonster)
  })
    .then(r => r.json())
    .then(monster => {
      renderOneMonster(monster)
  })
}
// fetches the POST method and adds the newMonster to the Monster(s)


// Adding Monsters
function renderMonsters(monster){
  monster.forEach(renderOneMonster)
}

function renderOneMonster(monster){
  const monsterCont = document.querySelector("#monster-container")
  const monsterDiv = document.createElement('div')
    monsterDiv.innerText = `
    Name- ${monster.name}
    Age- ${monster.age}
    Bio- ${monster.description}
    `

  monsterCont.append(monsterDiv)
}

// when x happens (click button at bottom of page)
// fetch y
// slap z on el domino (clears the current page and loads up the next 50 monsters)

// function fowardButton(e){
//   let currentPage = currentPage ++
// }

// function backButton(e){
//   let currentPage = currentPage --
// }

// pageUp.addEventListener("click", fowardButton)
// pageDown.addEventListener("click", backButton)
})


















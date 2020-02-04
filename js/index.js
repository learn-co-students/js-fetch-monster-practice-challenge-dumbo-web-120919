document.addEventListener("DOMContentLoaded", () =>{
    let currentPage = 1
    
    printMonsters(50, currentPage)
    //load next page of monsters
    document.querySelector("#forward").addEventListener("click", () => {
        currentPage++
        printMonsters(50, currentPage)
    })
    //go to previous page of monsters if not on the first page
    document.querySelector("#back").addEventListener("click", () => {
        if(currentPage > 1){
            currentPage--
            printMonsters(50, currentPage)
        }
    })
    //add event listener for submit form
    document.querySelector('#submit-form').addEventListener("submit", (event) =>{
        submitAction(event)
    })



})

//handle creation of new monster
function submitAction(event){
    event.preventDefault()
    // debugger
    console.log('curly boilas')
    fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({ name: event.target.querySelector("#name").value, age: event.target.querySelector("#age").value, description: event.target.querySelector("#description").value })
    })
    .then(r => r.json())
    .then(json => console.log(json))
}

//given a # of monsters and page number print monsters onto the dom
function printMonsters(limit, page){
    let monsters;
    document.querySelector("#monster-container").innerHTML = ""
    getMonsters(limit, page)
    .then (jsonData => {
        monsters =  jsonData;
        monsters.forEach((monster) => {
        const newLi = document.createElement('li')
        newLi.innerHTML = `
            <span class = "name"><strong>Name:</strong> ${monster.name}</span><br/>
            <span class = "age"><strong>Age:</strong> ${monster.age}</span><br/>
            <span class = "description"><strong>Description:</strong> ${monster.description}</span><br/><hr>
        `
        document.querySelector("#monster-container").append(newLi)
    })
    })

    
}

function getMonsters(limit = "blank", page = "blank"){
    return fetch(limit === "blank" ? 'http://localhost:3000/monsters' : `http://localhost:3000/monsters?_limit=${limit}${page === "blank" ? `` : `&_page=${page}`}`)
    .then (r => r.json())
}
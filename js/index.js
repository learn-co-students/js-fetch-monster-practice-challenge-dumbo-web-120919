document.addEventListener('DOMContentLoaded', () => {
// START OF CODE

    /*** DOM ELEMENTS ***/
  const monsterContainer = document.getElementById("monster-container");
  const monsterForm = document.getElementById("create-monster-form");
  const backButton = document.getElementById("back");
  const forwardButton = document.getElementById("forward");

// global variable that allows the page turning functions to know what page we're currently on
  let currentPage = 1;

    /*** EVENT LISTENERS ***/
  monsterForm.addEventListener("submit", handleCreateMonster);
  backButton.addEventListener("click", handleBackButtonNavigation);
  forwardButton.addEventListener("click", handleForwardButtonNavigation);

    /*** EVENT HANDLERS ***/
  function handleCreateMonster(event) {
    let monsterName = event.target["name"].value;
    let monsterAge = event.target["age"].value;
    let monsterBio = event.target["bio"].value;
    const newMonster = {
      name: monsterName,
      age: monsterAge,
      description: monsterBio
    };
    postNewMonster(newMonster);
  };

  function handleBackButtonNavigation(event) { 
    if (currentPage >= 2 ) {
      currentPage--;
      fetchNewMonsterPage(currentPage);
    }
  };
  function handleForwardButtonNavigation(event) { 
    currentPage++;
    fetchNewMonsterPage(currentPage);
  };

    /*** FETCHES ***/
  // fetch 50 monsters for initial load
  const initialMonsterFetch = function() {
    return fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
    .then( response => response.json() )
    .then( monsters => renderMonsters(monsters) );
  };

  // fetch a new page of monsters
  const fetchNewMonsterPage = function(wantedPage) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${wantedPage}`)
    .then( response => response.json() )
    .then( monsters => renderMonsters(monsters) )
  };

  // POST new monster to database when form is submitted
  const postNewMonster = function(newMonster) {
    fetch('http://localhost:3000/monsters', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newMonster)
    })
  };

    /*** RENDER FUNCTIONS ***/
  //functions to render monsters to body
  function renderOneMonster(monster) {
    let monsterDiv = document.createElement("div");
    let monsterName = document.createElement("h2");
    monsterName.textContent = monster.name;
    let monsterAge = document.createElement("h4");
    monsterAge.textContent = monster.age;
    let monsterBio = document.createElement("p");
    monsterBio.textContent = monster.description;

    monsterDiv.append(monsterName);
    monsterDiv.append(monsterAge);
    monsterDiv.append(monsterBio);
    monsterContainer.append(monsterDiv);
  };
  function renderMonsters(monsters) {
    clearChildren(monsterContainer);
    monsters.forEach( monster => renderOneMonster(monster) );
  };

    /*** MISC. FUNCTIONS ***/
  function clearChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

    /*** RUNNER FUNCTIONS ***/
  initialMonsterFetch();

// END OF CODE
})
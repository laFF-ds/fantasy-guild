// Fetching data from the DND api and filling the Spellbook & Monsterbook
spells = ["dancing-lights",	"produce-flame","message","mending","fire-bolt","alarm","find-familiar","shield","spider-climb","web","purify-food-and-drink","pass-without-trace"]

monsters = ["brown-bear","boar","blink-dog","clay-golem","hill-giant","centaur","goblin","hobgoblin","giant-eagle","giant-shark","giant-elk","dire-wolf","elk","gnoll","hyena","ogre","merrow"]

// Fill Spellbook
function fetchedSpells()
{  
  spellData = []
  for(i=0; i<spells.length; i++)
  {
      fetch(`https://www.dnd5eapi.co/api/spells/${spells[i]}`, 
      {
          method: 'GET'
      })
      .then(res => 
      {
        console.log(res.ok)
        return res.json()
      })
      .then((data) => 
      {
        if(data.material === undefined)
        {
          spellData.push(`<p>${data.name}</p><p>${data.desc}</p><p>Material Components: None</p>`)
          return spellData
        }
        else{
          spellData.push(`<p>${data.name}</p><p>${data.desc}</p><p>Material Components: ${data.material}</p>`)
          return spellData
        }
        
      })
      .catch((err) => console.log(err))
  }
  setTimeout(function()
  {
    spellData.sort()
    DisplaySpells(spellData, spellRows, currentSpellPage)
    SetupSpellPagination(spellData, spellPaginationElement, spellRows)
  }, 1000)
}

// SPELL PAGINATION
let currentSpellPage = 1
let spellRows = 1

function DisplaySpells(items, rowsPerPage, page)
{
  page--

  let itemElement = document.querySelector("#spellbook-page")
  itemElement.removeChild(itemElement.firstChild)
  let start = rowsPerPage * page
  let end = start + rowsPerPage
  let paginatedItems = items.slice(start, end)

  for(let i = 0; i < paginatedItems.length; i++)
  {
    itemElement.insertAdjacentHTML("afterbegin", `<div>${paginatedItems[i]}</div>`)
  }
}

// SPELL PAGINATION BUTTONS
const spellPaginationElement = document.getElementById("spell-page-numbers")

function SetupSpellPagination(items, wrapper, rowsPerPage)
{
  let pageCount = Math.ceil(items.length / rowsPerPage)
  for(i = 1; i < pageCount + 1; i++)
  {
    let btn = SpellPaginationButton(i, items)
    wrapper.appendChild(btn)
  }
}

function SpellPaginationButton(page, items)
{
  let button = document.createElement("button")
  button.innerText = page

  if(currentSpellPage == page) button.classList.add("active")

  button.addEventListener("click", function()
  {
    currentSpellPage = page
    DisplaySpells(items, spellRows, currentSpellPage)

    let current_btn = document.querySelector(".page-numbers button.active")
    current_btn.classList.remove("active")
    button.classList.add("active")
  })

  return button
}

// Fill Monsterbook
function fetchedMonsters()
{  
  monsterData = []
  for(i=0; i<monsters.length; i++)
  {
      fetch(`https://www.dnd5eapi.co/api/monsters/${monsters[i]}`, 
      {
          method: 'GET'
      })
      .then(res => 
      {
        return res.json()
      })
      .then((data) => 
      {
        async function collectMonsterData()
        {
          // array to hold an individual monsters data. array resets each loop
          arr = []
          arr.push(`<p>${data.name}</p>`)
          arr.push(`<p>${data.size}</p>`)
          for await (element of data.actions)
          {
            arr.push(`<p>${element.name}</p>`)
            arr.push(`<p>${element.desc}</p>`)
          }
          for await (element of data.special_abilities)
          {
            arr.push(`<p>${element.name}</p>`)
            arr.push(`<p>${element.desc}</p>`)
          }
          monsterData.push(arr)
        }
        collectMonsterData()
      })
  }
  setTimeout(function()
  {
    monsterData.sort()
    DisplayMonsters(monsterData, monsterRows, currentMonsterPage)
    SetupMonsterPagination(monsterData, monsterPaginationElement, monsterRows)
  }, 1000)
}

// MONSTER PAGINATION
let currentMonsterPage = 1
let monsterRows = 1

function DisplayMonsters(items, rowsPerPage, page)
{
  page--
  
  let itemElement = document.querySelector("#monsterbook-page")
  itemElement.removeChild(itemElement.firstChild)
  let start = rowsPerPage * page
  let end = start + rowsPerPage
  let paginatedItems = items.slice(start, end)
  console.log(items)
  
  for(let i = 0; i < paginatedItems.length; i++)
  {
    itemElement.insertAdjacentHTML("afterbegin", `<div>${paginatedItems[i].join("")}</div>`)
  }
}

// MONSTER PAGINATION BUTTONS
const monsterPaginationElement = document.getElementById("monster-page-numbers")

function SetupMonsterPagination(items, wrapper, rowsPerPage)
{
  let pageCount = Math.ceil(items.length / rowsPerPage)
  for(i = 1; i < pageCount + 1; i++)
  {
    let btn = MonsterPaginationButton(i, items)
    wrapper.appendChild(btn)
  }
}

function MonsterPaginationButton(page, items)
{
  let button = document.createElement("button")
  button.innerText = page

  if(currentMonsterPage == page) button.classList.add("active")

  button.addEventListener("click", function()
  {
    currentMonsterPage = page
    DisplayMonsters(items, monsterRows, currentMonsterPage)

    let current_btn = document.querySelector(".page-numbers button.active")
    current_btn.classList.remove("active")
    button.classList.add("active")
  })

  return button
}

promises = [fetchedSpells(), fetchedMonsters()]
Promise.all(promises)
.then(() => console.log("DND data has been fetched o7"))
.catch((err) => console.log(err))

// Spellbook & Monsterbook Modals
const spellbook = document.querySelector("#spellbook-modal")
const openSpellbook = document.querySelector(".open-spellbook")
const closeSpellbook = document.querySelector(".close-spellbook")

openSpellbook.addEventListener("click", () => 
{
  spellbook.showModal()
})

closeSpellbook.addEventListener("click", () => 
{
  spellbook.close()
})

const monsterbook = document.querySelector("#monsterbook-modal");
const openMonsterbook = document.querySelector(".open-monsterbook");
const closeMonsterbook = document.querySelector(".close-monsterbook");

openMonsterbook.addEventListener("click", () => 
{
  monsterbook.showModal()
})

closeMonsterbook.addEventListener("click", () => 
{
  monsterbook.close()
})

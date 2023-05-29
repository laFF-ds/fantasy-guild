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
        // console.log(data);
        // spellData.push(data.material)
        // test.sort()
        if(data.material === undefined)
        {
          spellData.push(data.name + "<br />" + data.desc + "<br />" + "Material Components: None Required")
          return "No material required"
        }
        else{
          spellData.push(data.name + "<br />" + data.desc + "<br />" + "Material Components: " + data.material)
          return spellData
        }
        
      })
      .catch((err) => console.log(err))
  }
  setTimeout(function()
  {
    spellData.sort()
    spellData.reverse()
    let items = document.querySelector("#spellbook-page")
    // console.log(test.length + " spells")
    // console.log(test)
    for(i=0; i<spellData.length; i++)
    {
      items.insertAdjacentHTML("afterbegin", `<p>${spellData[i]}</p>`)
    }
  }, 1000) // 2 seconds timeout
}

// Fill Monsterbook
/*
name
size
special_abilities[n][name]
special_abilities[n][desc]
actions[n][name]
actions[n][desc]
*/
function fetchedMonsters()
{  
  monsterData = [[]]
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
          // console.log(data.name)
          // console.log(data.size)
          arr.push(data.name+"<br />")
          arr.push(data.size+"<br />")
          for await (element of data.actions)
          {
            arr.push(element.name+"<br />")
            // console.log(element.name)
          }
          for await (element of data.special_abilities)
          {
            arr.push(element.name+"<br />")
            // console.log(element.name)
          }
          // hand off array of individual monster data before reset
          monsterData.push(arr)
          console.log(arr)
        }
        collectMonsterData()
        // return monsterData
      })
  }
  setTimeout(function()
  {
    // console.log("hello " + monsterData.at(-1))
    monsterData.sort()
    monsterData.reverse()
    let items = document.querySelector("#monsterbook-page")
    for(i=0; i<monsterData.length; i++)
    {
      items.insertAdjacentHTML("afterbegin", `<p>${monsterData[i].join("")}</p>`)
    }
  }, 1000) // 1 second timeout
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

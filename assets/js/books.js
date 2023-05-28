// Fetching data from the DND api and filling the Spellbook & Monsterbook
spells = ["dancing-lights",	"produce-flame","message","mending","fire-bolt","alarm","find-familiar","shield","spider-climb","web","purify-food-and-drink","pass-without-trace"]

monsters = ["brown-bear","boar","blink-dog","clay-golem","hill-giant","centaur","goblin","hobgoblin","giant-eagle","giant-shark","giant-elk","dire-wolf","elk","gnoll","hyena","ogre","merrow"]

// Fill Spellbook
function fetchedSpells()
{  
  spellName = []
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
        // spellName.push(data.material)
        // test.sort()
        if(data.material === undefined)
        {
          spellName.push(data.name + "<br />" + data.desc + "<br />" + "Material Components: None Required")
          return "No material required"
        }
        else{
          spellName.push(data.name + "<br />" + data.desc + "<br />" + "Material Components: " + data.material)
          return spellName
        }
        
      })
      .catch((err) => console.log(err))
  }
  setTimeout(function()
  {
    spellName.sort()
    spellName.reverse()
    let items = document.querySelector("#spellbook-page")
    // console.log(test.length + " spells")
    // console.log(test)
    for(i=0; i<spellName.length; i++)
    {
      items.insertAdjacentHTML("afterbegin", `<p>${spellName[i]}</p>`)
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
  monsterName = []
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
        // numOfActions = data.actions.length
        // numOfAbilities = data.special_abilities.length
        async function go()
        {
          // console.log(data.name)
          // console.log(data.size)
          monsterName.push(data.name)
          monsterName.push(data.size)
          for await (element of data.actions)
          {
            monsterName.push(element.name)
            // console.log(element.name)
          }
          for await (element of data.special_abilities)
          {
            monsterName.push(element.name)
            // console.log(element.name)
          }             
        }
        go()
        // monsterName.push("<br />hello<br />")
        // test.sort()
        // return monsterName
      })
  }
  setTimeout(function()
  {
    // monsterName.sort()
    monsterName.reverse()
    let items = document.querySelector("#monsterbook-page")
    for(i=0; i<monsterName.length; i++)
    {
      items.insertAdjacentHTML("afterbegin", `<p>${monsterName[i]}</p>`)
    }
  }, 1000) // 2 seconds timeout
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

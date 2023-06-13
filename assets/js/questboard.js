fetch("quests.json", 
{
    method: 'GET',
    headers: 
    {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}).then(res => 
    {
        return res.json()
    }).then((data) => {
        
        console.log(data);
        for (i=0; i<data.length; i++)
          {
            let elem = document.createElement("quest-item")
            elem.setAttribute("id","quest-details")
            document.getElementById("quest-board").appendChild(elem)
            console.log(i)
          }

        let items = document.querySelectorAll("#quest-details")

        for (i=0; i<data.length; i++)
          {
            let name = data[i].name
            let description = data[i].description
            let reward = data[i].reward
            items[i].insertAdjacentHTML("afterbegin",`<p>${name}</p><p>${description}</p><p>${reward}</p>`);
            console.log(i)
          }
    })
    
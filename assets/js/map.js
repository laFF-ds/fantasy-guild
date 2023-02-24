// Draw map
let map = L.map('map',{maxBoundsViscosity: 1.0}).setView([0, 0], 0);
    // [SW]   [NE]
    map.setMaxBounds([[-60.435381, -126.210938], [60.348484, 126.210938]]);
    L.tileLayer('map/{z}/{x}/{y}.png', 
    {
      continuousWorld: false,
      noWrap: true,  
      minZoom: 3,
      maxZoom: 3
    }).addTo(map);

// Place location markers
fetch("map.json", 
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
    }).then((data) => 
        {
          for (i=0; i<data.length; i++)
          {
            let row = data[i];
            console.log(data[i].name)
            let marker = L.marker([row.X, row.Y], 
                {
                    opacity: 1
                }).bindPopup(row.name);
            marker.addTo(map);
          }
        })
document.getElementById("#map").innerHTML = map;

const games =
[
{title: "Noita",playtime_recent: 13,playtime_all:56,img_src:"noita.png"},
{title: "The Binding Of Isaac: Rebirth",playtime_recent: 3,playtime_all:190,img_src:"isaac.png"},
{title: "Mewgenics",playtime_recent: 24,playtime_all:27,img_src:"mew.png"},

];
let filterid=2;
let ascending=true
const filters=["title","playtime_recent","playtime_all"]
let gamediv;
document.addEventListener("DOMContentLoaded",()=> {
gamediv = document.getElementById("games");   
Filter(filters,ascending)
DisplayGames()   
})

function Filter(list,ascend){


    for(let i = 0;i<games.length-1;i++){
        for(let j = 0;j<games.length-1;j++){
            if(ascend===true){
                if(games[j][list[filterid]]>games[j+1][list[filterid]]){
                [games[j],games[j+1]] = [games[j+1],games[j]]
            } 
            }else if(ascend===false){
                if(games[j][list[filterid]]<games[j+1][list[filterid]]){
                [games[j],games[j+1]] = [games[j+1],games[j]]
            }                 
            }
        }
    }
    DisplayGames();
}
function CleanDiv(){
    while(gamediv.firstChild){
        gamediv.removeChild(gamediv.firstChild)
    }
}

function DisplayGames(){

CleanDiv()

let nrofgames = document.createElement("div");
nrofgames.className = "nrofgames"
let btn1 = document.createElement("button")
btn1.textContent=`filter by: ${filters[filterid]}`
let nrp = document.createElement("p")
nrp.textContent = `this user owns ${games.length} games`
let btn2 = document.createElement("button")
if(ascending){
    btn2.textContent="Ascending"
} else {
    btn2.textContent="Descending"
}
btn1.onclick = () =>{
    filterid= (filterid+1)%3
    Filter(filters,ascending)
}

btn2.onclick = () => {
    ascending = !ascending;

    Filter(filters,ascending)
}

let divbtn=document.createElement("div")
divbtn.appendChild(btn1)
divbtn.appendChild(btn2)
nrofgames.append(divbtn)
nrofgames.appendChild(nrp)

gamediv.appendChild(nrofgames)
games.forEach(game => {
    let gradiv = document.createElement("div");
    gradiv.className="gra";
    let graheader = document.createElement("div");
    graheader.className="gra-header"
    let image = document.createElement("img");
    image.src =game.img_src;
    image.className="gamemin"
    let text5 = document.createElement("h5")
    text5.textContent = game.title
    let link = document.createElement("a")
    link.className="nwm"
    link.href="#"
    link.textContent="See Details"
    let playtime = document.createElement("p")
    playtime.className="playtime"
    playtime.textContent =`Last to weeks: ${game.playtime_recent}h \nAll time: ${game.playtime_all}h`
    playtime.setAttribute('style','white-space: pre')
    text5.appendChild(link)
    
    graheader.appendChild(image)
    graheader.appendChild(text5)
    gradiv.appendChild(graheader)
    gradiv.appendChild(playtime)
    gamediv.appendChild(gradiv);
});
}
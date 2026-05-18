
let games2=[];
let playerdata=[];
async function getGameData() {
    const response = await fetch("./a.json");//https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=8CBCBCA99725FD3101494787D8319310&steamid=76561198821125519&format=json&include_appinfo=1

    return await response.json();
}
async function getUserData() {
    const response = await fetch("./b.json");//https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=8CBCBCA99725FD3101494787D8319310&steamids=76561198821125519&format=json
    return await response.json();
}

let filterid=2;
let ascending=true
const filters=["name","playtime_2weeks","playtime_forever"]
let gamediv;
document.addEventListener("DOMContentLoaded", async ()=> {
games2 = await getGameData();
playerdata = await getUserData();
 

GenerateHtml()
gamediv = document.getElementById("games");
Filter(filters,ascending)  
DisplayGames()   
})

function GenerateHtml(){
    let section = document.createElement("section")
    section.id = "main"
    let divv = document.createElement("div")
    divv.className = "ioknow"
    let imagi = document.createElement("img")
    imagi.src = playerdata.response.players[0].avatarfull
    imagi.className = "profilepic"
    let h3 = document.createElement("h3")
    h3.textContent = playerdata.response.players[0].personaname

    divv.appendChild(imagi)
    divv.appendChild(h3)
    section.appendChild(divv)
    let gamesDiv = document.createElement("div");
    gamesDiv.id = "games";
    section.appendChild(gamesDiv);
    document.body.appendChild(section)
    

}

function Filter(list,ascend){


    for(let i = 0;i<games2.response.games.length-1;i++){
        for(let j = 0;j<games2.response.games.length-1;j++){
            if(ascend===true){
                if((games2.response.games[j][list[filterid]] || 0) >(games2.response.games[j+1][list[filterid]] || 0)){
                [games2.response.games[j],games2.response.games[j+1]] = [games2.response.games[j+1],games2.response.games[j]]
            } 
            }else if(ascend===false){
                if((games2.response.games[j][list[filterid]] || 0) <(games2.response.games[j+1][list[filterid]] || 0)){
                [games2.response.games[j],games2.response.games[j+1]] = [games2.response.games[j+1],games2.response.games[j]]
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
nrp.textContent = `this user owns ${games2.response.game_count} games`
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
let gamescont = document.createElement("div");
gamescont.className="gamescont"
games2.response.games.forEach(game => {
    let gradiv = document.createElement("div");
    gradiv.className="gra";
    let graheader = document.createElement("div");
    graheader.className="gra-header"
    let image = document.createElement("img");
    let imgsrc = `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;

    image.src =imgsrc;
    image.className="gamemin"
    let text5 = document.createElement("h5")
    text5.textContent = game.name
    let link = document.createElement("a")
    link.className="nwm"
    link.href="#"
    link.textContent="See Details"
    let playtime = document.createElement("p")
    playtime.className="playtime"
    playtime.textContent =`Last to weeks: ${((game.playtime_2weeks || 0)/60).toFixed(2)}h \nAll time: ${(game.playtime_forever/60).toFixed(2)}h`
    playtime.setAttribute('style','white-space: pre')
    text5.appendChild(link)
    
    graheader.appendChild(image)
    graheader.appendChild(text5)
    gradiv.appendChild(graheader)
    gradiv.appendChild(playtime)
    gamescont.appendChild(gradiv);
});
gamediv.appendChild(gamescont);
}
let achievm=[];
let achievinf=[];
const params = new URLSearchParams(window.location.search);
const steamid = params.get("steamid");
const appid = params.get("appid");
const gameName = document.createElement("p");
let gameId="553850";
let gameNames
async function getAchievments(){//just achievments, not for specific user
    try{
    const response= await fetch(`http://localhost:3000/achievment/${appid}`)//https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=4E05509263A433352E2117FB636D74AA&appid=${gameId}
    if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Nie udało się pobrać danych:", error);
        return null;
    }
}
async function getAchievmentInfo(){//whether is unlocked or not
    try{
            const response= await fetch(`http://localhost:3000/unlocked/${steamid}/${appid}`)//https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${gameId}&key=4E05509263A433352E2117FB636D74AA&steamid=76561198197267374&format=json&include_appinfo=1
            if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Nie udało się pobrać danych:", error);
        return null;
    }
}
document.addEventListener("DOMContentLoaded", async ()=>{
    achievm = await getAchievments();
    achievinf= await getAchievmentInfo();
    console.log(achievinf.playerstats.gameName)
    gameNames = achievinf.playerstats.gameName;
    gameName.textContent = gameNames;
})

const main = document.createElement("section");
main.id = "main";
document.body.appendChild(main);
const imageSection = document.createElement("section");
imageSection.id = "image";
main.appendChild(imageSection);
const link = document.createElement("a");
link.href = `../Projek/index.html?steamid=${steamid}`;
imageSection.appendChild(link);
const gameIMG = document.createElement("img");
gameIMG.id = "gameIMG";
gameIMG.src = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`;// Tu zmiana żeby nie było stałę
gameIMG.alt = "No Image here";
link.appendChild(gameIMG);
const bg = document.createElement("img");
bg.id = "gamebgrd";
bg.src = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/library_hero.jpg`;// Tu zmiana żeby nie było stałę, chyba musze tez fetchowac to co tomek 
bg.alt = "No Image here";
imageSection.appendChild(bg);

gameName.id = "gameName";
gameName.textContent = `${gameNames}`;
imageSection.appendChild(gameName);

const progressText = document.createElement("p");
progressText.id = "progressText";
progressText.textContent = "0%"; // wartość startowa
const progressBarContainer = document.createElement("div");
progressBarContainer.id = "progressContainer";
const progresBar = document.createElement("div");
progresBar.id = "progressBar"
progressBarContainer.appendChild(progresBar);
imageSection.appendChild(progressText);
imageSection.appendChild(progressBarContainer);

const controls = document.createElement("div");
controls.id = "controls";
main.appendChild(controls);
const allBtn = document.createElement("button");
allBtn.textContent = "All";
allBtn.addEventListener("click", () => {
    filterAchiev("all");
});
controls.appendChild(allBtn);
const unlockedBtn = document.createElement("button");
unlockedBtn.textContent = "Unlocked";
unlockedBtn.addEventListener("click", () => {
    filterAchiev("unlocked");
});
controls.appendChild(unlockedBtn);
const lockedBtn = document.createElement("button");
lockedBtn.textContent = "Locked";
lockedBtn.addEventListener("click", () => {
    filterAchiev("locked");
});
controls.appendChild(lockedBtn);
const label = document.createElement("label");
controls.appendChild(label);
const miniToggle = document.createElement("input");
miniToggle.type = "checkbox";
miniToggle.id = "minimalistToggle";
miniToggle.addEventListener("change", toggleMinimalist);
label.appendChild(miniToggle);
label.append(" Minimalist Mode");
const container = document.createElement("section");
container.id = "achievContainer";
main.appendChild(container);
const footer = document.createElement("footer");
const footerText = document.createElement("p");
footerText.textContent = "twórcy: My";
footer.appendChild(footerText);
document.body.appendChild(footer);

let combinedAchievements = [];

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const schemaData = await getAchievments();   // dane z b.json
        const playerData = await getAchievmentInfo(); // dane z a.json

        const schemaList = schemaData.game.availableGameStats.achievements;
        const playerList = playerData.playerstats.achievements;

        combinedAchievements = playerList.map(pAchiev => {
            const matchingSchema = schemaList.find(sAchiev => sAchiev.name === pAchiev.apiname);
            
            const isUnlocked = pAchiev.achieved === 1;

            return {
                name: matchingSchema ? matchingSchema.displayName : pAchiev.apiname,
                desc: matchingSchema ? matchingSchema.description : "No description available",
                unlocked: isUnlocked,
                img: matchingSchema ? (isUnlocked ? matchingSchema.icon : matchingSchema.icongray) : ""
            };
        });
        updateProgressBar();

        render();

    } catch (error) {
        console.error("Błąd podczas pobierania lub przetwarzania danych:", error);
    }
});

function render(filter = "all") {
    container.innerHTML = "";
    
    if (combinedAchievements.length === 0) {
        container.textContent = "Ładowanie osiągnięć...";
        return;
    }

    combinedAchievements.forEach(a => {
        if (filter === "unlocked" && !a.unlocked) return;
        if (filter === "locked" && a.unlocked) return;

        const div = document.createElement("div");
        div.className = `achievWhole ${a.unlocked ? "unlocked" : "locked"}`;

        if (miniToggle.checked) {
            div.classList.add("minimalist");
            const name = document.createElement("p");
            name.className = "achievName";
            name.textContent = a.name;
            div.appendChild(name);
        } else {
            const img = document.createElement("img");
            img.className = "achieva";
            img.src = a.img;
            img.alt = "icon";

            const desc = document.createElement("div");
            desc.className = "achievDesc";

            const name = document.createElement("p");
            name.className = "achievName";
            name.textContent = a.name;

            const text = document.createElement("p");
            text.className = "achievDesci";
            text.textContent = a.desc;

            desc.appendChild(name);
            desc.appendChild(text);
            div.appendChild(img);
            div.appendChild(desc);
        }

        container.appendChild(div);
    });
}
function updateProgressBar() {
    const total = combinedAchievements.length;
    if (total === 0) return;

    const unlockedCount = combinedAchievements.filter(a => a.unlocked === true).length;
    const percentage = Math.round((unlockedCount / total) * 100);

    const textElement = document.getElementById("progressText");
    if (textElement) {
        textElement.textContent = `Postęp: ${percentage}% (${unlockedCount}/${total})`;
    }

    if (progresBar) {
        progresBar.style.width = percentage + "%";
    }
}
function filterAchiev(type) {
    render(type);
}

function toggleMinimalist() {
    render();
}

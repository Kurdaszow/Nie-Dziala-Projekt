const params = new URLSearchParams(window.location.search);
const steamid = params.get("steamid");
const appid = params.get("appid");

document.addEventListener("DOMContentLoaded", () => {
    if (!steamid) {
        renderHome();
    }
    else if (steamid && !appid) {
        renderUser();
    }
    else if (steamid && appid) {
        renderGame();
    }
});
function renderHome(){
    const body = document.body;
    body.className="home";

    const menuDiv = document.createElement("div");
    menuDiv.className = "menu";

    const mainPageLink = document.createElement("a");
    mainPageLink.href = "strona";
    mainPageLink.textContent = "Strona główna";

    const themeButton = document.createElement("button");
    themeButton.id = "theme-toggle";
    themeButton.textContent = "Dark mode";
    menuDiv.appendChild(mainPageLink);
    menuDiv.appendChild(themeButton);

    const header = document.createElement("header");

    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    span.textContent = "Steam Stats";
    h3.appendChild(span);

    const description = document.createElement("p");
    description.textContent = "a website to check statistics for steam users and their games";

    const img = document.createElement("img");
    img.src = "steam.jpg";
    img.alt = "obraz steam";
    img.className = "picture";
    img.setAttribute("fetchpriority", "high");

    header.appendChild(h3);
    header.appendChild(description);
    header.appendChild(img);

    const main = document.createElement("main");

    const searchForm = document.createElement("form");
    searchForm.className = "search-form";
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "search";
    searchInput.placeholder = "Wpisz id użytkownika";
    searchInput.required = true;
    const searchButton = document.createElement("input");
    const errorr = document.createElement("p")
    searchButton.type = "submit";
    searchButton.value = "Szukaj";
    searchButton.className = "accept";
    const searchdiv = document.createElement("div")
    searchdiv.className="searchdiv"
    searchdiv.appendChild(searchInput);
    searchdiv.appendChild(searchButton);
    searchForm.appendChild(searchdiv)
    main.appendChild(searchForm);

    
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        const inputId = searchInput.value.trim();
        if(!inputId || isNaN(inputId)){
            errorr.textContent = "Wprowadz poprawne id";
            errorr.style.display="block"
            return;
        }
        try {
            const userResponse = await fetch(`http://localhost:3000/user/${inputId}`);
            const userData = await userResponse.json();   
            const player = userData.response.players[0];
            if(!player){
                errorr.textContent = "Nie znaleziono użytkownika";
                errorr.style.display="block"
            } else {
                window.location.href = `?steamid=${inputId}`;
            }
        } catch(error){
            errorr.textContent= "Błąd serwera"
            errorr.style.display="block"
        }
    });

    const copyDiv = document.createElement("div");
    copyDiv.className = "copy";
    const copyParagraph = document.createElement("p");
    copyParagraph.innerHTML = "&copy; COPYRIGHT 2026 Wszelkie prawa zastrzeżone<br>";
    copyDiv.appendChild(copyParagraph);
    
    body.appendChild(menuDiv);
    body.appendChild(header);
    body.appendChild(main);
    searchForm.appendChild(errorr);
    body.appendChild(copyDiv);
    setupThemeToggle(themeButton);
};

function setupThemeToggle(themeToggleElement) {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    const applyTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    if (themeToggleElement) {
        themeToggleElement.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}
let games2 = [];
let playerdata = [];
let filterid = 2;
let ascending = true;
const filters = ["name", "playtime_2weeks", "playtime_forever"];
let gamediv;

async function renderUser() {
    document.body.className="body_user";
    games2 = await getGameData();
    playerdata = await getUserData();

    if (!games2 || !playerdata) {
        document.body.textContent="Nie udało się pobrać danych użytkownika"
        let linkback = document.createElement("a")
        document.body.style.color="white"
        linkback.textContent = "Powrót do strony głównej"
        linkback.href=window.location.pathname
        document.body.appendChild(linkback)
        return;
    }

    GenerateHtml();
    gamediv = document.getElementById("games");
    Filter(filters, ascending);
}

async function getGameData() {
    try {
        const response = await fetch(`http://localhost:3000/games/${steamid}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Nie udało się pobrać danych gier:", error);
        return null;
    }
}

async function getUserData() {
    try {
        const response = await fetch(`http://localhost:3000/user/${steamid}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Nie udało się pobrać danych użytkownika:", error);
        return null;
    }
}

function GenerateHtml(){
    let section = document.createElement("section");
    section.id = "main_user";
    let divv = document.createElement("div");
    divv.className = "ioknow";
    let imagi = document.createElement("img");
    imagi.src = playerdata.response.players[0].avatarfull;
    imagi.className = "profilepic";
    let h3 = document.createElement("h3");
    let divh3a = document.createElement("div")
    divh3a.className="divh3a"
    h3.textContent = playerdata.response.players[0].personaname;
    let linki = document.createElement("a");
    linki.textContent="Strona glowna"
    linki.href = window.location.pathname;
    divv.appendChild(imagi);
    divh3a.appendChild(h3);
    divh3a.appendChild(linki);
    divv.append(divh3a)
    section.appendChild(divv);
    let gamesDiv = document.createElement("div");
    gamesDiv.id = "games";
    section.appendChild(gamesDiv);
    document.body.appendChild(section);
}

function Filter(list, ascend){
    const games = games2.response.games;
    const currentFilter = list[filterid];

    for(let i = 0; i < games.length - 1; i++){
        for(let j = 0; j < games.length - 1 - i; j++){
            const val1 = games[j][currentFilter] || 0;
            const val2 = games[j+1][currentFilter] || 0;
            
            let shouldSwap = ascend ? (val1 > val2) : (val1 < val2);
            if(shouldSwap){
                [games[j], games[j+1]] = [games[j+1], games[j]];
            }
        }
    }
    DisplayGames();
}

function CleanDiv(){
    if (gamediv) {
        while(gamediv.firstChild){
            gamediv.removeChild(gamediv.firstChild);
        }
    }
}

function DisplayGames(){
    CleanDiv();

    let nrofgames = document.createElement("div");
    nrofgames.className = "nrofgames";
    let btn1 = document.createElement("button");
    btn1.textContent = `filter by: ${filters[filterid]}`;
    let nrp = document.createElement("p");
    nrp.textContent = `this user owns ${games2.response.game_count} games`;
    
    let btn2 = document.createElement("button");
    btn2.textContent = ascending ? "Ascending" : "Descending";

    btn1.onclick = () => {
        filterid = (filterid + 1) % 3;
        Filter(filters, ascending);
    };

    btn2.onclick = () => {
        ascending = !ascending;
        Filter(filters, ascending);
    };

    let divbtn = document.createElement("div");
    divbtn.appendChild(btn1);
    divbtn.appendChild(btn2);
    nrofgames.append(divbtn);
    nrofgames.appendChild(nrp);

    gamediv.appendChild(nrofgames);
    
    let gamescont = document.createElement("div");
    gamescont.className = "gamescont";
    
    games2.response.games.forEach(game => {
        let gradiv = document.createElement("div");
        gradiv.className = "gra";
        let graheader = document.createElement("div");
        graheader.className = "gra-header";
        let image = document.createElement("img");
        let imgsrc = `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;

        image.src = imgsrc;
        image.className = "gamemin";
        let text5 = document.createElement("h5");
        text5.textContent = game.name;
        let link = document.createElement("a");
        link.className = "nwm";
        link.href = `?steamid=${steamid}&appid=${game.appid}`;
        link.textContent = "See Details";
        let playtime = document.createElement("p");
        playtime.className = "playtime";
        playtime.textContent = `Last to weeks: ${((game.playtime_2weeks || 0)/60).toFixed(2)}h \nAll time: ${(game.playtime_forever/60).toFixed(2)}h`;
        playtime.setAttribute('style', 'white-space: pre');
        text5.appendChild(link);
        
        graheader.appendChild(image);
        graheader.appendChild(text5);
        gradiv.appendChild(graheader);
        gradiv.appendChild(playtime);
        gamescont.appendChild(gradiv);
    });
    gamediv.appendChild(gamescont);
}
const gameName = document.createElement("p");
let combinedAchievements = [];
let container; 
let progressBar;
let miniToggle;
let currentActiveFilter = "all";

async function renderGame() {
    document.body.className="body_game";
    const achievinf = await getAchievmentInfo();
    const schemaData = await getAchievments();
    if (!achievinf || !schemaData) {
        document.body.textContent = "Nie udało się pobrać danych osiągnięć.";
        const linkback =document.createElement("a")
        linkback.textContent = "Powrót do strony głównej"
        linkback.href=window.location.pathname
        document.body.appendChild(linkback)
        return;
    }

    const gameNames = achievinf.playerstats.gameName || "Gra nie znaleziona";
    const main = document.createElement("section");
    main.id = "main_game";
    document.body.appendChild(main);
    
    const imageSection = document.createElement("section");
    imageSection.id = "image";
    main.appendChild(imageSection);
    
    const link = document.createElement("a");
    link.href = `?steamid=${steamid}`;
    imageSection.appendChild(link);
    
    const gameIMG = document.createElement("img");
    gameIMG.id = "gameIMG";
    gameIMG.src = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`;
    gameIMG.alt = "No Image here";
    link.appendChild(gameIMG);
    
    const bg = document.createElement("img");
    bg.id = "gamebgrd";
    bg.src = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/library_hero.jpg`;
    bg.alt = "No Image here";
    imageSection.appendChild(bg);

    gameName.id = "gameName";
    gameName.textContent = gameNames;
    imageSection.appendChild(gameName);

    const progressText = document.createElement("p");
    progressText.id = "progressText";
    progressText.textContent = "0%";
    
    const progressBarContainer = document.createElement("div");
    progressBarContainer.id = "progressContainer";
    progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    progressBarContainer.appendChild(progressBar);
    imageSection.appendChild(progressText);
    imageSection.appendChild(progressBarContainer);
    const controls = document.createElement("div");
    controls.id = "controls";
    main.appendChild(controls);
    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.addEventListener("click", () => filterAchiev("all"));
    controls.appendChild(allBtn);
    const unlockedBtn = document.createElement("button");
    unlockedBtn.textContent = "Unlocked";
    unlockedBtn.addEventListener("click", () => filterAchiev("unlocked"));
    controls.appendChild(unlockedBtn);
    const lockedBtn = document.createElement("button");
    lockedBtn.textContent = "Locked";
    lockedBtn.addEventListener("click", () => filterAchiev("locked"));
    controls.appendChild(lockedBtn);
    const label = document.createElement("label");
    controls.appendChild(label);
    miniToggle = document.createElement("input");
    miniToggle.type = "checkbox";
    miniToggle.id = "minimalistToggle";
    miniToggle.addEventListener("change", toggleMinimalist);
    label.appendChild(miniToggle);
    label.append(" Minimalist Mode");
    container = document.createElement("section");
    container.id = "achievContainer";
    main.appendChild(container);
    const footer = document.createElement("footer");
    const footerText = document.createElement("p");
    footerText.textContent = "twórcy: My";
    footer.appendChild(footerText);
    document.body.appendChild(footer);
    try {
        const schemaList = schemaData.game.availableGameStats.achievements || [];
        const playerList = achievinf.playerstats.achievements || [];

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
        renderAchievements(currentActiveFilter);

    } catch (error) {
        console.error("Błąd podczas przetwarzania danych osiągnięć:", error);
    }
}

async function getAchievments(){
    try {
        const response = await fetch(`http://localhost:3000/achievment/${appid}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Nie udało się pobrać schematu osiągnięć:", error);
        return null;
    }
}

async function getAchievmentInfo(){
    try {
        const response = await fetch(`http://localhost:3000/unlocked/${steamid}/${appid}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Nie udało się pobrać stanu odblokowań:", error);
        return null;
    }
}

function renderAchievements(filter = "all") {
    if (!container) return;
    container.innerHTML = "";
    
    if (combinedAchievements.length === 0) {
        container.textContent = "Brak osiągnięć do wyświetlenia.";
        return;
    }

    combinedAchievements.forEach(a => {
        if (filter === "unlocked" && !a.unlocked) return;
        if (filter === "locked" && a.unlocked) return;

        const div = document.createElement("div");
        div.className = `achievWhole ${a.unlocked ? "unlocked" : "locked"}`;

        if (miniToggle && miniToggle.checked) {
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

    if (progressBar) {
        progressBar.style.width = percentage + "%";
    }
}

function filterAchiev(type) {
    currentActiveFilter = type;
    renderAchievements(type);
}

function toggleMinimalist() {
    renderAchievements(currentActiveFilter);
}
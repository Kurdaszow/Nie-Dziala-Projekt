document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const menuDiv = document.createElement("div");
    menuDiv.className = "menu";

    const mainPageLink = document.createElement("a");
    mainPageLink.href = "strona";
    mainPageLink.textContent = "Strona głowna";

    const themeButton = document.createElement("button");
    themeButton.id = "theme-toggle";
    themeButton.textContent = "Dark mode";
    menuDiv.appendChild(mainPageLink);
    menuDiv.appendChild(themeButton);

    const header = document.createElement("header");

    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    span.textContent = "TYTUŁ STRONY";
    h3.appendChild(span);

    const description = document.createElement("p");
    description.textContent = "Opis strony";

    const img = document.createElement("img");
    img.src = "steam.jpg";
    img.alt = "obraz steam";
    img.className = "picture";
    img.setAttribute("fetchpriority", "high");

    header.appendChild(h3);
    header.appendChild(description);
    header.appendChild(img);

    const main = document.createElement("main");

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "search";
    searchInput.placeholder = "Wpisz nazwe uzytkownika...";

    const searchButton = document.createElement("input");
    searchButton.type = "button";
    searchButton.value = "Szukaj";
    searchButton.className = "accept";

    main.appendChild(searchInput);
    main.appendChild(searchButton);
    searchButton.addEventListener("click", async () => {
        const steamid=searchInput.value.trim();
        if(!steamid){
            console.log("no id")
            return;
        }
        try{
         const userResponse = await fetch(`http://localhost:3000/user/${steamid}`);
         const userData = await userResponse.json();   
         const player = userData.response.players[0] 
         if(!player){
            console.log("no player")
         }else{
            window.location.href=`../index.html?steamid=${steamid}`
         }

        } catch(error){
            console.error("haolo",error);

        }
    })

    const copyDiv = document.createElement("div");
    copyDiv.className = "copy";
    const copyParagraph = document.createElement("p");
    copyParagraph.innerHTML = "&copy; COPYRIGHT 2026 Wszelkie prawa zastrzeżone<br>";
    copyDiv.appendChild(copyParagraph);
    
    body.appendChild(menuDiv);
    body.appendChild(header);
    body.appendChild(main);
    body.appendChild(copyDiv);
});


document.addEventListener('DOMContentLoaded', () => {






    const themeToggle = document.getElementById('theme-toggle');
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
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});


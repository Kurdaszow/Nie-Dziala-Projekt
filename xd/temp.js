const achievements = [
    { name: "Achievement 1", desc: "Do sth.", unlocked: true, img: "tmpA.jpg" },
    { name: "Achievement 2", desc: "Don't do sth.", unlocked: false, img: "tmpA.jpg" },
    { name: "Achievement 3", desc: "Do sth 10 times.", unlocked: true, img: "tmpA.jpg" },
    { name: "Achievement 4", desc: "Uninstall the game.", unlocked: false, img: "tmpA.jpg" }
];

const main = document.createElement("section");
main.id = "main";
document.body.appendChild(main);

const imageSection = document.createElement("section");
imageSection.id = "image";
main.appendChild(imageSection);

const link = document.createElement("a");
link.href = "../Help/index.html";
imageSection.appendChild(link);

const gameIMG = document.createElement("img");
gameIMG.id = "gameIMG";
gameIMG.src = "game.jpg";
gameIMG.alt = "No Image here";
link.appendChild(gameIMG);

const bg = document.createElement("img");
bg.id = "gamebgrd";
bg.src = "background.jpg";
bg.alt = "No Image here";
imageSection.appendChild(bg);

const gameName = document.createElement("p");
gameName.id = "gameName";
gameName.textContent = "Name of the game";
imageSection.appendChild(gameName);

const progressBar = document.createElement("p");
progressBar.id = "progressBar";
progressBar.textContent = "Here will be progress bar(I hope)";
imageSection.appendChild(progressBar);

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


function render(filter = "all") {

    container.innerHTML = "";

    achievements.forEach(a => {

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
        }
        else {

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

function filterAchiev(type) {
    render(type);
}

function toggleMinimalist() {
    render();
}

render();
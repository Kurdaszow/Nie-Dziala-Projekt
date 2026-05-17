document.body.innerHTML = `
    <section id="main">
        <section id="image">
            <a href="../Help/index.html">
                <img id="gameIMG" src="game.jpg" alt="No Image here">
            </a>

            <img id="gamebgrd" src="background.jpg" alt="No Image here">

            <p id="gameName">Name of the game</p>
            <p id="progressBar">Here will be progress bar(I hope)</p>
        </section>

        <div id="controls">
            <button onclick="filterAchiev('all')">All</button>
            <button onclick="filterAchiev('unlocked')">Unlocked</button>
            <button onclick="filterAchiev('locked')">Locked</button>

            <label>
                <input type="checkbox" id="minimalistToggle" onchange="toggleMinimalist()">
                Minimalist Mode
            </label>
        </div>

        <section id="achievContainer"></section>
    </section>

    <footer>
        <p>twórcy: My</p>
    </footer>
`;
const achievements = [
    { name: "Achievment 1", desc: "Do sth.", unlocked: true, img: "tmpA.jpg" },
    { name: "Achievment 2", desc: "Don't do sth.", unlocked: false, img: "tmpA.jpg" },
    { name: "Achievment  3", desc: "Do sth 10 times.", unlocked: true, img: "tmpA.jpg" },
    { name: "Achievment 4", desc: "Uninstall the game.", unlocked: false, img: "tmpA.jpg" }
];

const container = document.getElementById('achievContainer');
const miniToggle = document.getElementById('minimalistToggle');

function render(filter = 'all') {
    container.innerHTML = "";
    
    achievements.forEach(a => {
        if (filter === 'unlocked' && !a.unlocked) return;
        if (filter === 'locked' && a.unlocked) return;

        const div = document.createElement('div');
        div.className = `achievWhole ${a.unlocked ? 'unlocked' : 'locked'}`;
        
        if (miniToggle.checked) {
            div.innerHTML = `<p class="achievName">${a.name}</p>`;
            div.classList.add('minimalist');
        } else {
            div.innerHTML = `
                <img class="achieva" src="${a.img}" alt="icon">
                <div class="achievDesc">
                    <p class="achievName">${a.name}</p>
                    <p class="achievDesci">${a.desc}</p>
                </div>`;
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

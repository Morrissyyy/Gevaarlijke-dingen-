// Loading save
window.onload = function () {
    console.log("Loading all saved data...");

    // Debugging localStorage contents
    console.log("localStorage contents:", localStorage);

    loadHealth("p1");
    loadHealth("p2");
    loadMana();
    loadXP(); // Ensure loadXP is not dependent on data initialized in other functions
    loadMonsterHealth("m1");
    loadMonsters();
};

// saving player health
function saveHealth(playerId) {
    const healthValue = document.getElementById(`${playerId}-health`).textContent;
    const maxHealthValue = document.getElementById(`${playerId}-max-health`).textContent;
    const healthBar = document.getElementById(`${playerId}-health-bar`);
    const healthBarWidth = healthBar.style.width;
    const healthBarClasses = Array.from(healthBar.classList).join(' ');

    localStorage.setItem(`${playerId}-health`, healthValue);
    localStorage.setItem(`${playerId}-max-health`, maxHealthValue);
    localStorage.setItem(`${playerId}-health-bar-width`, healthBarWidth);
    localStorage.setItem(`${playerId}-health-bar-classes`, healthBarClasses);

    console.log(`Saved ${playerId} state: health=${healthValue}, maxHealth=${maxHealthValue}, barWidth=${healthBarWidth}, classes=${healthBarClasses}`);
}

// saving mana health
function saveMana() {
    const manaValue = document.getElementById("mna-health").textContent;
    const maxMana = document.getElementById("mna-max-health").textContent;
    const manaBar = document.getElementById("mana-bar");
    const manaBarWidth = manaBar.style.width;

    console.log("Saving Mana:", manaValue, maxMana, manaBarWidth);

    localStorage.setItem("mna-health", manaValue);
    localStorage.setItem("mna-max-health", maxMana);
    localStorage.setItem("mana-bar-width", manaBarWidth);
}

// save xp and level
function saveXP() {
    const xpValue = document.getElementById("xp-health").textContent;
    const levelValue = document.getElementById("level-display").textContent;
    const maxXP = getMaxXP(parseInt(levelValue, 10)); // Get max XP based on the current level
    const xpBar = document.getElementById("xp-bar");
    const xpBarWidth = xpBar.style.width;

    localStorage.setItem("xp-health", xpValue);
    localStorage.setItem("level", levelValue);
    localStorage.setItem("max-xp", maxXP); // Save max XP
    localStorage.setItem("xp-bar-width", xpBarWidth);

    console.log(`Saved XP state: xp=${xpValue}, level=${levelValue}, maxXP=${maxXP}, barWidth=${xpBarWidth}`);
}

// save monster health
function saveMonsterHealth(monsterId) {
    const healthValue = document.getElementById(`${monsterId}-health`).textContent;
    const maxHealthValue = document.getElementById(`${monsterId}-max-health`).textContent;
    const healthBar = document.getElementById(`${monsterId}-health-bar`);
    const healthBarWidth = healthBar.style.width;
    const healthBarClasses = Array.from(healthBar.classList).join(' ');

    localStorage.setItem(`${monsterId}-health`, healthValue);
    localStorage.setItem(`${monsterId}-max-health`, maxHealthValue);  
    localStorage.setItem(`${monsterId}-health-bar-width`, healthBarWidth);
    localStorage.setItem(`${monsterId}-health-bar-classes`, healthBarClasses);

    console.log(`Saved ${monsterId} state: health=${healthValue}, maxHealth=${maxHealthValue}, barWidth=${healthBarWidth}, classes=${healthBarClasses}`);
}

// save monster state
function saveMonsterState(monsterId, health) {
    const monsterList = JSON.parse(localStorage.getItem("monster-list")) || [];

    if (!monsterList.includes(monsterId)) {
        monsterList.push(monsterId);
        localStorage.setItem("monster-list", JSON.stringify(monsterList));
        console.log(`Added new monster to the list: ${monsterId}`);
    }

    const healthBar = document.getElementById(`${monsterId}-health-bar`);
    const maxHealth = localStorage.getItem(`${monsterId}-max-health`) || health;
    const healthBarWidth = healthBar ? healthBar.style.width : '100%';
    const healthBarClasses = healthBar ? Array.from(healthBar.classList).join(' ') : '';

    localStorage.setItem(`${monsterId}-health`, health);
    localStorage.setItem(`${monsterId}-max-health`, maxHealth);
    localStorage.setItem(`${monsterId}-health-bar-width`, healthBarWidth);
    localStorage.setItem(`${monsterId}-health-bar-classes`, healthBarClasses);

    console.log(`Saved ${monsterId} state: health=${health}, maxHealth=${maxHealth}, barWidth=${healthBarWidth}, classes=${healthBarClasses}`);
}

// load player health
function loadHealth(playerId) {
    const storedHealth = localStorage.getItem(`${playerId}-health`);
    const storedMaxHealth = localStorage.getItem(`${playerId}-max-health`);
    const storedHealthBarWidth = localStorage.getItem(`${playerId}-health-bar-width`);
    const storedHealthBarClasses = localStorage.getItem(`${playerId}-health-bar-classes`);

    if (storedHealth !== null) {
        document.getElementById(`${playerId}-health`).textContent = storedHealth;
    }

    if (storedMaxHealth !== null) {
        document.getElementById(`${playerId}-max-health`).textContent = storedMaxHealth;
    }

    const healthBar = document.getElementById(`${playerId}-health-bar`);
    if (storedHealthBarWidth !== null) {
        healthBar.style.width = storedHealthBarWidth;
    }

    if (storedHealthBarClasses !== null) {
        healthBar.className = ''; 
        healthBar.classList.add(...storedHealthBarClasses.split(' '));
    }

    console.log(`Loaded ${playerId} state: health=${storedHealth}, maxHealth=${storedMaxHealth}, barWidth=${storedHealthBarWidth}, classes=${storedHealthBarClasses}`);
}

// load mana
function loadMana() {
    const storedMana = localStorage.getItem("mna-health");
    const storedMaxMana = localStorage.getItem("mna-max-health");
    const storedManaBarWidth = localStorage.getItem("mana-bar-width");

    console.log("Loaded Mana data...");
    console.log("Stored Mana:", storedMana);
    console.log("Stored Max Mana:", storedMaxMana);
    console.log("Stored Mana Bar Width:", storedManaBarWidth);

    const mana = storedMana ? parseInt(storedMana, 10) : 30;
    const maxMana = storedMaxMana ? parseInt(storedMaxMana, 10) : 30;
    const manaBar = document.getElementById("mana-bar");

    document.getElementById("mna-health").textContent = mana;
    document.getElementById("mna-max-health").textContent = maxMana;

    console.log("Updated mna-health:", document.getElementById("mna-health").textContent);
    console.log("Updated mna-max-health:", document.getElementById("mna-max-health").textContent);

    if (storedManaBarWidth) {
        manaBar.style.width = storedManaBarWidth;
    } else {
        updateManaBar();
    }
}

// loading xp and level
function loadXP() {
    const storedXP = parseInt(localStorage.getItem("xp-health"), 10) || 0;
    const storedLevel = parseInt(localStorage.getItem("level"), 10) || 1;
    const storedMaxXP = parseInt(localStorage.getItem("max-xp"), 10);
    const storedXPBarWidth = localStorage.getItem("xp-bar-width");

    console.log("Loading XP data...");
    console.log("Stored XP:", storedXP);
    console.log("Stored Level:", storedLevel);
    console.log("Stored Max XP:", storedMaxXP);
    console.log("Stored XP Bar Width:", storedXPBarWidth);

    const maxXP = storedMaxXP !== null && !isNaN(storedMaxXP) ? storedMaxXP : getMaxXP(storedLevel);

    document.getElementById("xp-health").textContent = storedXP;
    document.getElementById("level-display").textContent = storedLevel;
    document.getElementById("max-xp").textContent = maxXP;

    const xpBar = document.getElementById("xp-bar");

    if (storedXPBarWidth) {
        xpBar.style.width = storedXPBarWidth;
    } else {
        xpBar.style.width = `${(storedXP / maxXP) * 100}%`;
    }

    console.log(`Loaded XP state: xp=${storedXP}, level=${storedLevel}, maxXP=${maxXP}`);
}

// loading monster health
function loadMonsterHealth(monsterId) {
    const storedHealth = localStorage.getItem(`${monsterId}-health`);
    const storedMaxHealth = localStorage.getItem(`${monsterId}-max-health`);
    const storedHealthBarWidth = localStorage.getItem(`${monsterId}-health-bar-width`);
    const storedHealthBarClasses = localStorage.getItem(`${monsterId}-health-bar-classes`);

    if (storedHealth !== null) {
        document.getElementById(`${monsterId}-health`).textContent = storedHealth;
    }

    if (storedMaxHealth !== null) {
        document.getElementById(`${monsterId}-max-health`).textContent = storedMaxHealth; 
    }

    const healthBar = document.getElementById(`${monsterId}-health-bar`);
    if (storedHealthBarWidth !== null) {
        healthBar.style.width = storedHealthBarWidth;
    }

    if (storedHealthBarClasses !== null) {
        healthBar.className = '';
        healthBar.classList.add(...storedHealthBarClasses.split(' '));
    }

    console.log(`Loaded ${monsterId} state: health=${storedHealth}, maxHealth=${storedMaxHealth}, barWidth=${storedHealthBarWidth}, classes=${storedHealthBarClasses}`);
}

// loading added monsters
function loadMonsters() {
    const monsterList = JSON.parse(localStorage.getItem('monsterList')) || [];

    monsterList.forEach(monsterId => {
        const storedHealth = localStorage.getItem(`${monsterId}-health`);
        const storedMaxHealth = localStorage.getItem(`${monsterId}-max-health`);
        const storedHealthBarWidth = localStorage.getItem(`${monsterId}-health-bar-width`);
        const storedHealthBarClasses = localStorage.getItem(`${monsterId}-health-bar-classes`);

        const monsterRow = document.createElement('tr');
        monsterRow.id = `${monsterId}-row`;
        monsterRow.innerHTML = `
            <td>
                <span class="monster-number">${monsterId}</span>
                <img src="images/dragon.png" alt="${monsterId} icon" class="icon" onclick="setMaxHealth('${monsterId}')">
            </td>
            <td class="health-container">
                <div class="health-bar" id="${monsterId}-health-bar"></div>
                <span class="health-value" id="${monsterId}-health">${storedHealth || 15}</span> /
                <span class="max-health" id="${monsterId}-max-health">${storedMaxHealth || 15}</span>
                <div class="button-group">
                    <img src="images/minus.png" alt="minus" class="change-button" onclick="changeMonsterHealth('${monsterId}', -1)">
                    <img src="images/plus.png" alt="plus" class="change-button" onclick="changeMonsterHealth('${monsterId}', 1)">
                    <a class="remove-monster-button" onclick="removeMonster('${monsterId}')"><i class="fas fa-minus"></i></a>
                </div>
            </td>
        `;

        const healthBar = monsterRow.querySelector(`#${monsterId}-health-bar`);
        if (storedHealthBarWidth) {
            healthBar.style.width = storedHealthBarWidth;
        }
        if (storedHealthBarClasses) {
            healthBar.className = '';
            healthBar.classList.add(...storedHealthBarClasses.split(' '));
        }

        const tableBody = document.querySelector('.table-container tbody');
        tableBody.insertBefore(monsterRow, document.getElementById('add-monster-row'));

        console.log(`Loaded ${monsterId} state: health=${storedHealth}, maxHealth=${storedMaxHealth}, barWidth=${storedHealthBarWidth}, classes=${storedHealthBarClasses}`);
    });

    console.log(`Loaded all monsters: ${monsterList.join(', ')}`);
}

// change monster health
function changeMonsterHealth(monsterId, change) {
    const currentHealth = parseInt(document.getElementById(monsterId + "-health").innerText);
    const maxHealth = parseInt(document.getElementById(monsterId + "-max-health").innerText);

    let newHealth = currentHealth + change;

    if (newHealth < 0) newHealth = 0;
    if (newHealth > maxHealth) newHealth = maxHealth;

    document.getElementById(monsterId + "-health").innerText = newHealth;

    updateMonsterHealthBar(monsterId);

    saveMonsterHealth(monsterId);
}

// set max health players
function setMaxHealth(playerId) {
    const maxHealthElement = document.getElementById(`${playerId}-max-health`);
    let newMaxHealth = prompt("Enter new max health:", maxHealthElement.textContent);

    newMaxHealth = parseFloat(newMaxHealth);

    if (!isNaN(newMaxHealth) && newMaxHealth > 0) {
        maxHealthElement.textContent = newMaxHealth;
        updateHealthBar(playerId);
    } else {
        alert("Please enter a valid positive number for max health.");
    }
}

// remove added monsters
function removeMonster(monsterId) {
    const monsterRow = document.getElementById(`${monsterId}-row`);

    if (monsterRow) {
        monsterRow.remove();

        let monsterList = JSON.parse(localStorage.getItem('monsterList')) || [];
        const index = monsterList.indexOf(monsterId);
        if (index > -1) {
            monsterList.splice(index, 1);
            localStorage.setItem('monsterList', JSON.stringify(monsterList));
        }

        localStorage.removeItem(`${monsterId}-health`);
        localStorage.removeItem(`${monsterId}-max-health`);
        localStorage.removeItem(`${monsterId}-health-bar-width`);
        localStorage.removeItem(`${monsterId}-health-bar-classes`);

        console.log(`Monster ${monsterId} removed.`);
    }
}

//
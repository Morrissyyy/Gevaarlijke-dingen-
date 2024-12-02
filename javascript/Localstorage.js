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

    console.log("All data loaded successfully.");
};






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

function saveMana() {
    const manaValue = document.getElementById("mna-health").textContent;
    const maxManaValue = document.getElementById("mna-max-health").textContent;
    const manaBar = document.getElementById("mana-bar");
    const manaBarWidth = manaBar.style.width;

    localStorage.setItem("mna-health", manaValue);
    localStorage.setItem("mna-max-health", maxManaValue);
    localStorage.setItem("mana-bar-width", manaBarWidth);

    console.log(`Saved MNA mana: mana=${manaValue}, maxMana=${maxManaValue}, barWidth=${manaBarWidth}`);
}

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

function saveMonsterState(monsterId, health) {
    const maxHealth = health; 

    localStorage.setItem(`${monsterId}-health`, health);
    localStorage.setItem(`${monsterId}-max-health`, maxHealth);
    localStorage.setItem(`${monsterId}-health-bar-width`, '100%'); 
    localStorage.setItem(`${monsterId}-health-bar-classes`, '');
    console.log(`Saved ${monsterId} state: health=${health}, maxHealth=${maxHealth}`);
}

function saveMonsterState(monsterId, health) {
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

function loadMana() {
    const storedMana = localStorage.getItem("mna-health");
    const storedMaxMana = localStorage.getItem("mna-max-health");
    const storedManaBarWidth = localStorage.getItem("mana-bar-width");

    if (storedMana !== null) {
        document.getElementById("mna-health").textContent = storedMana;
    }

    if (storedMaxMana !== null) {
        document.getElementById("mna-max-health").textContent = storedMaxMana;
    }

    const manaBar = document.getElementById("mana-bar");
    if (storedManaBarWidth !== null) {
        manaBar.style.width = storedManaBarWidth;
    }

    console.log(`Loaded MNA mana: mana=${storedMana}, maxMana=${storedMaxMana}, barWidth=${storedManaBarWidth}`);
}

function loadXP() {
    const storedXP = parseInt(localStorage.getItem("xp-health"), 10) || 0;
    const storedLevel = parseInt(localStorage.getItem("level"), 10) || 1;
    const storedMaxXP = parseInt(localStorage.getItem("max-xp"), 10);

    console.log("Loading XP data...");
    console.log("Stored XP:", storedXP);
    console.log("Stored Level:", storedLevel);
    console.log("Stored Max XP:", storedMaxXP);

    const maxXP = storedMaxXP !== null && !isNaN(storedMaxXP) ? storedMaxXP : getMaxXP(storedLevel);

    document.getElementById("xp-health").textContent = storedXP;
    document.getElementById("level-display").textContent = storedLevel;
    document.getElementById("max-xp").textContent = maxXP;

    const xpBar = document.getElementById("xp-bar");
    xpBar.style.width = `${(storedXP / maxXP) * 100}%`;

    console.log(`Loaded XP state: xp=${storedXP}, level=${storedLevel}, maxXP=${maxXP}`);
}






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










function changeHealth(playerId, amount) {
    const healthElement = document.getElementById(`${playerId}-health`);
    const maxHealth = parseInt(document.getElementById(`${playerId}-max-health`).textContent);
    let currentHealth = parseInt(healthElement.textContent);

    let newHealth = Math.max(0, Math.min(currentHealth + amount, maxHealth));
    healthElement.textContent = newHealth;

    updateHealthBar(playerId);
}

function changeMNAHealth(change) {
    const maxManaElement = document.getElementById('mna-max-health');
    const maxMana = parseInt(maxManaElement.textContent);

    updateHealth('mna-health', change, maxMana);
    updateManaBar();

    saveMana();
}

function changeXP(amount) {
    const xpElement = document.getElementById('xp-health');
    let currentXP = parseInt(xpElement.textContent);

    currentXP = Math.max(currentXP + amount, 0);
    xpElement.textContent = currentXP;

    levelUp();
    updateXPBar();

    saveXP();
}

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










function setMaxHealth(playerId) {
    const maxHealthElement = document.getElementById(`${playerId}-max-health`);
    let newMaxHealth = prompt("Enter new max health:", maxHealthElement.textContent);

    if (newMaxHealth !== null && !isNaN(newMaxHealth) && newMaxHealth > 0) {
        maxHealthElement.textContent = newMaxHealth;
        updateHealthBar(playerId);
    }
}

function setMaxHealth(entity) {
    const newMaxHealth = prompt(`Enter new max health for ${entity}:`);
    if (newMaxHealth !== null && !isNaN(newMaxHealth) && parseInt(newMaxHealth) > 0) {
        document.getElementById(`${entity}-max-health`).textContent = newMaxHealth;

        const currentHealthElement = document.getElementById(`${entity}-health`);
        const currentHealth = parseInt(currentHealthElement.textContent);
        if (currentHealth > parseInt(newMaxHealth)) {
            currentHealthElement.textContent = newMaxHealth;
        }

        if (entity === 'mna') {
            saveMana(); 
        }
    }
}

function setMaxHealth(monsterId) {
    const maxHealthElement = document.getElementById(`${monsterId}-max-health`);
    let newMaxHealth = prompt("Enter new max health:", maxHealthElement.textContent);

    if (newMaxHealth !== null && !isNaN(newMaxHealth) && newMaxHealth > 0) {
        maxHealthElement.textContent = newMaxHealth;
        updateMonsterHealthBar(monsterId);

        saveMonsterHealth(monsterId);
    }
}





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


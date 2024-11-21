function updateHealth(elementId, change, maxHealth) {
    const healthSpan = document.getElementById(elementId);
    let currentHealth = parseInt(healthSpan.textContent);

    currentHealth = Math.min(Math.max(currentHealth + change, 0), maxHealth);
    
    healthSpan.textContent = currentHealth;
}

function changeMNAHealth(change) {
    const maxManaElement = document.getElementById('mna-max-health');
    const maxMana = parseInt(maxManaElement.textContent);
    
    updateHealth('mna-health', change, maxMana);

    updateManaBar();
}

document.addEventListener("DOMContentLoaded", function() {
    updateManaBar();
});

function handleMonsterShortPress(monster, amount) {
    changeMonsterHealth(monster, amount);
}

function handleMonsterLongPress(monster, amount) {
    longPressTimeout = setTimeout(() => {
        const userAmount = parseInt(prompt(`Enter the amount to change ${monster} health by:`), 10);

        if (!isNaN(userAmount)) {
            changeMonsterHealth(monster, userAmount * amount); 
        }
    }, 500); 
}

function resetMonstersHealth() {
    const maxHealthElementM1 = document.getElementById('m1-max-health');
    if (maxHealthElementM1) {
        const maxHealthM1 = parseInt(maxHealthElementM1.textContent);

        document.getElementById('m1-health').textContent = maxHealthM1;

        updateMonsterHealthBar('m1', maxHealthM1, maxHealthM1);
    } else {
        console.warn('Max health element not found for m1');
    }

    const monsterRows = document.querySelectorAll('.table-container tbody tr[id^="m"]:not(#m1-row)');
    monsterRows.forEach(row => {
        const monsterId = row.id.split('-')[0]; 

        const maxHealthElement = document.getElementById(`${monsterId}-max-health`);
        if (maxHealthElement) {
            const maxHealth = parseInt(maxHealthElement.textContent);

            document.getElementById(`${monsterId}-health`).textContent = maxHealth;

            updateMonsterHealthBar(monsterId, maxHealth, maxHealth);
        } else {
            console.warn(`Max health element not found for ${monsterId}`);
        }
    });
}


let longPressTimeout;

function handleShortPress(player, amount) {
    changeHealth(player, amount);
}

function handleLongPress(player, amount) {
    longPressTimeout = setTimeout(() => {
        const userAmount = parseInt(prompt("Enter the amount to change health by:"), 10);

        if (!isNaN(userAmount)) {
            changeHealth(player, userAmount * amount); 
        }
    }, 500);
}

function clearLongPress() {
    clearTimeout(longPressTimeout);
}

function changeHealth(player, amount) {
    const maxHealthElement = document.getElementById(`${player}-max-health`);
    const maxHealth = parseInt(maxHealthElement.textContent);
    
    updateHealth(`${player}-health`, amount, maxHealth);
}

    function changePlayersHealth(amount) {
        const players = ['p1', 'p2'];
    
        players.forEach(player => {
            const healthElement = document.getElementById(`${player}-health`);
            let currentHealth = parseInt(healthElement.textContent);
            const maxHealth = parseInt(healthElement.nextElementSibling.textContent);
    
            currentHealth = Math.min(Math.max(currentHealth + amount, 0), maxHealth);
    
            healthElement.textContent = currentHealth;
        });
    }
    
    function handleCounterLongPress(amount) {
        longPressTimeout = setTimeout(() => {
            const userInput = prompt("Enter the amount to change by:", amount);
            if (userInput !== null) {
                let parsedAmount = parseInt(userInput);
                if (!isNaN(parsedAmount)) {
                    if (amount === -1 && parsedAmount > 0) {
                        parsedAmount = -parsedAmount;
                    }
                    changePlayersHealth(parsedAmount);
                }
            }
        }, 1000); 
    }

    function clearLongPress() {
        clearTimeout(longPressTimeout);
    }

    function changePlayersHealth(amount) {
        console.log(`Health changed by: ${amount}`);
    }

    function resetPlayersHealth() {
        const players = ['p1', 'p2', 'mna'];
        players.forEach(player => {
            const maxHealthElement = document.getElementById(`${player}-max-health`);
            const maxHealth = parseInt(maxHealthElement.textContent);
    
            document.getElementById(`${player}-health`).textContent = maxHealth;
    
            if (player === 'mna') {
                updateManaBar(); 
            } else {
                updateHealthBar(player);
            }
        });

        updateHealthBar('p1');
        updateHealthBar('p2');
        updateManaBar();
    }


    function handleXPShortPress(amount) {
        adjustXP(amount);
    }
    
    function handleXPLongPress(amount) {
        longPressTimeout = setTimeout(() => {   
            const userAmount = parseInt(prompt("Enter the amount to adjust XP by:"), 10);
    
            if (!isNaN(userAmount)) {
                adjustXP(userAmount * amount); 
            }
        }, 500);
    }

    function getMaxXP(level) {
        if (level === 1) return 40;    
        if (level === 2) return 80;   
        if (level === 3) return 160;  
        if (level === 4) return 320;   
        return 2 * getMaxXP(level - 1);
    }
    
    function updateXPBar() {
        const xp = parseInt(document.getElementById("xp-health").innerText);
        const levelElement = document.getElementById("level-display");
        
        const currentLevel = levelElement && !isNaN(parseInt(levelElement.textContent))
            ? parseInt(levelElement.textContent)
            : 1;
        const maxXP = getMaxXP(currentLevel);
        const xpPercentage = (xp / maxXP) * 100;
        const xpBar = document.getElementById("xp-bar");
    
        xpBar.style.width = `${(xpPercentage / 100) * 160}px`;
    
        if (xp >= maxXP * 0.75) {
            xpBar.classList.remove("low-xp", "critical-xp");
            xpBar.classList.add("full-xp");
        } else if (xp >= maxXP * 0.25) {
            xpBar.classList.remove("full-xp", "critical-xp");
            xpBar.classList.add("low-xp");
        } else {
            xpBar.classList.remove("full-xp", "low-xp");
            xpBar.classList.add("critical-xp");
        }
    }
    
    function levelUp() {
        let xpElement = document.getElementById('xp-health');
        let levelElement = document.getElementById('level-display');
        
        let currentXP = parseInt(xpElement.textContent);
        let currentLevel = parseInt(levelElement.textContent);
    
        while (currentXP > getMaxXP(currentLevel)) {
            currentLevel++;
            levelElement.textContent = currentLevel;
            currentXP = getMaxXP(currentLevel - 1) + 1;
            xpElement.textContent = currentXP;
        }
        
        let maxXPElem = xpElement.nextElementSibling;
        maxXPElem.textContent = getMaxXP(currentLevel);
    }
    
    function changeXP(amount) {
        const xpElement = document.getElementById('xp-health');
        let currentXP = parseInt(xpElement.textContent);
    
        currentXP = Math.max(currentXP + amount, 0);
        xpElement.textContent = currentXP;
    
        levelUp();
        updateXPBar();
    }
    
    function adjustXP(value) {
        changeXP(value); 
    }
    
    let monsterCount = 1; 

    function addMonster() {
        monsterCount++;
    
        const monsterId = prompt("Enter the monster identifier (e.g., m1, m2, etc.):", `m${monsterCount}`);
        if (!monsterId) {
            alert("Monster identifier is required.");
            return; 
        }
    
        const health = prompt("Enter the monster's health value:", "15");
        if (!health || isNaN(health) || health <= 0) {
            alert("Please enter a valid health value.");
            return; 
        }
    
        const monsterRow = document.createElement('tr');
        monsterRow.id = `${monsterId}-row`;
        monsterRow.innerHTML = `
            <td>
                <span class="monster-number">${monsterId}</span>
                <img src="images/dragon.png" alt="${monsterId} icon" class="icon" onclick="setMaxHealth('${monsterId}')">
            </td>
            <td class="health-container">
                <div class="health-bar" id="${monsterId}-health-bar"></div>
                <span class="health-value" id="${monsterId}-health">${health}</span> /
                <span class="max-health" id="${monsterId}-max-health">${health}</span>
                <div class="button-group">
                    <img src="images/minus.png" alt="minus" class="change-button" onclick="changeMonsterHealth('${monsterId}', -1)"                 
                            onmousedown="handleMonsterLongPress('${monsterId}', -1)" 
                            onmouseup="clearLongPress()" 
                            onmouseleave="clearLongPress()" 
                            onclick="handleMonsterShortPress('${monsterId}', -1)">
                    <img src="images/plus.png" alt="plus" class="change-button" onclick="changeMonsterHealth('${monsterId}', 1)"                 
                            onmousedown="handleMonsterLongPress('${monsterId}', 1)" 
                            onmouseup="clearLongPress()" 
                            onmouseleave="clearLongPress()" 
                            onclick="handleMonsterShortPress('${monsterId}', 1)">
                    <a class="remove-monster-button" onclick="removeMonster(${monsterCount})"><i class="fas fa-minus"></i></a>
                </div>
            </td>
        `;
    
        const tableBody = document.querySelector('.table-container tbody');
        tableBody.insertBefore(monsterRow, document.getElementById('add-monster-row')); 
    }
    
        
    function removeMonster(id) {
        const monsterRow = document.getElementById(`m${id}-row`);
        
        if (monsterRow) {
            monsterRow.remove();
            monsterCount--; 
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
        }
    }
    
function changePlayersHealth(amount) {
    changeHealth('p1', amount);
    changeHealth('p2', amount);
}

function changeHealth(player, amount) {
    const healthElement = document.getElementById(`${player}-health`);
    let health = parseInt(healthElement.innerText);
    const maxHealth = parseInt(document.getElementById(`${player}-max-health`).innerText);
    health = Math.max(0, Math.min(health + amount, maxHealth)); 
    healthElement.innerText = health;
    updateHealthBar(player); 
}

function updateHealthBar(player) {
    const health = parseInt(document.getElementById(`${player}-health`).innerText);
    const maxHealth = parseInt(document.getElementById(`${player}-max-health`).innerText);
    const healthPercentage = (health / maxHealth) * 100;
    const healthBar = document.getElementById(`${player}-health-bar`);

    healthBar.style.width = `${(healthPercentage / 100) * 160}px`;

    if (health >= 15) {
        healthBar.classList.remove("low-health", "critical-health");
        healthBar.classList.add("medium-health", "full-health");
    } else if (health >= 5) {
        healthBar.classList.remove("medium-health", "full-health", "critical-health");
        healthBar.classList.add("low-health");
    } else {
        healthBar.classList.remove("medium-health", "low-health", "full-health");
        healthBar.classList.add("critical-health");
    }
}

window.onload = function() {
    updateHealthBar("p1");
    updateHealthBar("p2");
};

function handleMNAShortPress(amount) {
    changeMNAHealth(amount);
}

function handleMNALongPress(amount) {
    longPressTimeout = setTimeout(() => {
        const userAmount = parseInt(prompt("Enter the amount to change MNA health by:"), 10);

        if (!isNaN(userAmount)) {
            changeMNAHealth(userAmount * amount); 
        }
    }, 500);
}

function clearLongPress() {
    clearTimeout(longPressTimeout);
}

function updateManaBar() {
    const mana = parseInt(document.getElementById("mna-health").innerText);
    const maxMana = parseInt(document.getElementById("mna-max-health").innerText);
    const manaPercentage = (mana / maxMana) * 100;
    const manaBar = document.getElementById("mana-bar");

    manaBar.style.width = `${(manaPercentage / 100) * 160}px`;

    if (mana >= 15) {
        manaBar.classList.remove("low-mana", "critical-mana");
        manaBar.classList.add("medium-mana", "full-mana");
    } else if (mana >= 5) {
        manaBar.classList.remove("medium-mana", "full-mana", "critical-mana");
        manaBar.classList.add("low-mana");
    } else {
        manaBar.classList.remove("medium-mana", "low-mana", "full-mana");
        manaBar.classList.add("critical-mana");
    }
}

function updateMonsterHealthBar(monsterId) {
    const health = parseInt(document.getElementById(monsterId + "-health").innerText);
    const maxHealth = parseInt(document.getElementById(monsterId + "-max-health").innerText);
    const healthPercentage = (health / maxHealth) * 100;
    const healthBar = document.getElementById(monsterId + "-health-bar");

    healthBar.style.width = `${(healthPercentage / 100) * 160}px`;

    if (health >= 10) {
        healthBar.classList.remove("low-health", "critical-health");
        healthBar.classList.add("medium-health", "full-health");
    } else if (health >= 5) {
        healthBar.classList.remove("medium-health", "full-health", "critical-health");
        healthBar.classList.add("low-health");
    } else {
        healthBar.classList.remove("medium-health", "low-health", "full-health");
        healthBar.classList.add("critical-health");
    }
}

function changeMonsterHealth(monsterId, change) {
    const currentHealth = parseInt(document.getElementById(monsterId + "-health").innerText);
    const maxHealth = parseInt(document.getElementById(monsterId + "-max-health").innerText);

    let newHealth = currentHealth + change;

    if (newHealth < 0) newHealth = 0;
    if (newHealth > maxHealth) newHealth = maxHealth;

    document.getElementById(monsterId + "-health").innerText = newHealth;

    updateMonsterHealthBar(monsterId);
}

document.addEventListener("DOMContentLoaded", function() {
    updateMonsterHealthBar("m1");
    updateMonsterHealthBar("m2");
    updateMonsterHealthBar("m3");
    updateMonsterHealthBar("m4");
    updateMonsterHealthBar("m5");
    updateMonsterHealthBar("m6");
});

function saveHealthState(playerId, healthValue) {
    localStorage.setItem(playerId + '-health', healthValue);
}

function loadHealthState(playerId, defaultHealth) {
    const savedHealth = localStorage.getItem(playerId + '-health');
    return savedHealth ? parseInt(savedHealth, 10) : defaultHealth;
}

function adjustHealth(playerId, amount) {
    const healthBar = document.getElementById(playerId + '-health-bar');
    const healthText = document.getElementById(playerId + '-health-text');

    let newHealth = parseInt(healthBar.value) + amount;
    newHealth = Math.max(0, Math.min(newHealth, healthBar.max)); 

    healthBar.value = newHealth;
    healthText.textContent = `${newHealth}/${healthBar.max}`;

    saveHealthState(playerId, newHealth);
}

function restoreHealthBars() {
    const p1Health = loadHealthState('p1', 30); 
    const p2Health = loadHealthState('p2', 30); 

    document.getElementById('p1-health-bar').value = p1Health;
    document.getElementById('p1-health-text').textContent = `${p1Health}/100`;

    document.getElementById('p2-health-bar').value = p2Health;
    document.getElementById('p2-health-text').textContent = `${p2Health}/100`;
}

window.onload = restoreHealthBars;

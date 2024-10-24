function changeHealth(player, amount) {
    const healthElement = document.getElementById(`${player}-health`);
    let currentHealth = parseInt(healthElement.textContent);
    const maxHealth = parseInt(document.querySelector(`#${player}-health`).nextElementSibling.textContent);

    // Update health, ensuring it doesn't go below 0 or above maxHealth
    currentHealth = Math.min(Math.max(currentHealth + amount, 0), maxHealth);

    // Update the displayed health value
    healthElement.textContent = currentHealth;
}

// Function to change both players' health at once
function changePlayersHealth(change) {
    // Reuse the changeHealth function for both players
    changeHealth('p1', change);
    changeHealth('p2', change);
}

    function changeMonsterHealth(monster, change) {
        const healthSpan = document.getElementById(`${monster}-health`);
        let currentHealth = parseInt(healthSpan.textContent);

        // Change health and ensure it doesn't go below 0 or above max
        currentHealth += change;
        const maxHealth = 15; // Maximum health for monsters
        if (currentHealth < 0) currentHealth = 0;
        if (currentHealth > maxHealth) currentHealth = maxHealth;

        // Update health display
        healthSpan.textContent = currentHealth;
    }

    function changeMNAHealth(change) {
        const healthSpan = document.getElementById('mna-health');
        let currentHealth = parseInt(healthSpan.textContent);

        // Change health and ensure it doesn't go below 0 or above max
        currentHealth += change;
        const maxHealth = 30; // Maximum health for MNA
        if (currentHealth < 0) currentHealth = 0;
        if (currentHealth > maxHealth) currentHealth = maxHealth;

        // Update health display
        healthSpan.textContent = currentHealth;
    }

    function changeXPHealth(change) {
        const healthSpan = document.getElementById('xp-health');
        let currentHealth = parseInt(healthSpan.textContent);

        // Change health and ensure it doesn't go below 0 or above max
        currentHealth += change;
        const maxHealth = 80; // Maximum health for XP
        if (currentHealth < 0) currentHealth = 0;
        if (currentHealth > maxHealth) currentHealth = maxHealth;

        // Update health display
        healthSpan.textContent = currentHealth;
    }

    function changeGold(change) {
        const goldSpan = document.getElementById('gld-value');
        let currentGold = parseInt(goldSpan.textContent);

        // Change gold value
        currentGold += change;

        // Update gold display
        goldSpan.textContent = currentGold;
    }


    function resetMonstersHealth() {
        const monsters = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
        monsters.forEach(monster => {
            const monsterHealthSpan = document.getElementById(`${monster}-health`);
            let currentHealth = parseInt(monsterHealthSpan.textContent);
            const maxHealth = 15; // Maximum health for monsters

            // Increase health by 15, but do not exceed the max health
            currentHealth += 15;
            if (currentHealth > maxHealth) {
                currentHealth = maxHealth; // Cap to max health
            }

            // Update health display
            monsterHealthSpan.textContent = currentHealth;
        });
    } 

    function resetPlayersHealth() {
        const players = ['p1', 'p2'];
        players.forEach(player => {
            const playerHealthSpan = document.getElementById(`${player}-health`);
            let currentHealth = parseInt(playerHealthSpan.textContent);
            const maxHealth = 30; // Maximum health for players
    
            // Increase health by 30, but do not exceed max health
            currentHealth += 30;
            if (currentHealth > maxHealth) {
                currentHealth = maxHealth; // Cap to max health
            }
    
            // Update health display
            playerHealthSpan.textContent = currentHealth;
        });
    }
    

    let currentMonsterIndex = 1; // Start with M1

    // Function to show the next monster row
    function addMonster() {
        const nextMonsterIndex = currentMonsterIndex + 1; // Get the next monster index
        const nextMonsterRow = document.getElementById(`m${nextMonsterIndex}-row`);
    
        if (nextMonsterRow) { // Check if the next monster exists
            nextMonsterRow.style.display = 'table-row'; // Show the next monster row
            currentMonsterIndex = nextMonsterIndex; // Update current index
        }
    }

// Function to toggle the visibility of monsters
// Function to toggle the visibility of monsters
function toggleMonster(monster) {
    const monsterRow = document.getElementById(`${monster}-row`);
    
    if (monster === 'm1') {
        // If M1 is clicked, show all monsters (M2 to M6)
        const monsters = ['m2', 'm3', 'm4', 'm5', 'm6'];
        monsters.forEach(m => {
            const mRow = document.getElementById(`${m}-row`);
            mRow.style.display = mRow.style.display === 'none' || mRow.style.display === '' ? 'table-row' : 'none';
        });
    } else {
        // Toggle the visibility of the clicked monster
        monsterRow.style.display = monsterRow.style.display === 'none' || monsterRow.style.display === '' ? 'table-row' : 'none';
    }
}

    
    // Helper function to get the next monster in the sequence
    function getNextMonster(current) {
        const monsters = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
        const currentIndex = monsters.indexOf(current);
        return currentIndex < monsters.length - 1 ? monsters[currentIndex + 1] : null;
    }
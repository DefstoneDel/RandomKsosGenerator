document.addEventListener('DOMContentLoaded', () => {
    const rollButton = document.getElementById('rollButton');
    const setNameButton = document.getElementById('setNameButton');
    const userNameInput = document.getElementById('userNameInput');
    const resultElement = document.getElementById('result');
    
    // The core, fixed options
    const fixedChoices = ["Guel", "Niak", "Myth"]; 
    
    // NEW: Array to store all names input by the user
    let customNamesList = []; 
    
    // The working list of choices for the roll (animation & random result pool)
    let currentChoices = [...fixedChoices]; 
    
    const rollDuration = 3000; // 3 seconds for suspense
    let isTrulyRandom = false; 

    // --- Function to rebuild the currentChoices array based on the list ---
    const rebuildChoices = () => {
        // Start fresh with fixed choices
        currentChoices = [...fixedChoices]; 
        
        // Add all custom names from the list
        currentChoices.push(...customNamesList);
    };


    // --- Event Listener for Adding the Custom Choice / Command ---
    setNameButton.addEventListener('click', () => {
        const newEntry = userNameInput.value.trim();
        
        // 1. Check for the secret command
        if (newEntry.toLowerCase() === "random4real") {
            isTrulyRandom = true;
        } else {
            isTrulyRandom = false; 
            
            // 2. Handle as a regular custom name input
            if (newEntry) {
                // Add the new valid name to the list
                customNamesList.push(newEntry);
            }
        }

        // 3. Rebuild the choices array to reflect the new list (or the command status)
        rebuildChoices();
        
        // Clear the input field
        userNameInput.value = '';
        console.log(`Choices updated: ${currentChoices.join(', ')}. Random mode: ${isTrulyRandom ? 'TRUE' : 'FALSE'}. Total Custom Names: ${customNamesList.length}`);
    });

    // --- Event Listener for the Main Roll Button ---
    rollButton.addEventListener('click', () => {
        
        rollButton.disabled = true;
        resultElement.textContent = "Rolling...";
        resultElement.classList.remove('myth');

        let rollCount = 0;
        
        // Create pool for animation (excludes 'Myth' for suspense)
        const animationChoices = currentChoices.filter(c => c !== "Myth");
        const animationPool = animationChoices.length > 0 ? animationChoices : currentChoices;

        const rollInterval = setInterval(() => {
            // Pick a choice randomly from the animation pool (Guel, Niak, CustomNames...)
            const randomIndex = Math.floor(Math.random() * animationPool.length);
            let displayedChoice = animationPool[randomIndex];
            
            resultElement.textContent = displayedChoice; 
            
            rollCount++;
            
            if (rollCount * 100 >= rollDuration) {
                clearInterval(rollInterval);
                
                // 3. Determine the FINAL result
                let finalResult;
                let isMyth = false;
                
                if (isTrulyRandom) {
                    // TRUE RANDOM MODE: Result is a random pick from the full currentChoices array, 
                    // which includes Guel, Niak, Myth, and ALL custom names.
                    const randomFinalIndex = Math.floor(Math.random() * currentChoices.length);
                    finalResult = currentChoices[randomFinalIndex];
                } else {
                    // BIASED MODE: Result is always "Myth"
                    finalResult = "Myth"; 
                }
                
                // Check if the final result is Myth for special styling
                if (finalResult === "Myth") {
                    isMyth = true;
                }
                
                // 4. Update display and styling
                resultElement.textContent = finalResult;
                if (isMyth) {
                    resultElement.classList.add('myth');
                } else {
                    resultElement.classList.remove('myth');
                }

                rollButton.disabled = false;
            }
        }, 100);
    });

    // Initialize state
    rebuildChoices(); 
});

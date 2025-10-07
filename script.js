document.addEventListener('DOMContentLoaded', () => {
    const rollButton = document.getElementById('rollButton');
    const resultElement = document.getElementById('result');
    const choices = ["Guel", "Niak", "Myth"];
    
    const rollDuration = 3000; // 3 seconds for suspense

    rollButton.addEventListener('click', () => {
        rollButton.disabled = true;
        resultElement.textContent = "Rolling...";
        resultElement.classList.remove('myth');

        let rollCount = 0;
        
        const rollInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * (choices.length - 1)); // Cycles non-Myth options
            resultElement.textContent = choices[randomIndex]; 
            
            rollCount++;
            
            if (rollCount * 100 >= rollDuration) {
                clearInterval(rollInterval);
                
                const finalResult = "Myth"; 
                resultElement.textContent = finalResult;
                resultElement.classList.add('myth');
                rollButton.disabled = false;
            }
        }, 100);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate");
    calculateButton.addEventListener("click", calculateSplit);
    
    const numFriendsInput = document.getElementById("numFriends");
    numFriendsInput.addEventListener("input", createFriendInputs);
});

function createFriendInputs() {
    const numFriends = parseInt(document.getElementById("numFriends").value) || 0;
    const friendInputsDiv = document.getElementById("friendInputs");

    let friendInputsHTML = "";
    for (let i = 1; i <= numFriends; i++) {
        friendInputsHTML += `
            <div class="input-group">
                <label for="person${i}">Persona ${i}:</label>
                <input type="number" id="person${i}" placeholder="Monto">
            </div>
        `;
    }
    friendInputsDiv.innerHTML = friendInputsHTML;
}

function calculateSplit() {
    const numFriends = parseInt(document.getElementById("numFriends").value) || 0;
    const friendAmounts = [];

    for (let i = 1; i <= numFriends; i++) {
        const amount = parseFloat(document.getElementById(`person${i}`).value) || 0;
        friendAmounts.push(amount);
    }

    const totalAmount = friendAmounts.reduce((total, amount) => total + amount, 0);
    const equalAmount = totalAmount / numFriends;

    const resultElement = document.getElementById("result");
    
    if (totalAmount === 0) {
        resultElement.style.display = "none";
        return;
    }

    resultElement.style.display = "block";

    const owes = friendAmounts.map(amount => equalAmount - amount);

    let resultHTML = "Resumen de deudas:<br>";
    for (let i = 0; i < numFriends; i++) {
        if (owes[i] > 0) {
            for (let j = 0; j < numFriends; j++) {
                if (owes[j] < 0) {
                    const amountToPay = Math.min(Math.abs(owes[i]), Math.abs(owes[j]));
                    owes[i] -= amountToPay;
                    owes[j] += amountToPay;
                    if (amountToPay > 0) {
                        resultHTML += `Persona ${i + 1} le debe pagar a Persona ${j + 1}: $${amountToPay.toFixed(2)}<br>`;
                    }
                }
            }
        }
    }

    resultElement.innerHTML = resultHTML;
}

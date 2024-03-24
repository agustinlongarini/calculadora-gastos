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
                <label for="name${i}">Amigo ${i}:</label>
                <input type="text" id="name${i}" placeholder="Ingresar nombre">
                <input type="number" id="amount${i}" placeholder="Plata que puso">
            </div>
        `;
    }
    friendInputsDiv.innerHTML = friendInputsHTML;
}

function calculateSplit() {
    const numFriends = parseInt(document.getElementById("numFriends").value) || 0;
    const friendAmounts = [];

    for (let i = 1; i <= numFriends; i++) {
        const amount = parseFloat(document.getElementById(`amount${i}`).value) || 0;
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
                        const nameI = document.getElementById(`name${i + 1}`).value;
                        const nameJ = document.getElementById(`name${j + 1}`).value;
                        resultHTML += `${nameI} le debe pagar a ${nameJ}: $${amountToPay.toFixed(2)}<br>`;
                    }
                }
            }
        }
    }

    resultElement.innerHTML = resultHTML;
}

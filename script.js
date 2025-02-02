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
    const friendNames = [];

    for (let i = 1; i <= numFriends; i++) {
        const name = document.getElementById(`name${i}`).value || `Amigo ${i}`;
        const amount = parseFloat(document.getElementById(`amount${i}`).value) || 0;
        friendAmounts.push(amount);
        friendNames.push(name);
    }

    const totalAmount = friendAmounts.reduce((total, amount) => total + amount, 0);
    if (numFriends === 0 || totalAmount === 0) return;
    const equalAmount = totalAmount / numFriends;
    
    const resultElement = document.getElementById("result");
    resultElement.style.display = "block";
    
    const owes = friendAmounts.map(amount => equalAmount - amount);
    let resultHTML = "Resumen de deudas:<br>";
    let whatsappMessage = "Resumen de deudas:\n";

    for (let i = 0; i < numFriends; i++) {
        if (owes[i] > 0) {
            for (let j = 0; j < numFriends; j++) {
                if (owes[j] < 0) {
                    const amountToPay = Math.min(Math.abs(owes[i]), Math.abs(owes[j]));
                    owes[i] -= amountToPay;
                    owes[j] += amountToPay;
                    if (amountToPay > 0) {
                        const debtText = `${friendNames[i]} debe pagarle a ${friendNames[j]}: $${amountToPay.toFixed(2)}`;
                        resultHTML += debtText + "<br>";
                        whatsappMessage += debtText + "\n";
                    }
                }
            }
        }
    }
    
    resultElement.innerHTML = resultHTML.trim();
    
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage.trim())}`;
    
    const shareButton = document.createElement("a");
    shareButton.href = whatsappLink;
    shareButton.target = "_blank";
    shareButton.innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' alt='WhatsApp' style='width:24px; height:24px; vertical-align:middle;'> Compartir";
    shareButton.style.display = "inline-block";
    shareButton.style.marginTop = "8px";
    shareButton.style.padding = "6px 10px";
    shareButton.style.backgroundColor = "#25D366";
    shareButton.style.color = "#fff";
    shareButton.style.borderRadius = "5px";
    shareButton.style.textDecoration = "none";
    shareButton.style.fontWeight = "bold";
    shareButton.style.textAlign = "center";
    shareButton.style.border = "none";
    shareButton.style.cursor = "pointer";
    
    resultElement.appendChild(shareButton);
}

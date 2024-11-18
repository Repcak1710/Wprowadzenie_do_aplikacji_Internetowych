document.getElementById("generatePassword").addEventListener("click", function () {
    const minLength = parseInt(document.getElementById("minLength").value);
    const maxLength = parseInt(document.getElementById("maxLength").value);
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeSpecial = document.getElementById("includeSpecial").checked;

    if (!minLength || !maxLength || minLength > maxLength) {
        alert("Podaj poprawne wartości dla minimalnej i maksymalnej długości hasła!");
        return;
    }

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?";
    const numbers = "0123456789";

    let charPool = lowercaseChars + numbers;
    if (includeUppercase) charPool += uppercaseChars;
    if (includeSpecial) charPool += specialChars;

    let password = "";
    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    alert("Wygenerowane hasło: " + password);
});

const charSets = {
  lower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  number: '0123456789'.split(''),
  special: '~`!@#$%^&*()_-+={[}]|:;<>?/'.split('')
};

let passwordSettings = {
    uppercase: false,
    numbers: false,
    specialChars: false,
    passwordLength: 15
};

let passwords = document.querySelector("#generate-button");

// get random value from charset object
function getRandomValue(value) {
  return value[Math.floor(Math.random() * value.length)];
}

function generatePassword() {
    let password = [];
    let availableChars = [];

    if (passwordSettings.uppercase) {
        availableChars = availableChars.concat(charSets.upper);
    }
    if (passwordSettings.numbers) {
        availableChars = availableChars.concat(charSets.number);
    }
    if (passwordSettings.specialChars) {
        availableChars = availableChars.concat(charSets.special);
    }
    if (!availableChars.length) {
        availableChars = availableChars.concat(charSets.lower);
    }

    while (password.length < passwordSettings.passwordLength) {
        password.push(getRandomValue(availableChars));
    }

    return password.join('');
}

// display generated password in container
function setPasswordToContainer(password, container) {
  container.textContent = password;
}

// copy clicked password to clipboard
function copyToClipboard(container) {
  container.addEventListener('click', () => {
    navigator.clipboard.writeText("Copy").then(() => showPrompt())
  }) 
}

// show message after copying password
function showPrompt() {
  const message = document.createElement("span");
  message.innerText = "Copied";
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 2000);
}

passwords.addEventListener("click", () => {
    let pass1 = document.querySelector(".first-password");
    let pass2 = document.querySelector(".second-password");

    // Update passwordSettings.passwordLength with the value from the input box
    passwordSettings.passwordLength = parseInt(document.querySelector('.passwordLength').value);

    pass1.textContent = generatePassword();
    pass2.textContent = generatePassword();
    copyToClipboard(pass1);
    copyToClipboard(pass2);
});

Object.keys(passwordSettings).forEach( type => {
    let checkbox = document.querySelector(`.${type}`);
    checkbox.addEventListener("change", (e) => {
        passwordSettings[type] = (e.target.checked) ? true : false;
    })
})

// update password length on number input change
document.querySelector('.passwordLength').addEventListener('change', e => {
  passwordSettings.passwordLength = e.target.value;
});

// reset password function
function resetOptions() {
    let pass1 = document.querySelector(".first-password");
    let pass2 = document.querySelector(".second-password");
    pass1.textContent = '';
    pass2.textContent = '';

    Object.keys(passwordSettings).forEach(type => {
        let checkbox = document.querySelector(`.${type}`);
        checkbox.checked = false;
    });

    let rangeInput = document.querySelector('.passwordLength');
    rangeInput.value = 15;
    passwordSettings.passwordLength = parseInt(rangeInput.value);
}

// reset password settings on refresh icon click
document.querySelector('.resetButton').addEventListener('click', resetOptions);
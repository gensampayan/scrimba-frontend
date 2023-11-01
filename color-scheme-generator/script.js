const colorSelector = document.getElementById("color-selector");
const modeSelector = document.getElementById("mode-selector");
const generateBtn = document.getElementById("generate-btn");
const palette = document.getElementById("palette");

document.addEventListener("click", (e) => {
    if (e.target.id === "generate-btn") {
        const color = colorSelector.value.replace("#", "");
        const mode = modeSelector.value.toLowerCase();
        fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=6`)
            .then((res) => res.json())
            .then((data) => {
                const colors = data.colors;

                palette.innerHTML = "";

                colors.forEach((colorData) => {
                    const hexValue = colorData.hex.value;
                    const colorName = colorData.name.value;

                    const colorItem = document.createElement("div");
                    colorItem.classList.add("color-item");

                    const img = document.createElement("img");
                    img.src = colorData.image.named;
                    img.alt = colorName;
                    img.classList.add("color-image");

                    const hexElement = document.createElement("p");
                    hexElement.textContent = hexValue;
                    hexElement.classList.add("color-hex");

                    const copyButton = document.createElement("button");
                    copyButton.textContent = "Copy";
                    copyButton.classList.add("copy-button");

                    copyButton.addEventListener("click", () => {
                        copyToClipboard(hexValue);
                        copyButton.textContent = "Copied";
                        setTimeout(() => {
                            copyButton.textContent = "Copy";
                        }, 1000);
                    });

                    colorItem.appendChild(img);
                    colorItem.appendChild(hexElement);
                    colorItem.appendChild(copyButton);

                    palette.appendChild(colorItem);
                });
            });
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Error copying text to clipboard: ', err);
        });
}
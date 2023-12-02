



const underConstruction = document.getElementById('under-construction');

const fonts = ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New']; // Array of fonts
let currentFontIndex = 0;

function changeFont() {
  const text = underConstruction.textContent.trim();
  const newText = text.replace(/[a-zA-Z]/g, letter => { // Change fonts for alphabetic characters only
    return `<span style="font-family: ${fonts[currentFontIndex]}">${letter}</span>`;
  });
  
  underConstruction.innerHTML = newText;

  currentFontIndex = (currentFontIndex + 1) % fonts.length;
}

setInterval(changeFont, 500); // Change font every 0.5 seconds (500 milliseconds)

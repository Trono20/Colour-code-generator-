function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    h = Math.round(h * 360);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

function setColor() {
    const colorInput = document.getElementById('colorInput').value || generateRandomColor();
    const newColor = /^#[0-9A-F]{6}$/i.test(colorInput) ? colorInput : generateColorCode(colorInput);
    
    document.getElementById('colorBox').style.backgroundColor = newColor;
    document.getElementById('colorCode').textContent = newColor;
    
    const rgbColor = hexToRgb(newColor);
    const hslColor = rgbToHsl(...rgbColor.match(/\d+/g).map(Number));
    
    document.getElementById('hexCode').textContent = newColor;
    document.getElementById('rgbCode').textContent = rgbColor;
    document.getElementById('hslCode').textContent = hslColor;
}

function generateColorCode(colorName) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = colorName;
    return ctx.fillStyle || '#FFFFFF';
}

document.getElementById('generateBtn').addEventListener('click', setColor);

// Initialize with a random color on load
window.onload = setColor;
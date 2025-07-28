const outputDiv = document.getElementById("outputDiv");

const originalConsoleLog = console.log;
const originalConsoleError = console.error;

document.getElementById("codeSubmit").addEventListener("click", () => {
    outputDiv.innerHTML = '';
    const inputCode = document.getElementById("editor").value;
    try{
        eval(inputCode);
    } catch(error) {
        outputDiv.innerHTML = error
    }    
});


function getHtmlElement(tagName, classes = [], text = "") {
    const e = document.createElement(tagName);
    classes.forEach(c => e.add(c));
    e.innerHTML = text;
    return e;
}

// Function to append output to the outputDiv
function appendOutput(message, type = 'log') {
    const line = document.createElement('div');
    line.textContent = message;
    if (type === 'error') {
        line.style.color = '#dc3545'; // Red for errors
        line.style.fontWeight = 'bold';
    } else if (type === 'warn') {
        line.style.color = '#ffc107'; // Yellow for warnings
    }
    outputDiv.appendChild(line);
    // Scroll to the bottom to show latest output
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

    // Redirect console.log and console.error to our outputDiv
console.log = (...args) => {
    appendOutput(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '));
    originalConsoleLog(...args); // Also log to the browser console
};

console.error = (...args) => {
    appendOutput(args.map(arg => String(arg)).join(' '), 'error');
    originalConsoleError(...args); // Also log to the browser console
};

console.warn = (...args) => {
    appendOutput(args.map(arg => String(arg)).join(' '), 'warn');
    originalConsoleLog(...args); // Also log to the browser console
};

document.getElementById("FAB-div").addEventListener("click", () => {
    document.getElementById("codeEditor").classList.toggle("show");
})


// window.addEventListener("scroll", (event) => {
//     const l = document.querySelectorAll("section");
//     [...l].forEach(s => s.style.backgroundColor = getRandomColor())
// })

// function getRandomColor() {
//     const hex = Math.floor(Math.random() * 16777215).toString(16);
//     return "#" + hex.padStart(6, '0');
// }
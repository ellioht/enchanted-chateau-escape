// Typewriter effect for text
function typewriterEffect(text) {
    const textElement = document.getElementById("textarea");
    textElement.innerHTML = "";

    let index = 0;

    type();

    function type() {
        if (index < text.length) {
            let char = text[index];

            // Remove html tags from the printed string
            if (char === "<") {
                let endIndex = text.indexOf(">", index);
                if (endIndex !== -1) {
                    char = text.slice(index, endIndex + 1);
                    index = endIndex;
                }
            }

            textElement.innerHTML += char;

            index++;
            setTimeout(type, 5);
        }
    }
}
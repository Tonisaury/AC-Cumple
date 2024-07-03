const gifPairs = [
    { speaking: "GIFs/Speak3.gif", idle: "GIFs/Idle3_R.gif" },
    { speaking: "GIFs/Speak2_R.gif", idle: "GIFs/Idle2_R.gif" },
    { speaking: "GIFs/Speak9.gif", idle: "GIFs/Idle9_R.gif" },
    { speaking: "GIFs/Speak8.gif", idle: "GIFs/Idle8_R.gif" },
    { speaking: "GIFs/Speak4.gif", idle: "GIFs/Idle4_R.gif" },
];

const finalText = "MOLTES FELICITATS!!!"; // Text to display at the end

let isAnimating = false;

const sentences = [
    "BON DIAAAA!! Avui celebrem el dia més important de l'any!!", // Flowers
    "Fa 27 anys que el cel, la lluna i les estrelles estaven més maques que mai.", // Melancholic
    "Avui és el cumple de la nostra persona preferida!!", // Singing
    "Desde Juneau et volem desitjar que siguis molt feliç. ", 
    "MOLTES FELICITATS!!!!!"
];

let currentSentence = 0;
const textSpeed = 40; // Milliseconds per character

// Preload GIFs
let loadedGifs = [];
let gifsToLoad = gifPairs.length * 2; // Each pair has a speaking and idle GIF

gifPairs.forEach(pair => {
    ['speaking', 'idle'].forEach(type => {
        const img = new Image();
        img.src = pair[type];
        img.onload = () => {
            gifsToLoad--;
            console.log(`Loaded: ${img.src}`);
            if (gifsToLoad === 0) {
                console.log('All GIFs loaded');
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('isabelle-container').style.display = 'block';
                displaySentence();
            }
        };
        img.onerror = () => {
            console.error(`Failed to load: ${img.src}`);
        };
        loadedGifs.push(img);
    });
});

function changeGifToSpeaking(index) {
    const gifPath = gifPairs[index % gifPairs.length].speaking;
    console.log(`Changing to speaking GIF: ${gifPath}`);
    document.getElementById('isabelle-img').src = gifPath;
}

function changeGifToIdle(index) {
    const gifPath = gifPairs[index % gifPairs.length].idle;
    console.log(`Changing to idle GIF: ${gifPath}`);
    document.getElementById('isabelle-img').src = gifPath;
}

function displaySentence() {
    if (currentSentence >= sentences.length || isAnimating) {
        // Hide the GIF and display the final text message
        document.getElementById('isabelle-img').style.display = 'none';
        const textBox = document.getElementById('text-box');
        textBox.innerHTML = finalText;
        textBox.style.display = 'block';
        return;
    }

    changeGifToSpeaking(currentSentence);
    isAnimating = true;
    const textBox = document.getElementById('text-box');
    textBox.innerHTML = '';
    const sentence = sentences[currentSentence];
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < sentence.length) {
            textBox.innerHTML += sentence.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            changeGifToIdle(currentSentence);
            isAnimating = false;
            currentSentence++;
        }
    }, textSpeed);
}

document.getElementById('isabelle-container').addEventListener('click', function() {
    if (!isAnimating) {
        displaySentence();
    }
});

// Initially show loading screen
document.getElementById('loading-screen').style.display = 'block';

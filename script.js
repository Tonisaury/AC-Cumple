const gifPairs = [
    { speaking: "GIFs/Speak1.gif", idle: "GIFs/Idle1_R.gif" },
    { speaking: "GIFs/Speak2_R.gif", idle: "GIFs/Idle2_R.gif" },
    { speaking: "GIFs/Speak3.gif", idle: "GIFs/Idle3_R.gif" },
    { speaking: "GIFs/Speak4.gif", idle: "GIFs/Idle4_R.gif" },
    { speaking: "GIFs/Speak5.gif", idle: "GIFs/Idle5_R.gif" },
    { speaking: "GIFs/Speak6.gif", idle: "GIFs/Idle6_R.gif" },
    { speaking: "GIFs/Speak7.gif", idle: "GIFs/Idle7_R.gif" },
    { speaking: "GIFs/Speak8.gif", idle: "GIFs/Idle8_R.gif" },
    { speaking: "GIFs/Speak9.gif", idle: "GIFs/Idle9_R.gif" }
];
const finalImagePath = "BonDia.jpg"; // Replace with the actual path to your image

let isAnimating = false;

const sentences = [
    "Bon dia!! Des de Juneau esperem que vagi super bé avui!!",
    "Avui farà un dia tranquil, sol amb una mica de núvol.",
    "És important pendre's-ho amb calma i disfrutar dels petits moments.",
    "Quina sort de poder gaudir d'un altre dia ple d'oportunitats.", 
    "Recorda que hi ha molta gent que t'estima. Estem amb tu!!",
    'Vigila de no treballar massa. També és important descansar.',
    'Et desitjo un dia meravellòs.',
    'I com diria la Taytay:',
    "But I keep cruising, can't stop, won't stop moving. It's like I got this music in my mind. Saying, 'It's gonna be alright'."
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
        document.getElementById('isabelle-img').src = finalImagePath;
        document.getElementById('text-box').style.display = 'none';
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

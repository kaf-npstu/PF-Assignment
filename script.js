const KANJI_SET = [

    { char: "空", reading: "そら / くう", meaning: "Emptiness / the void", detail: "In Buddhism, 空 represents interdependent emptiness." },

    { char: "心", reading: "こころ", meaning: "Heart / soul", detail: "Represents mind, emotion, inner being." },

    { char: "無", reading: "む", meaning: "Nothingness", detail: "Zen term for no-self, non-attachment." },

    { char: "侘", reading: "わび", meaning: "Austere simplicity", detail: "Half of wabi-sabi aesthetic." },

    { char: "孤", reading: "こ", meaning: "Solitude", detail: "Loneliness, noble isolation." },

    { char: "輪", reading: "りん", meaning: "Circle / harmony", detail: "Cycle, repetition, unity." },

    { char: "望", reading: "ぼう / のぞむ", meaning: "Hope", detail: "To long for, gaze far." },

    { char: "癒", reading: "いやし", meaning: "Healing", detail: "Emotional soothing and recovery." },

    { char: "絆", reading: "きずな", meaning: "Bonds", detail: "Connections between people." },

    { char: "夢", reading: "ゆめ", meaning: "Dream", detail: "Vision, aspiration." }

];

const kanjiDeck = [

    { kanji: "空", reading: "そら / くう", meaning: "Sky, emptiness" },

    { kanji: "心", reading: "こころ / しん", meaning: "Heart, mind" },

    { kanji: "夢", reading: "ゆめ", meaning: "Dream" },

    { kanji: "光", reading: "ひかり / こう", meaning: "Light, radiance" },

    { kanji: "森", reading: "もり / しん", meaning: "Forest" }

];

function switchMode() {
    const val = document.getElementById("modeSelector").value;

    const map = { flashcard: "flashcard-section", quiz: "quiz-section", game: "game-section" };

    document.querySelectorAll('.panel').forEach(p => p.classList.remove("active"));
    document.getElementById(map[val]).classList.add("active");

    function playJapaneseAudio(text) {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(text)}`;
        const audio = new Audio(url);
        audio.play();
    }

}

let deck = [...KANJI_SET];
let currentIndex = 0;
let okaySet = new Set();

const card = document.getElementById("card");
const charEl = document.getElementById("kanji-char");
const readEl = document.getElementById("kanji-reading");
const meanEl = document.getElementById("kanji-meaning");
const detailEl = document.getElementById("kanji-detail");
const idxEl = document.getElementById("card-index");
const okEl = document.getElementById("okay-count");

function renderCard() {
    let k = deck[currentIndex];
    charEl.innerText = k.char;
    readEl.innerText = k.reading;
    meanEl.innerText = k.meaning;
    detailEl.innerHTML = "<strong>Deeper notes:</strong> " + k.detail;
    idxEl.innerText = `${currentIndex + 1} / ${deck.length}`;
    okEl.innerText = `Okay: ${okaySet.size}`;
    card.classList.remove("is-flipped");

    // clear examples & audio status
    document.getElementById("examples-box").classList.add("hidden");
    document.getElementById("examples-box").innerHTML = "";
    document.getElementById("audio-status").innerText = "";
}

document.getElementById("next-card").onclick = () => {
    currentIndex = (currentIndex + 1) % deck.length;
    renderCard();
};
document.getElementById("prev-card").onclick = () => {
    currentIndex = (currentIndex - 1 + deck.length) % deck.length;
    renderCard();
};
document.getElementById("shuffle-cards").onclick = () => {
    deck.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    renderCard();
};
document.getElementById("mark-okay").onclick = () => {
    okaySet.add(deck[currentIndex].char);
    okEl.innerText = `Okay: ${okaySet.size}`;
};

card.onclick = () => card.classList.toggle("is-flipped");

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") document.getElementById("next-card").click();
    if (e.key === "ArrowLeft") document.getElementById("prev-card").click();
    if (e.key === " ") {
        e.preventDefault();
        card.classList.toggle("is-flipped");
    }
});

renderCard();

async function fetchJishoExamples(kanji) {
    const box = document.getElementById("examples-box");
    box.classList.remove("hidden");
    box.innerHTML = "Loading examples…";

    try {
        const res = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(kanji)}`);
        if (!res.ok) throw new Error("Jisho API error");
        const json = await res.json();

        if (!json.data || json.data.length === 0) {
            box.innerHTML = "<em>No examples found on Jisho.</em>";
            return;
        }

        const entries = json.data.slice(0, 6);
        box.innerHTML = "";
        entries.forEach(entry => {
            const word = entry.japanese?.[0]?.word || entry.japanese?.[0]?.reading || "(no word)";
            const reading = entry.japanese?.[0]?.reading ? ` (${entry.japanese[0].reading})` : "";
            const defs = (entry.senses && entry.senses[0] && entry.senses[0].english_definitions) ? entry.senses[0].english_definitions.join("; ") : "";
            const el = document.createElement("div");
            el.style.marginBottom = "8px";
            el.innerHTML = `<strong>${word}</strong>${reading} — <span style="color:var(--muted)">${defs}</span>`;
            box.appendChild(el);
        });

    } catch (err) {
        console.error(err);
        box.innerHTML = "<em>Could not load examples (network or CORS issue).</em>";
    }
}

const ttsAudio = document.getElementById("tts-audio");

function getPreferredReading(readingText) {

    const parts = readingText.split("/").map(s => s.trim());

    for (const p of parts) {
        if (/[ぁ-ん]/u.test(p)) return p;
    }
    return parts[0] || readingText;
}

function playTTS(textToSpeak) {
    const status = document.getElementById("audio-status");
    status.innerText = "Preparing audio…";

    const base = "https://translate.google.com/translate_tts";
    const params = new URLSearchParams({
        ie: "UTF-8",
        q: textToSpeak,
        tl: "ja",
        client: "tw-ob"
    });
    const url = `${base}?${params.toString()}`;

    ttsAudio.pause();
    ttsAudio.src = url;
    ttsAudio.crossOrigin = "anonymous";

    ttsAudio.play().then(() => {
        status.innerText = "Playing audio…";
    }).catch(err => {
        console.warn("TTS play error:", err);
        status.innerText = "Audio blocked / unavailable in this browser.";
    });

    ttsAudio.onended = () => {
        status.innerText = "";
    };
}

document.getElementById("show-examples").addEventListener("click", () => {
    const kanji = deck[currentIndex].char;
    fetchJishoExamples(kanji);
});

document.getElementById("play-audio").addEventListener("click", () => {
    const readingText = deck[currentIndex].reading;
    const prefer = getPreferredReading(readingText);

    const textToSpeak = prefer.split(" ")[0];
    playTTS(textToSpeak);
});


function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }

let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;

const quizArea = document.getElementById("quiz-area");
const qs = {
    num: document.getElementById("q-num"),
    total: document.getElementById("q-total"),
    score: document.getElementById("q-score"),
    kanji: document.getElementById("q-kanji"),
    clues: document.getElementById("q-clues"),
    choices: document.getElementById("q-choices"),
    fb: document.getElementById("q-feedback"),
    next: document.getElementById("q-next"),
    end: document.getElementById("q-end"),
    summary: document.getElementById("quiz-summary"),
    retry: document.getElementById("quiz-retry"),
    sumScore: document.getElementById("summary-score")
};

function buildQuiz(size) {
    let pool = shuffle([...KANJI_SET]);
    return pool.slice(0, size).map(item => {
        let wrong = shuffle(KANJI_SET.filter(k => k.char !== item.char)).slice(0, 3).map(k => k.meaning);
        let choices = shuffle([item.meaning, ...wrong]);
        return { item, choices, answer: item.meaning };
    });
}

function renderQuestion() {
    let q = quizQuestions[quizIndex];
    qs.num.innerText = quizIndex + 1;
    qs.total.innerText = quizQuestions.length;
    qs.score.innerText = quizScore;
    qs.kanji.innerText = q.item.char;
    qs.clues.innerText = "Reading: " + q.item.reading;

    qs.choices.innerHTML = "";
    qs.fb.innerText = "";
    qs.next.disabled = true;

    q.choices.forEach(choice => {
        let btn = document.createElement("button");
        btn.className = "choice";
        btn.innerText = choice;
        btn.onclick = () => handleChoice(btn, choice, q.answer);
        qs.choices.appendChild(btn);
    });
}

function handleChoice(btn, chosen, correct) {
    Array.from(qs.choices.children).forEach(b => b.disabled = true);

    if (chosen === correct) {
        btn.classList.add("correct");
        qs.fb.innerText = "Correct! +10";
        quizScore += 10;
    } else {
        btn.classList.add("wrong");
        qs.fb.innerText = "Wrong! Correct: " + correct;
        quizScore = Math.max(0, quizScore - 3);
    }

    qs.score.innerText = quizScore;
    qs.next.disabled = false;
}

document.getElementById("start-quiz").onclick = () => {
    let size = parseInt(document.getElementById("quiz-size").value);
    quizQuestions = buildQuiz(size);
    quizIndex = 0;
    quizScore = 0;

    quizArea.classList.remove("hidden");
    qs.summary.classList.add("hidden");

    renderQuestion();
};
qs.next.onclick = () => {
    quizIndex++;
    if (quizIndex >= quizQuestions.length) finishQuiz();
    else renderQuestion();
};
qs.end.onclick = finishQuiz;

function finishQuiz() {
    quizArea.classList.add("hidden");
    qs.summary.classList.remove("hidden");
    qs.sumScore.innerText = quizScore;
}
qs.retry.onclick = () => {
    qs.summary.classList.add("hidden");
    quizArea.classList.remove("hidden");
    quizIndex = 0; quizScore = 0;
    renderQuestion();
};

const gameKanji = document.getElementById("game-kanji");
const gameReading = document.getElementById("game-reading");
const gameNew = document.getElementById("game-new");
const gameAudio = document.getElementById("game-audio");

function loadGameKanji() {
    const item = kanjiDeck[Math.floor(Math.random() * kanjiDeck.length)];
    gameKanji.textContent = item.kanji;
    gameReading.textContent = item.reading;

    gameAudio.dataset.reading = item.reading.split("/")[0].trim();
}
gameAudio.addEventListener("click", () => {
    playJapaneseAudio(gameAudio.dataset.reading);
});

gameNew.addEventListener("click", loadGameKanji);

loadGameKanji();

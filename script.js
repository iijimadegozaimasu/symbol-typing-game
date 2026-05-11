// 記号とその名称のセット（全28種類）
const symbols = [
    { char: "!", name: "エクスクラメーション（感嘆符）" },
    { char: "@", name: "アットマーク" },
    { char: "#", name: "ハッシュ（シャープ）" },
    { char: "$", name: "ドル記号" },
    { char: "%", name: "パーセント" },
    { char: "^", name: "キャレット（脱字記号）" },
    { char: "&", name: "アンパサンド（アンド）" },
    { char: "*", name: "アスタリスク（星印）" },
    { char: "()", name: "小括弧（丸括弧）" },
    { char: "-", name: "ハイフン（マイナス）" },
    { char: "=", name: "イコール" },
    { char: "[]", name: "角括弧（大括弧）" },
    { char: "\\", name: "バックスラッシュ" },
    { char: ";", name: "セミコロン" },
    { char: "'", name: "シングルクォーテーション" },
    { char: ",", name: "カンマ" },
    { char: ".", name: "ピリオド" },
    { char: "/", name: "スラッシュ" },
    { char: "_", name: "アンダースコア" },
    { char: "+", name: "プラス" },
    { char: "{}", name: "波括弧（中括弧）" },
    { char: "|", name: "バーティカルバー（縦線）" },
    { char: ":", name: "コロン" },
    { char: "\"", name: "ダブルクォーテーション" },
    { char: "<>", name: "不等号（山括弧）" },
    { char: "?", name: "クエスチョン（疑問符）" },
    { char: "`", name: "バッククォート" },
    { char: "~", name: "チルダ" }
];

// 配列をシャッフルする関数
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let questions = [];
let currentIndex = 0;
let startTime = 0;
let timerInterval;

const targetEl = document.getElementById("target");
const nameEl = document.getElementById("symbol-name");
const inputEl = document.getElementById("input-box");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("start-btn");
const timerEl = document.getElementById("timer");

startBtn.addEventListener("click", startGame);

function startGame() {
    questions = shuffle([...symbols]); // 問題をランダム化
    currentIndex = 0;
    startBtn.style.display = "none";
    inputEl.disabled = false;
    inputEl.value = "";
    inputEl.focus();
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);
    showNextQuestion();
}

function updateTimer() {
    const now = Date.now();
    const diff = ((now - startTime) / 1000).toFixed(1);
    timerEl.textContent = `${diff} 秒`;
}

function showNextQuestion() {
    if (currentIndex < questions.length) {
        targetEl.textContent = questions[currentIndex].char;
        nameEl.textContent = questions[currentIndex].name;
        messageEl.textContent = `第 ${currentIndex + 1} 問 / 全 ${questions.length} 問`;
    } else {
        endGame();
    }
}

// 全角記号・英数字を半角に変換する関数
function toHalfWidth(str) {
    return str.replace(/[！-～]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    }).replace(/　/g, " ");
}

// 入力されるたびにチェック
inputEl.addEventListener("input", () => {
    // 入力された値を即座に半角に変換して反映する
    inputEl.value = toHalfWidth(inputEl.value);
    
    if (inputEl.value === questions[currentIndex].char) {
        currentIndex++;
        inputEl.value = "";
        showNextQuestion();
    }
});

function endGame() {
    clearInterval(timerInterval);
    const finalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    nameEl.textContent = "";
    targetEl.textContent = "クリア！";
    messageEl.textContent = `お疲れ様でした！あなたの記録は ${finalTime} 秒です。`;
    inputEl.disabled = true;
    startBtn.style.display = "inline-block";
    startBtn.textContent = "もう一度プレイ";
}


document.addEventListener("DOMContentLoaded", () => {
  const memoInput = document.getElementById("memoInput");
  const rollButton = document.getElementById("rollButton");
  const diceSides = document.getElementById("diceSides");
  const diceCount = document.getElementById("diceCount");
  const drawCardButton = document.getElementById("drawCardButton");
  const resetDeckButton = document.getElementById("resetDeckButton");
  const includeJokerCheckbox = document.getElementById("includeJoker");
  const deckStatus = document.getElementById("deckStatus");
  const clearButton = document.getElementById("clearButton");
const downloadButton = document.getElementById("downloadButton");
const titleInput = document.getElementById("titleInput");
        
    const prefix = "Log"; // ログデータのキー接頭辞
const currentLogKey = localStorage.getItem("currentLogKey"); // 現在のログキー
const memoContent = document.getElementById("memoContent");
const saveButton = document.getElementById("saveMemo");
const deleteButton = document.getElementById("deleteMemo");

  let deck = [];
  const suits = ["ハート", "ダイヤ", "スペード", "クラブ"];
  const values = [
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
  ];

  // 山札を初期化する関数
  function initializeDeck(includeJoker) {
    deck = [];
    suits.forEach((suit) => {
      values.forEach((value) => {
        deck.push(`${suit}の${value}`);
      });
    });
    if (includeJoker) {
      deck.push("ジョーカー1", "ジョーカー2");
    }
    updateDeckStatus();
  }

  // 山札の状態を更新する関数
  function updateDeckStatus() {
    deckStatus.textContent = `山札にカードが${deck.length}枚あります。`;
  }

  // 山札からカードを引く関数
  function drawCard() {
    if (deck.length === 0) {
      alert("山札が空です！リセットしてください。");
      return;
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck.splice(randomIndex, 1)[0];
    appendToMemoInput(`引いたカード: ${drawnCard}`);
    updateDeckStatus();
  }

  // トランプ引きボタンのイベント
  drawCardButton.addEventListener("click", drawCard);

  // 山札リセットボタンのイベント
  resetDeckButton.addEventListener("click", () => {
    if (confirm("本当にリセットしますか？")) { // 確認ダイアログを表示
      const includeJoker = includeJokerCheckbox.checked;
      initializeDeck(includeJoker);
      appendToMemoInput("山札をリセットしました。");
    }
  }
  );

  // 初期化
  initializeDeck(includeJokerCheckbox.checked);
  // ダイスロールボタンのイベント
  rollButton.addEventListener("click", () => {
    const sides = parseInt(diceSides.value);
    const count = parseInt(diceCount.value);

    if (isNaN(sides) || sides < 2) {
      alert("ダイスの面数は2以上を入力してください！");
      return;
    }

    if (isNaN(count) || count < 1) {
      alert("ダイスの個数は1以上を入力してください！");
      return;
    }

    const results = rollDice(sides, count);
    const total = results.reduce((sum, num) => sum + num, 0);
    const resultText = `${sides}面ダイスを${count}個振った結果: ${results.join(", ")}  (合計： ${total})`;
    appendToMemoInput(resultText);
  });

  // ダイスを振る関数
  function rollDice(sides, count) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(Math.floor(Math.random() * sides) + 1);
    }
    return results;
  }

  // メモ入力エリアに結果を追記する関数
  function appendToMemoInput(text) {
    if (memoInput.value.trim()) {
      memoInput.value += `\n${text}\n`;
    } else {
      memoInput.value = `${text}\n`;
    }
  }

    // メモクリアボタンのイベント
    clearButton.addEventListener("click", () => {
    if (confirm("メモ内容をクリアしますか？")) { // 確認ダイアログを表示
        memoInput.value = ""; // メモ入力エリアをクリア
    }
    });

    // メモダウンロードボタンのイベント
    downloadButton.addEventListener("click", () => {
    const memoContent = memoInput.value.trim();
    const title = titleInput.value.trim();

    if (!memoContent) {
        alert("メモ内容が空です！");
        return;
    }

    // 現在の日時を取得してフォーマット
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
    const timestamp = `${formattedDate}_${formattedTime}`;

    // ファイル名を作成
    const fileName = (title || "Untitled") + "_" + timestamp + ".txt";

    // Blobを作成してURLを生成
    const blob = new Blob([memoContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // ダウンロードリンクを作成してクリック
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    // 使用後にURLを解放
    URL.revokeObjectURL(url);
    });


// ローカルストレージのキーを取得し、次の「LogXX」キーを生成
function getNextLogKey() {
  const allKeys = Object.keys(localStorage).filter((key) => key.startsWith(prefix));
  const maxNumber = allKeys
    .map((key) => parseInt(key.replace(prefix, ""), 10)) // 「LogXX」から番号部分を取得
    .filter((num) => !isNaN(num))
    .reduce((max, num) => Math.max(max, num), 0); // 最大番号を取得
  const nextNumber = maxNumber + 1;
  return `${prefix}${String(nextNumber).padStart(2, "0")}`; // 2桁ゼロ埋め
}

// 削除ボタンの処理
if (currentLogKey) {
  deleteButton.style.display = "block";
  deleteButton.addEventListener("click", () => {
    if (confirm("このメモを削除しますか？")) {
      localStorage.removeItem(currentLogKey);
      alert("メモが削除されました！");
      window.location.href = "index.html";
    }
  });

  // 編集画面にデータをロード
  const memoData = JSON.parse(localStorage.getItem(currentLogKey));
  memoContent.value = memoData.content;
  }


  
});
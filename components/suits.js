document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("resetDecks").addEventListener("click", () => resetDecks(true));

  resetDecks(); // 初期化
});
  const resetDeckButton = document.getElementById("resetDecks");
// 各スートの山札を初期化
const suits = {
  spades: [],
  hearts: [],
  diamonds: [],
  clubs: [],
};

// 山札をリセットする関数
function resetDecks(isButtonClick = false) {
  Object.keys(suits).forEach((suit) => {
    suits[suit] = Array.from({ length: 13 }, (_, i) => `${suit}-${i + 1}`);
  });
  updateRemainingCounts();

  // ログのメッセージを変える
  if (isButtonClick) {
    appendToMemoInput("スートごとの山札をリセットしました。");
  } 
}

// 山札からカードを引く関数
function drawCard(suit) {
  if (suits[suit].length === 0) {
    alert(`${capitalize(suit)} の山札は空です！`);
    return;
  }

  // ランダムなインデックスを取得
  const randomIndex = Math.floor(Math.random() * suits[suit].length);
  
  // ランダムなカードを取得し、山札から削除
  const card = suits[suit].splice(randomIndex, 1)[0];

  // 結果を表示
  appendToMemoInput(formatCard(card)); 

  // 残り枚数を更新
  updateRemainingCounts();
}

// 残り枚数を更新する関数
function updateRemainingCounts() {
  Object.keys(suits).forEach((suit) => {
    const count = suits[suit].length;
    document.getElementById(`${suit}Remaining`).textContent = `残り枚数: ${count}`;
  });
}

// カードの表示を整形する関数
function formatCard(card) {
  const [suit, value] = card.split("-");
  const suitSymbols = {
    spades: "♠",
    hearts: "♡",
    diamonds: "♢",
    clubs: "♣",
  };
  const faceCards = { "1": "A", "11": "J", "12": "Q", "13": "K" };
  const displayValue = faceCards[value] || value;
  return `引いたカード:${suitSymbols[suit]}の${displayValue}`;
}

// スート名を大文字で始める関数
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  // メモ入力エリアに結果を追記する関数
  function appendToMemoInput(text) {
    if (memoInput.value.trim()) {
      memoInput.value += `\n${text}\n`;
    } else {
      memoInput.value = `${text}\n`;
    }
  }
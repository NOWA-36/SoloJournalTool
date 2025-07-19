// This is a JavaScript file

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      // すべてのタブボタンを非アクティブにする
      tabButtons.forEach(btn => btn.classList.remove("active"));

      // クリックされたタブをアクティブにする
      button.classList.add("active");

      // すべてのコンテンツを非表示にする
      tabContents.forEach(content => content.classList.remove("active"));

      // 該当するコンテンツを表示
      document.getElementById(targetTab).classList.add("active");
    });
  });
});
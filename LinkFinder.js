
// フォルダ階層データ
const data = {
  "全体": {
    "部署": {
      "経理": {url:"https://google.com"},
      "営業": {url:"https://ai-kenkyujo.com/programming/language/javascript/vscode/.com"}
    },
  },
  "全体2": {
    "スポーツ": {
      "陸上": {url:"https://google.com"},
      "野球": {url:"https://ai-kenkyujo.com/programming/language/javascript/vscode/.com"}
    }
  }
};

const finder = document.getElementById("finder");

// カラムを描画する関数
function renderColumn(levelData, level) {

  const col = document.createElement("div");
  col.className = "column";

  const header = document.createElement("div");
  header.className = "column-header";
  header.textContent = `第${level}カラム`;
  col.appendChild(header);

  Object.keys(levelData).forEach(key => {
    const item = document.createElement("div");
    item.className = "item";
    item.textContent = key;

    item.onclick = () => {
      // クリックされた項目を選択状態にする
      [...col.querySelectorAll(".item")].forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");

      // URL がある場合は新しいタブで開く
      if (levelData[key].url) {
        window.open(levelData[key].url, "_blank");
        return;
      }

      const nextLevel = level + 1;
      const hasNextColumn = finder.children.length >= nextLevel;

      if (hasNextColumn) {
        // ★ 第 n+1 カラムがある → まず全部消す
        while (finder.children.length >= nextLevel) {
          finder.removeChild(finder.lastChild);
        }

        // ★ そして「別のアイテム」をクリックした場合は再描画する
        if (typeof levelData[key] === "object" && Object.keys(levelData[key]).length > 0) {
          renderColumn(levelData[key], nextLevel);
        }

      } else {
        // ★ 第 n+1 カラムがない → 普通に表示
        if (typeof levelData[key] === "object" && Object.keys(levelData[key]).length > 0) {
          renderColumn(levelData[key], nextLevel);
        }
      }
    };

    col.appendChild(item);
  });

  finder.appendChild(col);
}

// 初期表示
renderColumn(data, 1);
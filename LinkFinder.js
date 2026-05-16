// フォルダ階層データ
const data = {
  "全体": {
    "部署": {
      "3.3. 予算・見通し": {url:"https://google.com"},
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

// カラム名マップ
const columnNames = ["業務", "種別", "リンク"];

// カラムを描画する関数
function renderColumn(levelData, level) {
  const col = document.createElement("div");
  col.className = "column";

  const header = document.createElement("div");
  header.className = "column-header";
  header.textContent = columnNames[level - 1] || `第${level}カラム`;
  col.appendChild(header);

  Object.keys(levelData).forEach(key => {
    const item = document.createElement("div");
    item.className = "item";
    item.textContent = key;

    item.onclick = () => {
      [...col.querySelectorAll(".item")].forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");

      if (levelData[key].url) {
        window.open(levelData[key].url, "_blank");
        return;
      }

      const nextLevel = level + 1;
      const hasNextColumn = finder.children.length >= nextLevel;

      while (finder.children.length >= nextLevel) {
        finder.removeChild(finder.lastChild);
      }

      if (typeof levelData[key] === "object" && Object.keys(levelData[key]).length > 0) {
        renderColumn(levelData[key], nextLevel);
      }
    };

    col.appendChild(item);
  });

  finder.appendChild(col);
}

// 初期表示
renderColumn(data, 1);

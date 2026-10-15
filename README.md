# 資訊檢索大師的養成：菜鳥先飛班

由 Google Sites 內嵌教材整理而成的獨立靜態網站。每次載入從十個情境中隨機顯示一題，完成解析需求、擴展詞彙與檢索句評分；達到 80 分即完成練習，並可按「挑戰下一題」隨機換題。重新整理也會抽到與上一題不同的任務。

## 網站

https://hrd819.github.io/information-retrieval-practice/

## 維護

- `src/quests.js`：題目、提示與分數，每題總分 100。
- `src/index.html`、`src/styles.css`：教學介面與響應式版面。
- `src/app.js`：練習流程；`src/assignment.js`：訪客題目分配；`src/scoring.js`：語法規則。
- `tests/scoring.test.js`：十題正確／空白作答及評分回歸檢查。

使用 Node.js 24，無第三方安裝依賴：

```sh
npm run ci
```

產物位於 `dist/`，不要直接修改產物。可用任意本機 HTTP 伺服器預覽此目錄；ES modules 需要 HTTP。

推送 `main` 後自動檢查。發布時到 GitHub Actions 手動執行 **Check and publish practice**；通過檢查後，才部署 `dist/` 到 GitHub Pages。

## 原始教材與行為

原始 HTML 保存在本機 `original/`，未納入公開儲存庫。原題的時間用語屬情境設定。已修正原始教材「參差-齊」錯字、重複詞彙計數、回上一步未更新詞彙、OR 誤判與通關狀態未重置等問題。X/Twitter 題接受任一指定平台；鄰近檢索接受正整數距離。

分數代表本題語法規則的符合程度，不等於實際搜尋品質。Google 的即時檢索結果不由本網站驗證；搜尋語法依平台而異。參考 [Google 官方搜尋說明](https://support.google.com/websearch/answer/2466433?hl=zh-Hant)。

頁面不儲存作答紀錄、沒有第三方分析工具，也不載入 CDN 腳本或外部字型。使用者點選 Google 驗證時才開啟含檢索句的搜尋頁。本網站設定 `noindex, nofollow`，但 GitHub Pages 與原始碼仍為公開，並非存取控制。

上一題的題號暫存在該分頁的 `sessionStorage`，供重新整理時排除；關閉分頁後不保留。純靜態網站的隨機分配不保證不同訪客一定拿到不同題，也不限制每題分配人數。

部署流程參考 [GitHub Pages 官方說明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

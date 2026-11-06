# NotFound404 工作室網站
依 Figma V2 製作的繁體中文網站，本機可操作預覽。使用 MingMing AI Product Engineering Loop v1.1.3；2026-11-06 再次查核 GitHub latest release，仍為 v1.1.3。
## 啟動
需要 Node.js 22 或更新版本，無須安裝 npm 套件。在專案根目錄執行：
```powershell
node website/server.mjs
```
開啟 http://127.0.0.1:4174/ 。結束時 Ctrl+C。也可在 Windows 執行 website/start-preview.cmd。
## 內容
桌機與手機響應式首頁、四項服務、三個概念案例詳情，以及只在本機產生摘要的諮詢表單。沒有資料傳送、儲存、分析追蹤或後端。網站目前使用 noindex。
## 驗證與接續
操作及測試見 [網站說明](website/README.md)，設計見 [實作設計](docs/website-design.md)。唯一狀態在 tasks/current/state.json，驗證紀錄在 tasks/current/reports/node-001/。
尚未 commit、push 或部署。案例與聯絡方式待正式核實；不可把預覽當正式上線網站。上游 tasks/validation 與 docs/releases 仍只代表工作流測試。


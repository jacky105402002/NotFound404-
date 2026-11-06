# NotFound404 V2 本機預覽
## 開啟
從專案根目錄執行 `node website/server.mjs`，或雙擊本資料夾的 `start-preview.cmd`，然後開啟 http://127.0.0.1:4174/ 。Ctrl+C 停止伺服器。
Port 已使用時，PowerShell 可先設 `$env:PORT = '4175'` 再啟動，瀏覽對應位址。不要直接以 file:// 開啟 HTML：ES modules 需要 HTTP。
## 實際功能
- 錨點導覽、目前區段標示、手機固定底部導覽。
- 三個概念案例詳情；原生 dialog 支援 Escape 與焦點返回。
- 稱呼及 Email 驗證、服務複選、需求摘要與返回修改。
- 表單無資料傳送或持久儲存；重新整理即清空。停用 JavaScript 時不可送出。
## 檔案
public/index.html 是語意結構與文案；styles.css 是 V2 樣式；app.js 是互動；validation.mjs 是共用驗證。server.mjs 只服務 public/。
public/assets 是本機設計素材與字體；asset-manifest.json 保存 Figma 原始 URL 與呼叫對應。暫時 URL 僅供來源追蹤，不作 runtime 來源。font-sources/ 保留字體供應 CSS；licenses/ 保留官方字體及圖示授權。
download-assets.ps1 可在 Figma URL 有效時重取素材；過期後需重新呼叫 Figma MCP，不可用失效網址當 runtime。download-fonts.ps1 由 Google Fonts 重新產生本機字體子集。修改文案加入新字時可重生字體，其他字有系統 fallback。
## 測試
```powershell
node --test website/tests/*.test.mjs
playwright-cli -s=studio open http://127.0.0.1:4174/ --browser=msedge
powershell -NoProfile -File website/tests/run-browser-tests.ps1
```
測試使用已安裝 Playwright CLI 0.1.18 與 Microsoft Edge，產品沒有 npm 依賴。browser-check.js 的測試網址為 4174；若改測試埠需同步修改。
瀏覽器證據涵蓋 320、390、700、701、768、950、1024、1280、1440、1920 寬度、導覽、預覽表單、Escape、焦點與無外送。
qa/ 存畫面及測試輸出，正式證據見 ../tasks/current/reports/node-001/（最新輪次以 state.json 為準）。不是 Safari／Firefox 認證，也不是完整 WCAG 稽核。
## 有意保留的限制
使用者核准的是預覽表單，因此沒有送出 API。聯絡資料顯示待開放，案例明示概念示範。桌機 Figma V2 案例槽是漸層，手機稿才有封面；實作按視口保留，點開詳情可檢視原始封面。
上線前另確認案例／品牌素材使用權、真實聯絡方式、隱私及服務條款、表單服務與主機網域，再移除 noindex。



# NotFound404 V2 發布紀錄

- 版本：0.1.0；產品來源 commit `1af3c38e3b0cc22f0c0698c1795f332dc5031384`。
- GitHub：https://github.com/jacky105402002/NotFound404- ，分支 `main`。
- Railway project：`9899cbb7-2823-498a-8349-40dda3fca521`（elegant-energy）；production；service `f97eb8a0-d736-4831-849d-62c3d82a7787`。
- 公開網站：https://notfound404-production.up.railway.app/
- 操作授權：使用者明確要求推送指定 GitHub 並透過 Railway 對外啟動。另允許只新增該庫的 App 存取權；實際檢查既有 Railway App 已為 All repositories，未修改其權限。
- 發布結果：2026-11-06 15:05 UTC 查核，Railway deployment `715f9346-2c26-4b6d-94d7-0dc71d933f33` 顯示 Active / Deployment successful，服務 Online。
- 建置：根目錄 Dockerfile 自動偵測；Node 24 Alpine；production.mjs；0.0.0.0 與 Railway PORT；公開網域 target port 8080；健康檢查 `/` 已儲存套用。
- 自動部署：Source Repo 正確，production 連接 main，顯示 Auto deploys when pushed to GitHub。
- DoD：node-001 attempt-03 與 node-002 attempt-02 的有效測試、self-review、文件證據；以 state.json 為準。未宣稱獨立 review。
- 外部 smoke：`node tasks/current/reports/node-002/attempt-02/live-smoke.mjs`，9 項通過。7 個公開檔案回應 HTTP 200 且逐 byte 與原始碼一致（含 HTML/JS/CSS/字體/圖片）；工作流檔與 .env 回應 404。
- 線上瀏覽器驗證：首頁呈現正常；CyberPulse 詳情可開關；測試資料 test@example.com 可生成需求摘要；重新整理表單清空。截圖見 reports/node-002/attempt-02/live-homepage.png、railway-live.png。
- Migration／資料恢復不適用：沒有資料庫、資料收集或持久儲存。
- 回復條件：新部署健康檢查失敗、首頁或關鍵素材無法讀取時，透過 Railway Deployments 回復上一個成功部署，或在 GitHub revert 有問題的產品 commit；沒有執行回復，因本次驗證通過。
- 已知限制：依需求保留 PREVIEW 與 noindex；表單不寄送／儲存；聯絡管道尚未開放，作品仍是概念示範。上線不代表正式接單或 SEO 索引已開放。
- Railway 當時有平台外部網路事件橫幅，但本次網站 HTTPS 與素材驗證成功。未升級付費方案。
- 成效觀察：僅完成上線時點的可用性驗證；沒有持續監控或營運成效承諾。後續若需收件，須提供聯絡管道與表單服務設定。

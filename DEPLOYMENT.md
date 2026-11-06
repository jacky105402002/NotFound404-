# GitHub / Railway 發布
2026-11-06 使用者已授權將網站推至 https://github.com/jacky105402002/NotFound404- 的 main 分支，並連動 Railway 對外提供預覽網站。這個授權更新先前 README/AGENTS 的「尚未授權部署」歷史限制。發布實際狀態以 tasks/current/state.json 的 release 與 release.json 為準。
## 執行方式
Railway 使用 repository 根目錄的 Dockerfile，啟動 `node production.mjs`。獨立入口採 Railway 注入的 PORT，預設監聽 0.0.0.0；原本 `node website/server.mjs` 維持只供本機的 127.0.0.1:4174。
建置 image 僅含 production/server、public 與字體授權，不包含工作流、測試、報告或 Git metadata。無 npm install 或 build 步驟。
Railway source 設為指定 repo/main，啟用自動部署；healthcheck 使用 /，public networking 使用 Railway 網域。
## 驗證與限制
執行 `node --test website/tests/*.test.mjs`。發布後驗證 HTTPS、首頁、CSS/module/圖片與工作流檔案 404。
公開版本仍是「預覽表單」：不會發送、持久化資料或接上真實聯絡管道。保留 noindex 及概念案例標示；公開不代表正式營運文案已核實。
## 回復
Railway Deployments 對上一個成功 deployment 執行 rollback，或 git revert 對應功能提交後 push main。首次發布若未通過，修正後重新部署；不 force push、不改動本機已啟動的伺服器。
## 版本與證據
保留 .gitattributes 的原始 bytes 設定，避免 Git 換行轉換令 MingMing SHA256 證據失效。Source credential 由既有 Git credential manager 處理，不寫入 repository。
部署配置採 Dockerfile 與 Railway 服務設定；本次查閱官方文件顯示舊 railway.json Config as Code 即將停止適用，未新增該舊格式。
參考：https://docs.railway.com/deployments/start-command 、https://docs.railway.com/networking/troubleshooting/application-failed-to-respond 。


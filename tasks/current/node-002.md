# Node 002 — GitHub 與 Railway 發布
## Goal / AC IDs
AC-DEPLOY-01：完成通過測試的 Railway production entry、Docker build 定義與 GitHub main 發布準備。實際 GitHub/Railway 發布及公開 HTTPS 驗證另由 feature.release 追蹤，不以 Node done 代替發布成功。
## Scope / Inputs
使用者 2026-11-06 明確授權 push 到 jacky105402002/NotFound404-，並在 Railway 對外啟動。本次授權取代先前禁止發布範圍；原 node-001 是本機預覽歷史，不重新設計 UI。
依賴 node-001 完成驗證。網站保留預覽表單、不傳送資料與案例示範標示。
## Allowed Files
Dockerfile、.dockerignore、.gitattributes、.gitignore、DEPLOYMENT.md、website/production.mjs、website/tests/production.test.mjs、tasks/current/state.json、tasks/current/node-002.md、tasks/current/release*、tasks/current/reports/node-002/。
## Forbidden Changes
不擴充表單後端、不移除原始資料、不 force push、不升級付費方案或加入付費附加服務。
## Tasks
建立獨立 production entry → 驗證 PORT／host、回應與靜態隔離 → 審查來源 → Git initial commit/main push → Railway GitHub source/main、Dockerfile、healthcheck、public domain → HTTPS smoke。
## Tests / Review
node --test website/tests/*.test.mjs；檢視 Docker image 只含 server/public/license；部署成功後 HTTP status、首頁品牌、CSS/module/assets、表單無傳送及工作流路徑 404。保留已完成 UI 測試，無 UI 改動不重跑視覺矩陣。
## Docs / Handoff
DEPLOYMENT.md 說明啟動與回復；release.json 與 reports 記實際部署、來源 SHA、公開網址。變更後以 rollback 上一 deployment 或 revert commit 恢復；首次發布若失敗只解除新服務，不影響本機。


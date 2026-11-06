# Node 001 — 可操作的 V2 網站預覽
## Goal
交付可在本機啟動、經視覺與行為驗證的 NotFound404 單頁網站。
## AC IDs
AC-WEB-01、AC-WEB-02、AC-WEB-03、AC-WEB-04、AC-WEB-05、AC-WEB-06。
## Scope
頁面、樣式、素材、導覽、案例詳情、預覽表單、本機伺服器、測試與操作文件。
## Out of Scope
真實資料發送、後端、持久化、部署、對外宣傳驗證、修改 Figma。
## Inputs
tasks/current/feature-spec.md、docs/website-design.md、docs/design-source/v2-desktop-reference.txt、docs/design-source/v2-mobile-reference.txt。
## Allowed Files
website/、docs/、tasks/current/、README.md、AGENTS.md、.gitignore、ai-workflow/tool-map.md。
## Forbidden Changes
工作流引擎與上游 tests 不作產品修改；不得 commit/push/deploy；不得填送真實資料。
## Tasks
建立本機素材與字體 → 實作 UI 及預覽流程 → 實測與修正 → self-review → 文件及唯一狀態。
## Tests
node --test website/tests/*.test.mjs；playwright-cli 透過 website/tests/browser-check.js 測試真瀏覽器；桌機／手機 screenshot 人工覆核；node scripts/validate-workflow.mjs --require-active。
## Review
驗收覆蓋、可及性、RWD、無傳輸、原始素材對照、真實性文案、靜態服務範圍。
## Docs
README.md、website/README.md、docs/figma-handoff.md、docs/intake.md、tasks/current/handoff.md。
## Output / Handoff
tasks/current/reports/node-001/attempt-XX/ 保存測試、review、docs、完成報告及 hash 證據。


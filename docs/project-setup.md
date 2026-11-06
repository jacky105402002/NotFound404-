# 專案準備紀錄

日期：2026-11-06。情境：Web 開發。工作流：使用者指定最新版本，已核對 MingMing v1.1.3。

準備結果：沿用既有工作室專案；工作流與交接文件已導入。未初始化網站框架、未安裝依賴、未設定遠端或發布。

來源檔案的 .github/workflows 未導入，以免未來不經規劃就啟用遠端 CI。保留本機 scripts 與 tests，可於後續開發按專案需要合併 CI。

工作流原生檔案保留相對路徑；README 改為專案入口，上游 README 另存 WORKFLOW-README.md；AGENTS.md 加入本次專案範圍，intake、current/state、feature-spec、handoff、nodes 依已知資料更新。

## 驗證結果

- Node.js v24.20.0。
- node scripts/validate-workflow.mjs --require-active：通過，退出碼 0。檢查的是狀態、相對連結與證據結構，不代表網站功能通過。
- 首次上游測試：99 項中 98 項通過、1 項失敗。原測試把 tasks/current/state.json 當成永久空白模板，與本專案已初始化的 active/draft 狀態衝突；完整紀錄保留於 setup-tests.log。
- 修正方式：保留上游空白 state 為 tests/fixtures/workflow-template-state.json；原模板測試改讀 fixture，斷言不變；另外新增真實 current 狀態的結構測試。沒有刪除、跳過或弱化測試。
- 最終測試：100 項全部通過，0 失敗、0 跳過。紀錄為 setup-tests-attempt-02.log。
- 最終 active 狀態與文件檢查再次通過，紀錄為 setup-validation-attempt-02.log。
- 自我審查：確認專案路徑、版本來源、Figma 各節點與候選標示、未決事項、既有 .git 保留，以及未將上游驗證紀錄當成網站成果。

網站產品測試、瀏覽器 QA、build、部署驗證尚未執行，因為本輪未建立網站程式。工作流的功能狀態仍為 draft，未宣稱 Design Ready 或 Implementation Ready。

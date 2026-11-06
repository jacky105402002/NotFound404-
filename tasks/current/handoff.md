# 工作室專案交接
更新：2026-11-06，Asia/Taipei。
## 本次授權與決策
使用者要求最新 MingMing 產出網站；已明確回覆 NotFound404、V2、可操作但不傳送資料的預覽表單、非政府標案。新授權取代先前只準備資料的範圍；仍未授權 commit/push/deploy。
GitHub latest API 再查核為 v1.1.3，沿用現有固定版。
## 產物
website/public/ 為網站；website/server.mjs 提供僅綁 127.0.0.1 的本機伺服器。啟動方式見 website/README.md。官方 Figma MCP 成功取得 V2；第三方 Bridge 仍未連上，不影響本次實作。
已完成響應式版型、導覽、案例詳情、本機表單摘要與字體素材。驗收與完成狀態以 state.json 為唯一來源；證據在 reports/node-001/（最新輪次以 state.json 為準）。
## 界線與後續
預覽不發送／持久化資料。案例是概念示範，聯絡管道未開放。沒有真實表單整合、正式部署或主機網域設定。
後續可直接依此版修改 UI；若要上線，先確認聯絡資料、真實案例與素材使用權、正式表單目的地與隱私條款，再建立新 Node。不要重問本次已回答的四項。
## 歷史保存
docs/project-setup-spec.md 與 docs/project-setup-state.json 保留實作前狀態；docs/project-setup.md 是先前準備紀錄。上游 tasks/validation 不作網站證據。



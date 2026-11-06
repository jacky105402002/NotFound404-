# V2 實作設計與架構
## 來源
官方 Figma MCP session 66f6e93f-a256-467f-b0ba-1bf9a0a8eaf4，2026-11-06。
桌機 117:414、手機 117:592；完整參考碼在 docs/design-source。第三方 Bridge 無連線，官方來源可用。
## 架構決策
現有專案無產品框架、UI library 或可重用元件。採語意 HTML、CSS tokens、ES modules；Node 24 標準庫提供本機靜態伺服器，不安裝框架或 Tailwind。
網站位於 website/，只服務 website/public，不對瀏覽器暴露工作流文件。單一 Node 交付可驗收的完整本機預覽。
## UI
背景 #10131a／#0b0e15，服務與諮詢 #191b23，卡片 #1d1f27，cyan #00f0ff、green #4dffb1、violet #e0b6ff。
桌機 max-width 1440、左右 80、區段 64；手機 24、區段 40。桌機 Hero 左文右終端機，服務四欄、案例三欄、諮詢雙欄；中尺寸兩欄；手機單欄。
字體 Geist／Noto Sans TC／JetBrains Mono 與 Material Symbols Sharp，盡可能本機化，保留系統 fallback。
手機底部固定四個錨點且有 safe-area 與內容避讓；不建立缺少資料的會員或語言切換功能。
桌機稿案例是未配置封面的漸層槽，手機稿有三張封面；保持對應視口設計。案例詳情可顯示同來源封面，不冒充影片播放。
## 互動與資料流程
導覽 → 區段；scroll 事件以 requestAnimationFrame 節流更新目前區段。卡片預覽 → 原生 dialog → 關閉／Escape → 回原焦點。
表單 idle → invalid（逐欄錯誤、焦點第一錯誤）／valid → 本機需求摘要 dialog → 回到編輯。
稱呼 trim 後 1–80 字；Email trim 後基本格式且 <=254；簡述 <=2000；服務可不選並顯示尚未選擇。使用 textContent 呈現，避免使用者內容變 HTML。
無 API／儲存／cookie／分析工具；重新整理清空草稿。CSP 禁止 connect-src 與 form-action，停用 JavaScript 時按鈕不可送出並顯示提示。
## 文案與偏離
品牌統一 NotFound404；案例標示概念示範；移除虛構客戶、效能數字、24 小時回覆、加密承諾、Lighthouse 100、假聯絡地址。
保留視覺層級並將上述位置換成能力或預覽狀態。聯絡管道顯示尚未開放，無假連結。預覽操作清楚標示「不會傳送」。
為可及性將按鈕文字改深色、低對比文字適度提亮、互動最小 44px、提供 skip link。此為有意修正而非像素誤差。
## 驗證計畫
Node 單元測試驗證表單邊界與靜態伺服器路徑限制；Playwright 真瀏覽器覆蓋導覽、dialog 焦點、錯誤與成功預覽、XSS 文字、無資料請求及儲存、RWD、圖片可載入、console error。
desktop/mobile screenshots 人工視覺覆核，資產逐一比對來源、呼叫處及 geometry。無需編譯，build/type N/A。
## 模型評估
decision／implementation tier 沿用目前模型，actual_model 與 effort 無可靠額外資料則記 unknown；不需切換或新增代理。



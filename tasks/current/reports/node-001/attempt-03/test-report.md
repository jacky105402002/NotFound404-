# 產品驗證
- Node node-001 / revision r2 / attempt-03。
- Node.js 24.20.0，Windows；Playwright CLI 0.1.18、Microsoft Edge。
- test-unit.json：8 項 Node 測試通過。涵蓋欄位正負向與長度、HTTP/HEAD、POST 拒絕、path traversal、實際檔案、來源與文案。
- test-browser.json：69 項真瀏覽器檢查通過；涵蓋 10 種 320–1920px 寬度、標題不裁切、三案例開關與焦點、表單錯誤／有效摘要／修改、XSS 文字呈現、無請求與儲存、清空草稿、行動導覽、reduced-motion、字體、skip link、無 JS 時不可送出。
- 69 中有尺寸矩陣及重複焦點操作，不等同 69 個獨立功能。
- 沒有 JavaScript／console error，沒有失敗 HTTP 資源、外部來源請求；表單操作零網路請求。
- asset-geometry.log：9 個桌機 SVG、7 個手機 SVG、3 個手機 PNG 皆可載入；SVG 原始與渲染尺寸一致。PNG 自然 832×1248，在 390px 視口槽位為 340×528.5625、object-fit cover，對應 Figma 357/555 槽位比例。
- 桌機素材槽為 Figma 原始漸層空槽；手機顯示原始圖片，此差異有來源與文件。
- 畫面人工覆核：website/qa/desktop.png、mobile.png、mobile-contact.png、summary.png；無阻塞布局問題。品牌、預覽狀態與未核實承諾修正屬核准／必要偏離。
- 未執行 Safari、Firefox、完整 WCAG 稽核或真實後端整合；這些不屬本次本機預覽驗收。
- 包裝器 log 仍含 Playwright 版本更新提醒被舊 PowerShell 格式化的 NativeCommandError；實際結果 passed=true 且程序 exit 0，封裝器會對真正 CLI error 或缺 passed 結果失敗。


# Self-review
Node node-001 / revision r2 / attempt-03。reviewer_mode=self-review，未使用獨立代理。
## 驗收與結果
AC-WEB-01–06 逐條對照 feature-spec、實際 HTML/CSS/modules、素材、伺服器與測試。完整本機預覽符合範圍，無未解 blocking finding。
## 修正追蹤
- 路徑根目錄：原 directory URL 有尾端 separator，已 path.resolve 正規化；HTTP 測試驗證正常頁面與禁止路徑。
- 鍵盤焦點：原生 dialog 在連續 Tab 下可能離開內容區，r2 加入 forward／reverse 循環；5 次連續 Tab 與 Escape 焦點回復驗證通過。
- 測試包裝器：舊 PowerShell 對原生 stderr 提示的誤判已修正；仍以退出碼、CLI Error 與 passed:true 共同判定，不吞真失敗。
- 手機文案：移除「右側」方位詞，改為「從需求預覽開始」。
## 架構與資料
零前端框架依賴，Node server 僅綁 localhost 且只服務 public。無資料庫、cookie、Storage、fetch、sendBeacon 或實際寄件。表單由 textContent 建立摘要，CSP 阻止 connect-src 與 form-action。No-JS submit disabled。
單頁的現成重複區塊以相同 class／tokens 組合，無不必要全域狀態；目前 source 可直接部署成靜態資產，未建立外部網站。
## 設計與資產審查
對照官方 MCP 桌機／手機高保真參考及截圖，保留深色層級、Hero、四服務、三案例、諮詢、頁尾；布局改為響應式 Grid/Flex。品牌與誇大承諾依使用者及專案規則調整。
19 個 Figma asset 路徑皆在 manifest、public 與 HTML 使用點對應；asset-geometry.log 記錄每個可見資產的自然／實際尺寸。SVG 沒有改寫路徑或覆蓋原始寬高。手機封面在原槽位 cover；桌機空槽對應原稿。無暫時 URL runtime 依賴。字體／圖示本機化與授權文件均存在。
## 限制
預覽不是正式客戶案例、效能測試、後端整合或公開部署。非政府標案已由使用者回答，不宣稱資安認證。上線仍需核實真實資料、政策及素材使用權。
## 視覺證據 SHA256
- website/qa/desktop.png: 50922FDC3A51DEB0F4987A0F8E8BEB3F16B138D47BCC5C3AF60A9B5C1824C859
- website/qa/mobile.png: 2637C047BA3EA63E233624BE7064BD20EC6AF6A8FEFF002AB081C70B30CE2C96
- website/qa/mobile-contact.png: 08FD46D7E1E57CF9A4FCC7A8C3A20DA35E1C5C2C1D7F23F4136E59FF3250092E
- website/qa/summary.png: 438932228CCEA95250AE659D114CE4956E67F91B767737F640484246B9545F78


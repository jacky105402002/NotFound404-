# Figma 設計交接
更新：2026-11-06。使用者已確認品牌 NotFound404、採用 V2，並授權本機網站製作；未修改原始 Figma。
## 來源
- [完整設計檔](https://www.figma.com/design/M1Ghqc2OnEqlFaqEUIYTlr/NoFound404-Studio-%E2%80%94-Landing-Page?node-id=0-1)
- [V2 桌機](https://www.figma.com/design/M1Ghqc2OnEqlFaqEUIYTlr?node-id=117-414)
- [V2 手機](https://www.figma.com/design/M1Ghqc2OnEqlFaqEUIYTlr?node-id=117-592)
- [V2 UX 說明](https://www.figma.com/design/M1Ghqc2OnEqlFaqEUIYTlr?node-id=117-1109)
本次以官方 MCP get_design_context 重新讀取桌機／手機，含 screenshot 與完整參考碼；保存於 docs/design-source。第三方 Desktop Bridge 在本次檢查仍未連線，未將 READY 截圖當連線證據。
## 已落實決策
NotFound404 取代設計稿 NoFound404。保留終端機風格、四服務、三案例及諮詢版型。手機原始圖層名稱說明底部導覽設固定，已實作固定與安全留白。
預覽表單不連 API，具稱呼／Email 驗證、服務複選、需求摘要及返回修改。其互動由已核准預覽需求具體化，不聲稱 Figma 已定義 prototype。
桌機案例槽為漸層，手機有三張封面；依來源保留差異，詳細視窗使用同來源圖片。19 項 Figma 素材本機化；字體與圖示也本機化，授權文件保存在 website/licenses。
## 文案處理
所有案例標示概念示範；移除未核實的真實客戶、99.99%、12ms、24 小時回覆、加密及 Lighthouse 分數承諾。未核實的信箱、社群與通訊帳號不設可點擊假連結。
## 接續
像素與互動依 docs/website-design.md；完成畫面見 website/qa。正式上線前仍需核實案例與素材使用權、真實聯絡方式、資料處理與部署條件。


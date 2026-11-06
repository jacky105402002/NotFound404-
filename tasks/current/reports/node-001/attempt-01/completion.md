# 第一輪紀錄
revision r1。產品測試 8/8 通過；正式瀏覽器包裝器被 Windows PowerShell 5 的 NativeCommandError 中止，來源是 Playwright CLI 更新提示，不是網頁錯誤。本輪不通過、不標 done。
隨後以目前 PowerShell 環境直接重跑追加鍵盤檢查，發現原生 dialog 的 Tab 可能離開內容區；已於 r2 加入明確 Tab／Shift+Tab 循環。保留本輪失敗證據，不覆寫。


# be markdown note front end

This is front end, the back end is https://github.com/xxx

React + TypeScript + Vite + tailwind css shadcn/ui react-router i18next redux/toolkit

zod react-form-hook

## features

1. sign up / sign in

- official account sign in , and if you forgot password
- sign up for official account
- sign in with google
  (google console)
- trial account
- react form zod

2. introduce
   video compress website

3. i18next i18n

4. theme

5. icon source website
6. svg animate

7. note

- resize panel
- markdown editor
- datetime date-fns
- auto scroll fetch next. before trial

8. settings

- resize image react-image-crop

9. axios error handle

# need to write blog

1. google sign in
2. scrolling fetching
3. i18next
4. vercel deploy
5. python any where deploy.
6. tip tap editor

# Django rest framework 結合通過谷歌登錄，適用於前後台分離的一種實現思路，登錄憑證使用其他的。

自定用戶結構 + google oauth2 憑證。
後台：django-rest-framework
前台：react （非特定針對 react、其他實現也可參考）

## 背景

需要實現的登錄途徑

1. 本應用創建的用戶登錄
2. 通過 google oauth2 登錄，gmail 用戶
   這兩種途徑採用同一套 token 認證。本文使用的是 drf-jwt，配合 redis 來銷毀和判斷是否失效。

前後台分離
如果使用 nextjs 前後台在一個工程開發使用 next/auth 對接 google auth 是簡單快速的方法。

前後台分離的話需要訪問地址多次配合，大致思路如下

1. 前台訪問後台的 access url
2. 訪問後台的 access url 時，後台創建 google auth url（其中帶有後台創建的 google auth 登錄完成後跳轉的 callback api url），重定向到谷歌登錄頁面
3. 在 callback url 中，如果沒有異常重定向到前台的登錄成功路由頁面，如果出現異常錯誤，重定向到前台的登錄失敗頁面。
4. 在前台的登錄成功頁面中，判斷 token 是否有效，若有效成功登錄，若無效則跳轉到登錄失敗頁面

以下為代碼參考

access view
callback view

# 參考

# i18next

react + i18next

# zod custom i18next

# image crop

react-image-crop + PIL

# django file upload without models

# encryption serializer mixin

# EnvelopedJSONRenderer json add success one time

# pythonanywhere

1. upload github
2. collect statistics
3. shedual task
4. .env

# 以完成製作基本功能
## 如有問題請回報 將會進行更新

---
### 安裝及使用方式

1. 先將此資料夾(前端)及後端程式下載(或colne)後解壓縮到某個地方並命名
2. 前端部分
    1. 請先將除了/backend及/sql以外的所有檔案拖曳至nginx的開啟目錄(或在任一子資料夾中)
    2. 前端部分完成
3. 後端部分(安裝虛擬環境及django)
    1. 請將/backend複製到一個任一資料夾中(建議在C:/)
    2. 將此資料夾使用終端機(如cmd)開啟
    3. 安裝python
    4. 下載虛擬環境
        ```cmd
        pip install virtualenv
        ```
    5. 執行
        ```cmd
        virtualenv myenv
        ```
    6. 再執行
        ```cmd
        myenv\Scripts\activate
        ```
    7. 之後您會看到cmd前墜加上了虛擬空間(myenv)
    8. 執行/backend內的requirements.txt
        ```cmd
        cd backend
        pip install -r requirements.txt
        ```
    9.  之後執行
        ```cmd
        runserver.cmd
        ```
        開啟server
    10. 您會在 http://localhost:8000 看到server
    11. 後端部分完成:)
4.  資料庫部分
    1. 在SQL/如果要有資料的話選chrisjudge.sql不要的話選chrisjudge_nodata.sql
    2. 匯入mysql資料庫中資料庫請命名為"chrisjudge"(如果不想改後端的話)
    3. 如果不想改後端的話帳密為root,無密碼
    4. 資料庫部分完成
5.  server開啟
    1. 推用xampp的mysql+nginx開啟 此範例將以此介紹
    2. 先將nginx/xampp mysql開啟
    3. 之後再nginx中的sever>http區塊中輸入
        ```conf
        location /backend/{
            proxy_pass http://127.0.0.1:8000/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        ```
    4. 之後輸入localhost/您的資料夾網址即可開啟
    5. 以上server開啟完成
6. 第三方登入
    1. 如果有需要請照以下執行(如果不需要請略過)
        1. 暫不開放將在之後版本開放
7. 附錄
    1. 如果要改帳密/資料庫名請照此步驟
        1. 請到/backend/function中您可以看到sql.py
        2. 裡面的第12行有
            ```py
            db="chrisjudge"
            ```
            將此改成您的資料庫名
        3. 裡面的第15行有
            ```py
            return MySQLdb.connect(host="localhost",db=db,user="root",passwd="")
            ```
            將請將您的帳密取代user及passwd變數
        4. 以上
    2. nginx部分之介紹請參考(此檔案)[]
    3. 公開外網部分之介紹請參考(此檔案)[]
8. 常見故障及解決方式
9.  以上再次感謝您下載此軟體，在使用上出任何問題直接連絡我即可

---

### 關於
##### **有**進行前後端分離
##### 類型: 全公開
##### 完成日期: 2023/11/05
##### 製作過程: 約2週
##### 製作人員:
- 小賀chris(DC: chris0527(小賀chris))
##### 參考: 無
##### 特別感謝: 無
##### 使用技術: html css js python mysql
##### 目前版本: v1.0.0

---

### 版本迭帶
#### Bata1.0.0
##### 完成時間: 2023/11/05
##### 錯誤回報: 無
##### 敘述:
製作完成

#### v1.0.0
##### 完成時間: 2024/01/05
##### 錯誤回報: 無
##### 敘述:
基本功能皆完成，之後將製作進階功能
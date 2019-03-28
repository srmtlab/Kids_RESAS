Kids RESAS
====
Kids RESAS is to assist class of social studies using RESAS.  
This project is taken over from the [gtskler (GitHub)](https://github.com/srmtlab/Kids_RESAS/tree/gtskler).  

# Dependency
- Node.js v10.x
- npm 6.x
- MongoDB 

## How to start
  - Node.jsをインストール
  - fs,url,path,mime,http,socket.ioモジュールをインストール
  - リバースプロキシを設定
    - ポート番号を2222に設定しているため,2222をgtsklerに
  - コンソールで```node app.js```とすることでプログラム実行

## ディレクトリ
  - app.js
    - グラフツクラー実行プログラム
    - サーバ側
    - クライアントがアクセスするとクライアントに対してindex.htmlを返す
    - クライアント間のソケット通信を行う
  - index.html
    - クライアント画面
  - css/
    - hoge.css
      - index.htmlが読み込むcss
  - js/
    - ipop.js
      - クイズ機能用ポップアップウインドウ表示関数
    - kidsresas.js
      - RESASを用いたグラフ描画用関数
    - client.js
      - iframeのセットやソケット通信を行う用の関数
    - scenario.js
      - シナリオ機能用関数
    - materialize.min.js
  - csv/
    - trial.csv
      - シナリオ保存用csv
      - 例:[23,23210,1-1]
      - データ形式は[都道府県コード,市町村コード,グラフ番号]
      - グラフ番号は1-1なら人口推移,1-2なら人口ピラミッドのようにボタンの番号に対応
   - out.txt
     - 遅延確認用に時刻保存用のファイル
     - クライアントとサーバで現在時刻が異なるから意味はない
   - img/
     - 画像保存ディレクトリ
     - グラフへのマーク用画像など
     
# Author
- Akira Kamiya
- Tsuyoshi Ureshino
  - Code for Aichi

# LICENCE
- The MIT Licence (MIT)

KidsRESASの開発について
=====
- Note: このドキュメントは，教育用に作成したものであり，このアプリケーションの開発の仕方を強制するものではありません．

## 開発環境について
### 導入
KidsRESASは仮想環境上で開発を行います．仮想環境を用いることで以下の様な利点があると考えられます．
- 誰でも同じ環境を構築でき，アプリケーションの配布や構築が容易になります．
- ローカルの環境（仮想環境ではない）で開発を行うと，プロジェクト以外のファイルプログラムが誤って削除する等の，ローカルの環境が破壊される可能性がある．

KidsRESASでは，仮想環境としてDockerを用います．
- Dockerについては，以下の記事を読むと良いかもしれません
    - [Docker入門（第一回）～Dockerとは何か、何が良いのか～](https://knowledge.sakura.ad.jp/13265/)
    - [Dockerイメージの理解とコンテナのライフサイクル](https://www.slideshare.net/zembutsu/docker-images-containers-and-lifecycle)
    - [入門 Docker](https://y-ohgi.com/introduction-docker/)

本来は，Dockerについて説明すべきなのですが，今回は割愛させていただきます．

### VSCodeでの開発環境の開き方
VSCodeを用いた，開発手順について説明をさせていただきます．今回は，開発にVSCode(Visual Studio Code)を用います．VSCodeの [Remote - Containers](https://code.visualstudio.com/docs/remote/containers) という拡張機能があるので，それを用いて開発を行います．  
以下の手順で開発環境が立ち上がります．

![VSCode起動手順](./open_project.jpg)

### VSCodeでの開発環境の綴じ方
1. 左下の ``Dev Container: KidsRESAS development`` をクリック
2. ``Close Remote Connection`` をクリック
開発環境が終了します．

## Ruby on Rails について
Kids RESASは，Railsと呼ばれるウェブアプリケーションフレームワークを用いて開発を行います．

### アプリケーションの起動
Railsで作成したアプリケーションの起動を行ってみましょう  
Terminal -> New Terminalの順にクリックし，ターミナルを起動し，以下を入力してみましょう．
```bash
bundle exec rails server -p 3000 -b '0.0.0.0'
```
http://localhost:3000/ にブラウザからアクセスするとWEBアプリケーションが起動していることが確認できます．

### MVCモデルの説明
RailsはMVCモデルに従い，プログラムの設計・開発を行います．
MVCモデルとは以下の略です．
- Model
- View
- Controller

RailsのMVCモデルについては，[この記事](https://www.javadrive.jp/rails/ini/index7.html)を読むと非常にわかりやすいと思います．

### Controllerの作成
コントローラーの作成をしてみましょう．今回は，「ホーム」コントローラーを作成してみます（一番最初に訪れるページなので）．以下のコマンドを入力してみましょう．
```bash
rails generate controller home
```
config/routes.rb に以下を入力してみましょう．
```bash
get '/', to: 'home#index'
```
/app/controllers/home_controller.rb を開き，以下を入力してみましょう
```ruby
class HomeController < ApplicationController

    def index
    end
```
app/views/home/index.html.erb を開き，HTMLのコード（何でもいいです）を記述し保存してみましょう．  
http://localhost:3000/ にアクセスすると画面が変わっていると思います．こんな感じなんだというのを掴んでいただければ十分です．

## 参照
- [いつも忘れる「Railsのgenerateコマンド」の備忘録](https://maeharin.hatenablog.com/entry/20130212/rails_generate)

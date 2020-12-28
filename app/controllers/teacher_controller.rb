class TeacherController < ApplicationController
    # TODO: ログインしないユーザーのアクセスを許可させないコードを追加する！！！
    before_action :authenticate_user!
    
    def index
    end
end


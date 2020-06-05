class HomeController < ApplicationController

    def index
    end

    def test
        @test = params[:id]
    end

end

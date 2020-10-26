class GraphsController < ApplicationController

    def index
        @graphs = []
        Graph.all.order(created_at: :desc).each do |graph|
            @graphs.push(graph)
        end
    end
    
    def new
        @graph = Graph.new
    end

    def create
        @graph = Graph.new(graph_params)
        @graph.user = current_user
        @graph.save

        redirect_to graphs_path
    end

    def show

    end
end

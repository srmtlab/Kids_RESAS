class Graph < ApplicationRecord
    belongs_to :user
    has_one :room
    belongs_to :graph_param
    has_one :dataset, dependent: :destroy
    enum graph_kind: { populationperyear: 0, published: 1 }
end

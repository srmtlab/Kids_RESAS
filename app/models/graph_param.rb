class GraphParam < ApplicationRecord
    has_one :graph, dependent: :destroy
end

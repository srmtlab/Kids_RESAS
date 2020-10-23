class Room < ApplicationRecord
    belongs_to :user
    belongs_to :graph, optional: true
end

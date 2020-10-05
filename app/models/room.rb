class Room < ApplicationRecord
    belongs_to :user
    belongs_to :graph
end

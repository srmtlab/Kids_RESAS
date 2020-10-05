class AddGraphInfoToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :password, :string, null: true
    add_reference :rooms, :graph, foreign_key: true
  end
end

class CreateGraphParams < ActiveRecord::Migration[6.0]
  def change
    create_table :graph_params do |t|
      t.integer :pref_code, null: true
      t.string :city_code, null: true
      t.integer :year_left, null: true
      t.integer :year_right, null: true
      t.integer :matter, null: true
      t.timestamps
    end
  end
end

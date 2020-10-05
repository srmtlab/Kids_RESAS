class CreateGraphs < ActiveRecord::Migration[6.0]
  def change
    create_table :graphs do |t|
      t.references :user,  foreign_key: true
      t.integer :graph_kind, null: false, default: 0
      t.references :graph_param,  foreign_key: true
      t.timestamps
    end
  end
end

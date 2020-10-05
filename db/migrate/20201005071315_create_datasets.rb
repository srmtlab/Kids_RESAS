class CreateDatasets < ActiveRecord::Migration[6.0]
  def change
    create_table :datasets do |t|
      t.references :graph,  foreign_key: true
      t.string :name, null: false, default: ""
      t.text :description, null: false
      t.integer :pref_code, null: true
      t.string :city_code, null: true
      t.timestamps
    end
  end
end

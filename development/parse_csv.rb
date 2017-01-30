require 'csv'
require 'json'

body = File.read('/home/alexa/Desktop/viking/unit-5/fideligard/development/data.csv')

csv = CSV.new(body, :headers => true, :header_converters => :symbol, :converters => :all)
data = csv.to_a.map {|row| row.to_hash }

File.open('data.json', 'w+') { |f| f.write data.to_json }
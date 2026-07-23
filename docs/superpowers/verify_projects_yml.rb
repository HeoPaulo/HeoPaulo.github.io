require 'yaml'

data = YAML.load_file(File.join(__dir__, '..', '..', '_data', 'projects.yml'))

raise "expected 5 projects, got #{data.length}" unless data.length == 5

data.each do |p|
  raise "#{p['name']}: missing 'date' key" unless p.key?('date')
  raise "#{p['name']}: missing 'thumb' key" unless p.key?('thumb')
  raise "#{p['name']}: missing 'name_kr'" unless p.key?('name_kr')
end

names = data.map { |p| p['name'] }
raise "notes.html entry missing, got #{names}" unless names.include?('notes.html')

puts "OK: 5 projects, all have date/thumb keys, notes.html present"

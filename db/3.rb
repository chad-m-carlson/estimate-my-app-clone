

platforms = ['iOS', 'Android', 'Web']

platforms.each do |a|
  p = Platform.create(name: a)
  5.times do |i|
    category = Category.create(
      name: "#{a} category #{i +1}",
      is_exclusive: false,
      platform_id: p.id
    )
    5.times do |j|
    Feature.create(
      name: "#{a} Feature #{i+1}/#{j+1}",
      description: Faker::TvShows::MichaelScott.quote,
      list_location: rand(10),
      base_days: rand(10),
      multiplier: 1,
      category_id: category.id,
      platform_id: p.id
    )
    end
  end

  3.times do |k| 
    category = Category.create(
      name: "#{a} exclusive category #{k+1}",
      is_exclusive: true,
      platform_id: p.id
      )
      3.times do |l|
      Feature.create(
        name: "#{a} exclusive Feature #{k+1}/#{l+1}",
        description: Faker::TvShows::MichaelScott.quote,
        list_location: rand(10),
        base_days: rand(10),
        multiplier: 1,
        category_id: category.id,
        platform_id: p.id
      )
    end
  end
end

5.times do 
  e = Estimate.create(
    customer_name: Faker::Name.name ,
    customer_email: Faker::Internet.email,
  )
  50.times do
    FeatureEstimate.create(
      estimate_id: e.id,
      feature_id: rand(1..100)
    )
  end
end

numF = Feature.count
numF.times do |a|
  Feature.update((a+1), is_active: true)
end

numC = Category.count
numC.times do |a|
  Category.update((a+1), is_active: true)
end

names = ["Michael Scott", "Winnie The Pooh", "Leslie Knope", "Mario"]
numE = Estimate.count
numE.times do |a|
  Estimate.update((a+1), employee_name: names.sample, customer_email: "test#{a+1}@test.com", customer_name: "test#{a+1}" )
end

p ("category active, feature active, estimates seeded")

# platforms = ['iOS', 'Android', 'Web']

# platforms.each do |a|
#   p = Platform.create(name: a)
#   5.times do |i|
#     category = Category.create(
#       name: "#{a} category #{i +1}",
#       is_exclusive: false,
#       platform_id: p.id
#     )
#     5.times do |j|
#     Feature.create(
#       name: "#{a} Feature #{i+1}/#{j+1}",
#       description: Faker::TvShows::MichaelScott.quote,
#       list_location: rand(10),
#       base_days: rand(1..10),
#       multiplier: 1,
#       category_id: category.id,
#       platform_id: p.id
#     )
#     end
#   end

#   3.times do |k| 
#     category = Category.create(
#       name: "#{a} exclusive category #{k+1}",
#       is_exclusive: true,
#       platform_id: p.id
#       )
#       3.times do |l|
#       Feature.create(
#         name: "#{a} exclusive Feature #{k+1}/#{l+1}",
#         description: Faker::TvShows::MichaelScott.quote,
#         list_location: rand(10),
#         base_days: rand(1..10),
#         multiplier: 1,
#         category_id: category.id,
#         platform_id: p.id
#       )
#     end
#   end
# end


# puts "Seeded 3 platforms, with categories (exclusive and non) and features"
# puts "Seeded 5 estimates with features"




### NOTE

##  this aligns the category_ids for category and features ONLY if you have
##   NOT previously made any data. 
##   if you have then run db:drop db:create db:migrate db:seed for this file
##   OR just adjust the last feature category_id line to be adjusted for your numbers.


# 10.times do |i|
#   Category.update((i+1),
#     is_exclusive: Faker::Boolean.boolean(0.7), 
#   )
# end

# puts("updated is_exclusive for category")


# 102.times do |j| 
#   Feature.update((j+1),
#     description: "description for feature # #{j+1}"
#   )
# end

# # end

# puts("features updated")


# 10.times do |i|
#   Category.create(
#     name: Faker::Lorem.word,   
#     is_android: Faker::Boolean.boolean(0.7),
#     is_ios: Faker::Boolean.boolean(0.7), 
#     is_web: Faker::Boolean.boolean(0.9),
#     list_location: (i+1),
#   )
# end

# 10.times do |k|
#   5.times do |j|
#     Feature.create(
#       name: Faker::Lorem.word,   
#       description: Faker::Lorem.paragraph_by_chars(150, false),
#       developer_boolean: Faker::Boolean.boolean(0.9),
#       base_days: Faker::Number.between(2, 12),
#       is_android: Faker::Boolean.boolean(0.7),
#       is_ios: Faker::Boolean.boolean(0.7), 
#       is_web: Faker::Boolean.boolean(0.9),
#       list_location: (j+1),
#       category_id: (k+1),
#   )
#   end
# end

# puts("seeded 10 categories & 5 features each category")


# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'redd'
require 'metainspector'
require 'nokogiri'
require 'open-uri'
require 'pry'

reddit = Redd.it(

)

links = reddit.search("futurism.com", limit: 100).map do |article|
  if article.url =~ /\.com/
    article.url
  else
    nil
  end
end.compact

links.each do |link|
  begin
    page = MetaInspector.new(link)

    html_data = open(link.sub(/http\b/, 'https')).read
    nokogiri_object = Nokogiri::HTML(html_data)
    header = nokogiri_object.css('.post-header-full').to_html
    if !!/background-image: url\((.+?)\)/.match(header)
      title = page.title
      content = nokogiri_object.css('.summary.module').to_html
      img = /background-image: url\((.+?)\)/.match(header)[1]
      description = nokogiri_object.css('.synopsis.module').to_html
      tags = page.meta["article:tag"].split(' ')
      category = page.meta["article:section"]
      @category = Category.find_or_create_by(name: category)
      tags.map! do |tag|
        @tag = Tag.find_or_create_by(name: tag)
        @tag
      end
      puts 'got here'
      @article = Article.create_with(content: content, image: img, description: description, tags: tags, category: @category).find_or_create_by(title: title)
    end
  rescue
  end
end

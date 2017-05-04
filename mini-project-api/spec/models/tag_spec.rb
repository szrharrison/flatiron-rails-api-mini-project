require 'rails_helper'

RSpec.describe Tag, type: :model do

    before(:all) do
      @article = Article.new(title: 'Test Article', description: 'Test description.', content: "This is test content. It's longer than a description.", image: 'http://www.test-image.com' )
      @category = Category.create(name: 'Test Category')
      @article.category = @category
      @tag = Tag.create(name: 'Test Tag 1')
      @article.tags = [@tag]
      @article.save
    end

    it "has the appropriate attributes" do
      expect(@tag.name).to eq('Test Tag 1')
      expect(@tag.articles[0].title).to eq('Test Article')
    end
end

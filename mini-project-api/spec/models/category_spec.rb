require 'rails_helper'

RSpec.describe Category, type: :model do

  before(:all) do
    @article = Article.new(title: 'Test Article', description: 'Test description.', content: "This is test content. It's longer than a description.", image: 'http://www.test-image.com' )
    @category = Category.create(name: 'Test Category')
    @article.category = @category
    @article.save
    @article.tags.create(name: 'Test Tag 1')
  end

  it "has the appropriate attributes" do
    expect(@category.name).to eq('Test Category')
    expect(@category.articles[0].title).to eq('Test Article')
  end
end

require 'rails_helper'

RSpec.describe Article, type: :model do

  before(:all) do
    @article = Article.new(title: 'Test Article', description: 'Test description.', content: "This is test content. It's longer than a description.", image: 'http://www.test-image.com' )
    @article.category = Category.create(name: 'Test Category')
    @article.save
    @article.tags.create(name: 'Test Tag 1')
  end

  it "has the appropriate attributes" do
    expect(@article.title).to eq('Test Article')
    expect(@article.description).to eq('Test description.')
    expect(@article.content).to eq("This is test content. It's longer than a description.")
    expect(@article.image).to eq('http://www.test-image.com')
    expect(@article.category.name).to eq('Test Category')
    expect(@article.tags[0].name).to eq('Test Tag 1')
  end

end

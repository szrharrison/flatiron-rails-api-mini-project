class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :content, :image
  belongs_to :category
  has_many :tags
end

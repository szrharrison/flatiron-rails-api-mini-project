class Article < ApplicationRecord
  belongs_to :category
  has_many :article_tags
  has_many :tags, through: :article_tags
end

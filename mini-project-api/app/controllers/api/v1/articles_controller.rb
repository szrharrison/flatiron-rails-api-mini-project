class Api::V1::ArticlesController < ApplicationController
  before_action :set_article, only: [:show]

  def show
    render json: @article
  end

  def random
    @article = Article.find( Random.rand( 2..Article.count ) )
    render json: @article
  end

  def create
    @article = Article.new( article_params )
    @tags = params[:article][:tags].map do |key, tag|
      Tag.find_or_create_by( name: tag[:name] )
    end
    @article.tags = @tags
    render json: @article
  end

  private

  def set_article
    @article = Article.find( params[:id] )
  end

  def article_params
    params.require(:article).permit(:title, :description, :content, :image, :category_id,)
  end
end

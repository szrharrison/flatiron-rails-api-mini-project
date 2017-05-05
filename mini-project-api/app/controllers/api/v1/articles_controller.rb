class Api::V1::ArticlesController < ApplicationController
  before_action :set_article, only: [:show]

  def show
    render json: @article
  end

  private

  def set_article
    @article = Article.find( params[:id] )
  end

  def article_params
    params.require(:article).permit(:title, :description, :content, :image, :category_name, :'tags[]')
  end
end

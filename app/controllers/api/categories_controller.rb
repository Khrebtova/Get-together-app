class Api::CategoriesController < ApplicationController
 
  # GET /categories
  def index
    @categories = Category.all
    render json: @categories
  end

  # POST /categories
  def create
    @category = Category.create(category_params)
    if @category.valid?
      render json: @category, status: :created, location: @category
    else
      render json: {errors: @category.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
        
    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:name)
    end

    
end

class CategoriesController < ApplicationController
  

  # GET /categories
  def index
    @categories = Category.all

    render json: @categories
  end

  # GET /categories/1
  def show
    @category = Category.find_by(id: params[:id])
    render json: @category
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

  # PATCH/PUT /categories/1
  # def update
  #   if @category.update(category_params)
  #     render json: @category
  #   else
  #     render json: @category.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /categories/1
  # def destroy
  #   @category.destroy
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    
    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:name)
    end
end

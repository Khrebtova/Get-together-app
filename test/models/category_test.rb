require "test_helper"

class CategoryTest < ActiveSupport::TestCase
    Category.delete_all
    
    test "should not save category without name" do
        category = Category.new
        assert_not category.save, "Saved the category without a name"
    end

    test "should not save category with a name that already exists" do
        category1 = Category.new(name: "Music")
        category1.save
        category2 = Category.new(name: "Music")
        assert_not category2.save, "Saved the category with a name that already exists"
    end

    test "should save category with a name" do
        category = Category.new(name: "Music")
        assert category.save, "Did not save the category with a name"
    end
end
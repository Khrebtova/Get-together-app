require 'test_helper'

class UserTest < ActiveSupport::TestCase
  User.delete_all

  test "should not save user without username" do
    user = User.new
    assert_not user.save, "Saved the user without a username"
  end

  test "should not save user without unique username" do
    user1 = User.new(username: "testuser")
    user1.save
    user2 = User.new(username: "testuser")    
    assert_not user2.save, "Saved the user without a unique username"
  end
  
  test "should have a password_digest attribute" do
    user = User.new(username: "testuser2", password: "password", password_confirmation: "password")
    user.save 
    assert user.password_digest, "Did not save the user with a password_digest attribute"
  end
  
  test "should not save user if passwords do not match" do
    user = User.new(username: "testuser3", password: "password", password_confirmation: "password1")
    assert_not user.save, "Saved the user when passwords did not match"
  end

  test "should save user with username and matching password and password confirmation" do
    user = User.new(username: "testuser1", password: "password", password_confirmation: "password")
    assert user.save, "Did not save the user with a username and matching password and password confirmation"
  end
end

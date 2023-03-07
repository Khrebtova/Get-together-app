require "test_helper"

class EventTest < ActiveSupport::TestCase 
    User.delete_all
    Event.delete_all
    
    user = User.create(username: "testuser", password: "password", password_confirmation: "password")
    category = Category.create(name: "test")

    test "should not save event without name" do
        event = Event.new(description: "test", location: "test", date: "test", user_id: user.id)
        assert_not event.save, "Saved the event without a name"
    end

    test "should not save event without description" do 
        event = Event.new(name: "test", location: "test", date: "test", user_id: user.id)
        assert_not event.save, "Saved the event without a description"
    end

    test "should not save event without location" do
        event = Event.new(name: "test", description: "test", date: "test", user_id: user.id)
        assert_not event.save, "Saved the event without a location"
    end

    test "should not save event without date" do
        event = Event.new(name: "test", description: "test", location: "test", user_id: user.id)
        assert_not event.save, "Saved the event without a date"
    end

    test "should not save event without user_id" do
        event = Event.new(name: "test", description: "test", location: "test", date: "test")
        assert_not event.save, "Saved the event without a user_id"
    end

    test "should save event with all required attributes" do
        event = Event.new(name: "test", description: "test", location: "test", date: "test", user_id: user.id, category_id: category.id)
        assert event.save, "Did not save the event with all required attributes"
    end

    test "should have a category_id attribute" do       
        event1 = Event.create(name: "test1", description: "test", location: "test", date: "test", user_id: user.id, category_id: category.id)        
        assert event1.category_id, "Event does not have category_id attribute"
        assert event1.category, "Event does not have category attribute"
    end

    test "should have a host attribute" do        
        event = Event.create(name: "test", description: "test", location: "test", date: "test", user_id: user.id, category_id: category.id)
        assert_not_nil event.host, "Did not save the event with a host attribute"
    end
end
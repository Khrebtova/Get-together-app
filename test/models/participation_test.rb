require "test_helper"

class ParticipationTest < ActiveSupport::TestCase 
    User.delete_all
    Event.delete_all

    user1 = User.create(username: "testuser10", password: "password", password_confirmation: "password")
    user2 = User.create(username: "testuser11", password: "password", password_confirmation: "password")
    event1 = Event.create(name: "test", description: "test", location: "test", date: "test", user_id: user1.id)

    test "should save participation with user_id and event_id" do  
        participation = event1.participations.new(user_id: user2.id) 
        assert participation.save, "Did not save the participation with a user_id and event_id"
   end

end
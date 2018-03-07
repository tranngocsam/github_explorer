require 'rails_helper'

describe Api::V1::SessionsController do
  describe "GET me" do
    it "returns nil if user is not logged in" do
      get :me

      expect(response.status).to eql(200)
      expect(json["data"]).to be_blank
    end

    it "returns user data if user is logged in" do
      user = ControllerMacros.sample_user
      allow(controller).to receive(:current_user).and_return(user)

      get :me

      expect(response.status).to eql(200)
      expect(json["data"]).to be_a(Hash)
      expect(json["data"]["nickname"]).to eql(user.nickname)
      expect(json["data"]["uid"]).to eql(user.uid)
    end
  end
end

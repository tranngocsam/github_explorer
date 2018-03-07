require 'rails_helper'

describe User do
  describe ".from_omniauth" do
    it "returns user from omniauth hash" do
      omniauth = ControllerMacros.github_hash
      user = User.from_omniauth(omniauth)

      expect(user).to be_present
      expect(user.nickname).to eql(omniauth["info"]["nickname"])
      expect(user.name).to eql(omniauth["info"]["name"])
      expect(user.uid).to eql(omniauth["uid"])
    end
  end

  describe ".from_session" do
    it "returns user from session" do
      session = {}
      session[:name] = Faker::Name.name
      session[:nickname] = ("a".."z").to_a.sample(6).join
      session[:uid] = SecureRandom.hex(8)
      user = User.from_session(session)

      expect(user).to be_present
      expect(user.nickname).to eql(session[:nickname])
      expect(user.name).to eql(session[:name])
      expect(user.uid).to eql(session[:uid])
    end
  end

  describe "#as_json" do
    it "responds to as_json" do
      user = ControllerMacros.sample_user

      json = user.as_json
      expect(json).to be_present
      expect(json["name"]).to eql(user.name)
      expect(json["nickname"]).to eql(user.nickname)
      expect(json["uid"]).to eql(user.uid)
    end
  end
end

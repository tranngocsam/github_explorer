require 'rails_helper'

describe HomeController do
  describe "GET index" do
    it "renders the template" do
      get :index
      expect(response.status).to eql(200)
      expect(response).to render_template("home/index")
    end
  end
end

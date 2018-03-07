require 'rails_helper'

describe SessionsController do
  describe "GET create" do
    context "using github" do
      before do
        request.env["omniauth.auth"] = ControllerMacros.github_hash
      end

      it "logs user in" do
        get :create, params: {provider: "github"}

        expect(response.status).to eql(302)
        expect(response).to redirect_to(root_path)

        current_user = controller.send(:current_user)
        expect(current_user).to be_present
        expect(current_user.nickname).to be_present
        expect(current_user.uid).to be_present
      end
    end
  end
end

module ControllerMacros
  def self.github_hash
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    name = "#{first_name} #{last_name}"

    OmniAuth.config.mock_auth[:github] = OmniAuth::AuthHash.new({
      "provider" => "github",
      "uid" => "123545",
      "info" => {
       "email" => Faker::Internet.email,
       "name" => name,
       "first_name" => first_name,
       "last_name" => last_name,
       "nickname" => ("a".."z").to_a.sample(6).join
      }
    })
  end

  # With real app, we can use factory-girl gem, instead of adding this method
  def self.sample_user
    user = User.new
    user.name = Faker::Name.name
    user.uid = SecureRandom.hex(8)
    user.nickname = ("a".."z").to_a.sample(8).join

    user
  end
end

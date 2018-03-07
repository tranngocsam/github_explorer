class User
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations
  include ActiveModel::AttributeAssignment

  attr_accessor :name, :uid, :nickname

  validates :nickname, presence: true
  validates :uid, presence: true

  def self.from_omniauth(omniauth)
    info = omniauth["info"]

    user = self.new
    user.name = info["name"] || [info["first_name"], info["last_name"]].reject(&:blank?).join(" ")
    user.uid = omniauth["uid"]
    user.nickname = info["nickname"]

    user
  end

  def self.from_session(session)
    return nil unless session[:uid]

    user = self.new
    user.name = session[:name]
    user.uid = session[:uid]
    user.nickname = session[:nickname]

    user
  end

  def as_json
    attrs.stringify_keys
  end

  private

  def attrs
    {
      name: self.name,
      nickname: self.nickname,
      uid: self.uid
    }
  end
end

class Api::V1::BaseController < ApplicationController
  layout false

  private

  # Return json to client with default like this {data: json_data}.
  # We can automatically include pagination info here if results were paginated by will_paginate to karimani,...
  def respond_json_results(results, options = {})
    json = results.is_a?(Hash) && results.key?(:data) ? results.merge({}) : {data: results.as_json}

    if options[:pagination]
      json[:pagination] = options[:pagination]
    end

    status = options[:status] || 200
    render json: json, status: status
  end

  # Return json error
  def respond_json_errors(options = {})
    options[:status] ||= 500
    render json: options, status: options[:status]
  end

  # We can include some session info here.
  def as_json_for_current_user
    user = current_user
    user.as_json if user
  end
end

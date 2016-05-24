require 'faraday'

# This class handles JSON communication with the backend
class FavoriteService
  def self.create(name, id)
    connection.post do |request|
      request.url 'favorites'
      request.headers['Content-Type'] = 'application/json'
      request.body = {Title: name, imdbID: id}.to_json
    end
  end

  class << self
    private

    def connection
      @connection = Faraday.new(url: HOST) do |faraday|
        faraday.adapter Faraday.default_adapter # make requests with Net::HTTP
      end
    end
  end
end
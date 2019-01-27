json.amenities do
  @amenities.each do |amenity|
    json.set! amenity.id do
      json.extract! amenity, :id, :name
    end
  end
end

json.home_types do
  @home_types.each do |home_type|
    json.set! home_type.id do
      json.extract! home_type, :id, :name
    end
  end
end
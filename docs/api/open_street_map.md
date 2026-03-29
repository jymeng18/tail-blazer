# Endpoint: Reverse Geocoding
https://nominatim.openstreetmap.org/reverse

# Query Parameters:
?format=json&lat=<value>&lon=<value>&zoom=<value>&addressdetails=1

# Example Response: 
{
  "place_id": 16281533,
  "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
  "osm_type": "way",
  "osm_id": 280940520,
  "lat": "-34.4407231",
  "lon": "-58.7051623",
  "class": "highway",
  "type": "motorway",
  "place_rank": 26,
  "importance": 0.05338152361333635,
  "addresstype": "road",
  "name": "Autopista Pedro Eugenio Aramburu",
  "display_name": "Autopista Pedro Eugenio Aramburu, El Triángulo, Partido de Malvinas Argentinas, Buenos Aires, B1619AGS, Argentina",
  "address": {
    "road": "Autopista Pedro Eugenio Aramburu",
    "village": "El Triángulo",
    "state_district": "Partido de Malvinas Argentinas",
    "state": "Buenos Aires",
    "ISO3166-2-lvl4": "AR-B",
    "postcode": "B1619AGS",
    "country": "Argentina",
    "country_code": "ar"
  },
  "boundingbox": [
    "-34.4415900",
    "-34.4370994",
    "-58.7086067",
    "-58.7044712"
  ]
}
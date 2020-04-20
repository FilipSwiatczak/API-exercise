Feature: Weather checker API
  Returns weather prediction JSON for a given postcode
  POST payload: {address: "postcode"}

  Scenario: Valid postcode returns 200 response
    Given request is sent for "W6 0NW" postcode
    Then expect status 200

  Scenario: Valid postcode has correct response structure
    Given request is sent for "W6 0NW" postcode
    Then response body matches structure below
    """
    {
      "latitude": "number",
      "longitude": "number",
      "timezone": "string",
      "currently": {
        "time": "date",
        "summary": "string",
        "icon": "string",
        "nearestStormDistance": "number",
        "nearestStormBearing": "number",
        "precipIntensity": "number",
        "precipProbability": "number",
        "temperature": "number",
        "apparentTemperature": "number",
        "dewPoint": "number",
        "humidity": "number",
        "pressure": "number",
        "windSpeed": "number",
        "windGust": "number",
        "windBearing": "number",
        "cloudCover": "number",
        "uvIndex": "number",
        "visibility": "number",
        "ozone": "number"
      }
    }
    """

  @negative
  Scenario: Non-existing address
    Given request is sent for "B99 9AA" postcode
    Then expect status 433
    And response body matches structure below
    """
    {"errorMessage":"Problem with Geocode API: Unable to find that address."}
    """

  @negative
  Scenario: Invalid address
    Given request is sent for "EC1A 1BB" postcode
    Then expect status 435
    And response body matches structure below
    """
    {"errorMessage":"Invalid Address"}
    """
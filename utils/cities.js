const BASE_URL = "https://api.opencagedata.com/geocode/v1/json";

export const fetchCities = async () => {
  const apiKey = "f93b206a9a984a939debfa1237f37cb9";
  const url = new URL(BASE_URL);
  const params = {
    key: apiKey,
    q: "city", // generic query for fetching cities
    limit: 100,
    no_annotations: 1,
    no_dedupe: 1,
    no_record: 1,
  };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.status.code === 200) {
      const cities = data.results
        .map((result) => result.components.city)
        .filter(Boolean);
      const uniqueCities = Array.from(new Set(cities));

      return uniqueCities.map((city) => ({
        value: city,
        label: city,
      }));
    } else {
      throw new Error(
        `Error fetching cities. API response: ${JSON.stringify(data)}`
      );
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

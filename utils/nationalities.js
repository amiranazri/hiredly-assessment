import axios from "axios";

const BASE_URL = "https://restcountries.com/v2/all";

export const fetchCountries = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.map((country) => ({
      value: country.alpha2Code,
      label: country.name,
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

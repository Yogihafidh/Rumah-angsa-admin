import { useEffect, useState } from "react";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchCountries() {
      try {
        const response = await fetch("https://flagcdn.com/en/codes.json");
        const data = await response.json();
        const countryOptions = Object.keys(data)
          .map((code) => ({
            value: code,
            label: data[code],
            flagUrl: `https://flagcdn.com/${code}.svg`,
            key: `${code}-${Math.random()}`,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
          
        setCountries(countryOptions);
      } catch (err) {
        console.error("Error fetching country flags:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCountries();
  }, []);

  return { countries, isLoading };
}

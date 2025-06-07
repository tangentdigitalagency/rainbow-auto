import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const API_KEY = "569ab44d89msh07109d50789c7e9p1018ffjsna87765bf2eb0";
const API_HOST = "car-api2.p.rapidapi.com";

interface Make {
  id: number;
  name: string;
}

interface ApiResponse {
  collection: {
    url: string;
    count: number;
    pages: number;
    total: number;
    next: string;
    prev: string;
    first: string;
    last: string;
  };
  data: Make[];
}

const fetchMakes = async (year: string): Promise<string[]> => {
  const url = `https://car-api2.p.rapidapi.com/api/makes?direction=asc&sort=name&year=${year}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      toast.error("There was an error fetching the makes");
      throw new Error("Network response was not ok: " + errorText);
    }

    const result: ApiResponse = await response.json();
    return result.data.map((make) => make.name);
  } catch (error) {
    console.error("Error fetching makes:", error);
    toast.error("There was an error fetching the makes");
    throw error;
  }
};

export const useCarMakes = (year: string) => {
  const query = useQuery<string[], Error>({
    queryKey: ["carMakes", year],
    queryFn: () => fetchMakes(year),
    enabled: !!year,
  });

  return {
    getMakes: query.refetch,
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
  };
};

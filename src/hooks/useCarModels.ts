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
    first: string;
    last: string;
  };
  data: Make[];
}

const fetchModels = async (year: string, make: string): Promise<string[]> => {
  const url = `https://car-api2.p.rapidapi.com/api/models?make=${make}&sort=id&direction=asc&year=${year}&verbose=yes`;

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
      toast.error("There was an error fetching the models");
      throw new Error("Network response was not ok: " + errorText);
    }

    const result: ApiResponse = await response.json();
    return result.data.map((model) => model.name);
  } catch (error) {
    toast.error("There was an error fetching the models");
    throw error;
  }
};

export const useCarModels = (year: string, make: string) => {
  const query = useQuery<string[], Error>({
    queryKey: ["carModels", year, make],
    queryFn: () => fetchModels(year, make),
    enabled: !!year && !!make,
  });

  return {
    getModels: query.refetch,
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
  };
};

import { useQuery } from "@tanstack/react-query";

const API_KEY = "569ab44d89msh07109d50789c7e9p1018ffjsna87765bf2eb0";
const API_HOST = "car-api2.p.rapidapi.com";

const fetchYears = async (): Promise<string[]> => {
  const url = "https://car-api2.p.rapidapi.com/api/years";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const years: number[] = await response.json();
  return years.map((year) => year.toString());
};

export const useCarYears = () => {
  const query = useQuery<string[], Error>({
    queryKey: ["carYears"],
    queryFn: fetchYears,
    staleTime: Infinity,
  });

  return {
    getYears: query.refetch,
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
  };
};

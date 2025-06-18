import { FormData } from "@/types/formData";
import { supabase } from "@/utils/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const getOrCreateUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
    document.cookie = `userId=${userId}; max-age=${
      60 * 60 * 24 * 365
    }; path=/; SameSite=Strict`;
  }

  console.log("userId", userId);
  return userId;
};

const fetchFormData = async (userId: string): Promise<FormData> => {
  console.log("Fetching form data with userId:", userId);

  const { data, error } = await supabase
    .from("formSubmissions")
    .select("*")
    .eq("userId", userId)
    .single();

  console.log("Fetched data:", data);

  if (error) {
    console.error("Error fetching form data:", error);
    return {};
  }

  if (data) {
    console.log("Fetched form data:", data);
    const { ...formDataFields } = data;
    return formDataFields as FormData;
  }

  console.log("No form data found");
  return {};
};

const useFormData = () => {
  const userId = getOrCreateUserId();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const urlUserId = searchParams.get("userId");

  // Effect to save URL userId data to local storage when first loaded
  useEffect(() => {
    if (urlUserId) {
      console.log("URL userId detected, saving to local storage");
      localStorage.setItem("userId", urlUserId);
      // Also save to cookie for persistence
      document.cookie = `userId=${urlUserId}; max-age=${
        60 * 60 * 24 * 365
      }; path=/; SameSite=Strict`;
    }
  }, [urlUserId]);

  const {
    data: formData = {},
    isLoading,
    refetch,
  } = useQuery<FormData>({
    queryKey: ["formData", urlUserId || userId],
    queryFn: () => fetchFormData(urlUserId || userId),
    staleTime: 0,
    gcTime: Infinity,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    enabled: true,
  });

  // Effect to refetch when URL userId changes or component mounts
  useEffect(() => {
    console.log("Refetching form data...");
    refetch();
  }, [urlUserId, refetch]);

  // Effect to ensure form data is properly cached
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      console.log("Caching form data:", formData);
      queryClient.setQueryData(
        ["formData", urlUserId || userId],
        (oldData: FormData | undefined) => ({
          ...oldData,
          ...formData,
        })
      );
    }
  }, [formData, queryClient, urlUserId, userId]);

  const mutation = useMutation({
    mutationFn: async (
      newData: Partial<FormData> & { lastCompletedStep?: string }
    ) => {
      const updatedData = {
        ...formData,
        ...newData,
        userId: urlUserId || userId,

        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep:
          newData.lastCompletedStep || formData.lastCompletedStep,
      };

      console.log("Updating form data:", updatedData);

      const { data, error } = await supabase
        .from("formSubmissions")
        .upsert(updatedData, { onConflict: "userId" });

      if (error) {
        console.error("Error updating form data:", error);
        throw error;
      }

      console.log("Successfully updated DB:", data);
      return data;
    },
    onSuccess: (_, variables) => {
      console.log("Mutation successful, updating cache");
      queryClient.setQueryData(
        ["formData", urlUserId || userId],
        (oldData: FormData | undefined) => ({
          ...oldData,
          ...variables,
          lastCompletedAt: new Date().toISOString(),
          lastCompletedStep:
            variables.lastCompletedStep || oldData?.lastCompletedStep,
        })
      );
    },
  });

  const deleteDriverTwo = async () => {
    console.log("deleteDriverTwo called with userId:", userId);
    const { data, error } = await supabase
      .from("formSubmissions")
      .update({
        driverTwoFirstName: null,
        driverTwoLastName: null,
        driverTwoDOB: null,
        driverTwoGender: null,
        driverTwoResidence: null,
        driverTwoYearAtResidence: null,
        driverTwoCredit: null,
        driverTwoRelationship: null,
        driverTwoMaritalStatus: null,
        driverTwoOccupation: null,
        driverTwoAgedLicensed: null,
        driverTwoLicenseState: null,
        driverTwoLicenseStatus: null,
        driverTwoSuspended: null,
        driverTwoFilingRequired: null,
        driverTwoDUI: null,
        driverTwoDUIDate: null,
        driverTwoDUIState: null,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: "drivers",
      })
      .eq("userId", userId);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("Supabase update successful:", data);

    // Update local cache
    queryClient.setQueryData(
      ["formData", urlUserId || userId],
      (oldData: FormData | undefined) => {
        if (!oldData) return oldData;
        const newData = { ...oldData };
        // Remove all driver two fields
        Object.keys(newData).forEach((key) => {
          if (key.startsWith("driverTwo")) {
            delete newData[key as keyof FormData];
          }
        });
        return {
          ...newData,
          lastCompletedAt: new Date().toISOString(),
          lastCompletedStep: "drivers",
        };
      }
    );

    return data;
  };

  const deleteVehicleTwo = async () => {
    console.log("deleteVehicleTwo called with userId:", userId);
    const { data, error } = await supabase
      .from("formSubmissions")
      .update({
        vehicleTwoYear: null,
        vehicleTwoMake: null,
        vehicleTwoModel: null,
        vehicleTwoTrim: null,
        vehicleTwoOwnership: null,
        vehicleTwoPrimaryUsage: null,
        vehicleTwoOneWayDistance: null,
        vehicleTwoAnnualMiles: null,
        vehicleTwoStorage: null,
        vehicleTwoComprehensive: null,
        vehicleTwoCollision: null,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: "vehicle-profile",
      })
      .eq("userId", userId);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("Supabase update successful:", data);

    // Update local cache
    queryClient.setQueryData(
      ["formData", urlUserId || userId],
      (oldData: FormData | undefined) => {
        if (!oldData) return oldData;
        const newData = { ...oldData };
        // Remove all vehicle two fields
        Object.keys(newData).forEach((key) => {
          if (key.startsWith("vehicleTwo")) {
            delete newData[key as keyof FormData];
          }
        });
        return {
          ...newData,
          lastCompletedAt: new Date().toISOString(),
          lastCompletedStep: "vehicle-profile",
        };
      }
    );

    return data;
  };

  const updateFormData = (
    newData: Partial<FormData> & { lastCompletedStep?: string }
  ) => {
    mutation.mutate(newData);
  };

  return {
    formData,
    updateFormData,
    deleteDriverTwo,
    deleteVehicleTwo,
    isLoading: mutation.isPending || isLoading,
    refetch,
  };
};

export default useFormData;

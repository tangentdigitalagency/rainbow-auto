import { FormData } from "@/types/formData";
import { supabase } from "@/utils/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

const getOrCreateUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
    document.cookie = `userId=${userId}; max-age=${
      60 * 60 * 24 * 365
    }; path=/; SameSite=Strict`;
  }
  return userId;
};

const fetchFormData = async (userId: string): Promise<FormData> => {
  const { data, error } = await supabase
    .from("formSubmissions")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error) {
    console.error("Error fetching form data:", error);
    return {};
  }

  if (data) {
    const { ...formDataFields } = data;
    return formDataFields as FormData;
  }

  return {};
};

const useFormData = () => {
  const userId = getOrCreateUserId();
  const queryClient = useQueryClient();

  const { data: formData = {}, refetch } = useQuery<FormData>({
    queryKey: ["formData", userId],
    queryFn: () => fetchFormData(userId),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: async (
      newData: Partial<FormData> & { lastCompletedStep?: string }
    ) => {
      const updatedData = {
        ...formData,
        ...newData,
        userId,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep:
          newData.lastCompletedStep || formData.lastCompletedStep,
      };

      const { data, error } = await supabase
        .from("formSubmissions")
        .upsert(updatedData, { onConflict: "userId" });

      if (error) throw error;

      console.log("updated DB", data);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["formData", userId],
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
      ["formData", userId],
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
      ["formData", userId],
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
    isLoading: mutation.isPending,
    refetch,
  };
};

export default useFormData;

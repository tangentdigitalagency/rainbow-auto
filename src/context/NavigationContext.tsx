import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

type NavigationContextType = {
  handleFormNavigation: (nextPath: string) => void;
  handleBack: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const handleFormNavigation = (nextPath: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const returnTo = searchParams.get("returnTo");

    if (returnTo) {
      navigate(`/${returnTo}`);
    } else {
      navigate(nextPath);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <NavigationContext.Provider value={{ handleFormNavigation, handleBack }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}

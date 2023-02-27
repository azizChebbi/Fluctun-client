import * as React from "react";
import { useMutation } from "react-query";
import FullPageSpinner from "@pages/FullPageSpinner";
import { api } from "api";
import { notifyError } from "@utils/notify";
import useLocalStorage from "@hooks/useLocalstorage";

const AuthContext = React.createContext<Auth | null>(null);
AuthContext.displayName = "AuthContext";

export type Auth = {
  logout: () => void;
  token: string;
  setToken: any;
};

function AuthProvider(props: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [token, setToken] = useLocalStorage<string | null>("at", null);

  const refresh = useMutation(() => api.post("/auth/refresh"), {
    onSuccess: (d) => {
      console.log(d);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  async function getAccessToken() {
    try {
      const res = await api.post("/auth/refresh");
      console.log(res);
      setToken(res.data.access_token);
    } catch (error) {
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getAccessToken();
    refresh.mutate();
  }, []);

  const logoutMutation = useMutation(() => api.post("/auth/logout"), {
    onSuccess: () => {
      setToken(null);
    },
    onError: () => {
      notifyError("Error has occured, try to refresh the page");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  const value = React.useMemo(
    () => ({ logout, token, setToken }),
    [logout, token, setToken]
  );

  return isLoading ? (
    <FullPageSpinner />
  ) : (
    <AuthContext.Provider value={value} {...props} />
  );
}

function useAuth() {
  const context = React.useContext(AuthContext) as Auth;
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };

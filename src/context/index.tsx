import { FC, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
import FallbackScreen from "@pages/FallbackScreen";
import { NotifyContainer } from "@utils/notify";
import { AuthProvider } from "./auth";

export const queryClient = new QueryClient();

interface IProps {
  children?: ReactNode;
}

const AppProviders: FC<IProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={FallbackScreen}>
        <NotifyContainer />
        <AuthProvider>{children}</AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default AppProviders;

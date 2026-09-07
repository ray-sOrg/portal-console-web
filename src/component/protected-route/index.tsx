import React, { PropsWithChildren, useState } from "react";
import { Spin } from "antd";
import { useMemoizedFn, useMount } from "ahooks";
import { Navigate, useSearchParams } from "react-router";
import { getLoginUserInfo } from "@/api";
import useGlobalStore from "@/store";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const callbackError = searchParams.get("auth_error");

  const setUser = useGlobalStore(state => state.setUser);

  const checkAuthentication = useMemoizedFn(() => {
    try {
      getLoginUserInfo().subscribe({
        next: res => {
          if (res.code === 200 && res.data.uuid) {
            setIsAuthenticated(true);
            setUser(res.data);
          } else {
            setIsAuthenticated(false);
          }
          setLoading(false);
        },
        error: () => {
          setIsAuthenticated(false);
          setLoginError("unavailable");
          setLoading(false);
        }
      });
    } catch {
      setIsAuthenticated(false);
      setLoginError("unavailable");
      setLoading(false);
    }
  });

  useMount(() => {
    if (!callbackError) checkAuthentication();
  });

  const authError = callbackError || loginError;
  if (authError) {
    return <Navigate to={`/login?${new URLSearchParams({ auth_error: authError })}`} replace />;
  }

  if (loading) {
    return <Spin spinning fullscreen />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

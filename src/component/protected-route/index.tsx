import React, { PropsWithChildren, useState } from "react";
import { Spin } from "antd";
import { useMemoizedFn, useMount } from "ahooks";
import { Navigate } from "react-router-dom";
import { getLoginUserInfo, get_oss_credentials } from "@/api";
import useGlobalStore from "@/store";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setUser = useGlobalStore(state => state.setUser);
  const setCredentials = useGlobalStore(state => state.setCredentials);

  const checkAuthentication = useMemoizedFn(() => {
    try {
      getLoginUserInfo().subscribe({
        next: res => {
          if (res.code === 200 && res.data.uuid) {
            setIsAuthenticated(true);
            setUser(res.data);
            try {
              get_oss_credentials().subscribe(res => {
                setCredentials(res);
              });
            } catch (error) {}
          } else {
            setIsAuthenticated(false);
          }
          setLoading(false);
        },
        error: () => {
          setIsAuthenticated(false);
          setLoading(false);
        }
      });
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  });

  useMount(() => checkAuthentication());

  if (loading) {
    return <Spin spinning fullscreen />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

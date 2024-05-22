import React, { PropsWithChildren, useState } from "react";
import { useMemoizedFn, useMount } from "ahooks";
import { Navigate } from "react-router-dom";
import { getLoginUserInfo } from "api";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = useMemoizedFn(() => {
    try {
      getLoginUserInfo().subscribe({
        next: res => {
          if (res.code === 200 && res.data.uuid) {
            console.log(res.data);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
          setLoading(false);
        },
        error: error => {
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
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

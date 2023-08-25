import { useRouter } from "next/router";
import React, { Component } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { onLoginRedux, onLogoutRedux } from "../../store/Authentication/Action";
function AuthComponent(RouteComponent) {
  function NewRouteComponent(props) {
    const { jwt } = props;
    const dispatch = useDispatch();
    const router = useRouter();
    let AuthenticationRedux = useSelector((state) => state.Authentication);
    useEffect(() => {
      //will store in local redux store
      Authorized(jwt, dispatch, router, AuthenticationRedux);
    }, []);
    //if not authorized in redux store and available jwt then  means store in redux
    const Authorized = async (
      jwtToken,
      dispatch,
      router,
      AuthenticationRedux
    ) => {
      try {
        if (!AuthenticationRedux.isAuthorized) {
          // console.log("get auth data", jwtDecode(jwtToken).email);
          // ------- employee db checkup  -----------------
          const response = await fetch("/api/auth/verifyuser", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emailID: jwtDecode(jwtToken).email }),
          });
          const res = await response.json();
          if (res.data.length > 0) {
            await dispatch(
              onLoginRedux({
                id: res.data[0].employee_id,
                email: res.data[0].email,
                name: res.data[0].name,
                role: res.data[0].role,
                logoURL: res.data[0].url,
              })
            );
          } else {
            fetch("/api/auth/logout", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then(async (response) => {
                router.push("/login");
                await dispatch(onLogoutRedux());
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      } catch (e) {
        // console.log(e);
        router.push("/500");
      }
    };

    return <RouteComponent {...props} />;
  }
  return NewRouteComponent;
}

export default AuthComponent;

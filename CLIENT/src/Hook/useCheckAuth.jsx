import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/slices/user.js";
import { useNavigate } from "react-router-dom";

function useCheckAuth() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthentication() {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      try {
        const response = await fetch("/api/v1/authentification/check-auth", {
          credentials: "include",
        });

        if (response.status === 401) {
          console.log("utilisateur non connecté sur le serveur");
          navigate("/");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          dispatch(login(data));
        } else {
          console.log(`Server error: ${response.status}`);
        }
      } catch (error) {
        console.log(`Fetch error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      fetchAuthentication();
    }, 2000);
  }, []);

  return [user, isLoading];
}

export default useCheckAuth;

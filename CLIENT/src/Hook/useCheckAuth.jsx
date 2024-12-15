import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loginFailed } from "../store/slices/user.js";
import { useNavigate } from "react-router-dom";

function useCheckAuth() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchAuthentication() {
      try {
        const response = await fetch("/api/v1/authentification/check-auth", {
          credentials: "include",
        });

        if (response.status === 401) {
          setErrorMessage(
            "Vous devez être connecté pour accéder à cette page."
          );
          dispatch(loginFailed());
          setIsLoading(false);
          return;
        }

        if (response.ok) {
          const data = await response.json();

          dispatch(login(data));
        } else {
          dispatch(loginFailed());
          setErrorMessage("Une erreur est survenue lors de la vérification.");
        }
      } catch (error) {
        setErrorMessage("Impossible de vérifier l'authentification.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuthentication();
  }, []);

  return [user, isLoading, errorMessage];
}

export default useCheckAuth;

export function validEmail(email, setErrorMessage) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.trim() === "") {
        setErrorMessage("L'adresse email est obligatoire.");
        return false;
    } else if (!emailRegex.test(email)) {
        setErrorMessage("L'adresse email n'est pas valide.");
        return false;
    }
    setErrorMessage("");
    return true;
}




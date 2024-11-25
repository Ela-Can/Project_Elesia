export function validEmail(email, error) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.trim() === "") {
        error.email = "L'adresse email est obligatoire.";
    } else if (!emailRegex.test(email)) {
        error.email = "L'adresse email n'est pas valide.";
        console.log(error.email); 
    }

    return
}

export function validSubjet(subject, error) {
    if (!subject) {
        error.subject = "Ce champ est requis";
    } 
    return
}

export function validContent(content, error) {
    if (!content || content.trim() === "") {
        error.content = "Ce champ est requis";
    } 
    return
}


async function fetchCategories() {
    const response = await fetch("api/v1/category/list",
    
        {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    if (!response.ok) {
        throw new Error('Erreur de récupération des catégories');
    }
    const data = await response.json();
    console.log("Catégories récupérées :", data);
    return data;
};

export default fetchCategories;
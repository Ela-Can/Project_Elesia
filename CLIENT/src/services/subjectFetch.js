async function fetchSubjects() {
    const response = await fetch(`/api/v1/subject/list`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    const data = await response.json();
    return data;
};

export default fetchSubjects;

let NODE_URL = 'https://simply-chiro.herokuapp.com/exclusions';

const dbGetExclusions = async () => {
    const response = await fetch(`${NODE_URL}`, {
        method: 'GET',
    });
    return await response.json();
}

const dbUpdateExclusions = async (data) => {
    return await fetch(`${NODE_URL}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export {
    dbUpdateExclusions,
    dbGetExclusions
}
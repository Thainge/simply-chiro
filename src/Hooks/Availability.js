let NODE_URL = 'https://simply-chiro.herokuapp.com/availability';

const dbGetAvailability = async () => {
    const response = await fetch(`${NODE_URL}`, {
        method: 'GET',
    });
    return await response.json();
}

const dbSetAvailability = async (data) => {
    return await fetch(`${NODE_URL}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}


export {
    dbGetAvailability,
    dbSetAvailability
}
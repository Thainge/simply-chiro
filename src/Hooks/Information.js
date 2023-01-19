let NODE_URL = 'https://simply-chiro.herokuapp.com/information';

const GetInformation = async () => {
    const response = await fetch(`${NODE_URL}`, {
        method: 'GET',
    });
    return await response.json();
}

const addInformation = async (data) => {
    return await fetch(`${NODE_URL}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

const updateInformation = async (data) => {
    const response = await fetch(`${NODE_URL}/${data.id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

const deleteInformation = async (id) => {
    const response = await fetch(`${NODE_URL}/${id}`, {
        method: "delete",
    });
    return await response.json();
}

export {
    GetInformation,
    addInformation,
    updateInformation,
    deleteInformation
}
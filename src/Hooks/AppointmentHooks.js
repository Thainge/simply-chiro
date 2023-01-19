let NODE_URL = 'https://simply-chiro.herokuapp.com/appointments';

const GetAllAppointments = async (userID) => {
    const response = await fetch(`${NODE_URL}`, {
        method: 'GET',
    });
    return await response.json();
}

const GetAppointments = async (userID) => {
    const response = await fetch(`${NODE_URL}/${userID}`, {
        method: 'GET',
    });
    return await response.json();
}

const AddAppointment = async (data) => {
    return await fetch(`${NODE_URL}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

const ChangeAppointmentDate = async (appID, data) => {
    const response = await fetch(`${NODE_URL}/changedate/${appID}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

const CancelAppointment = async (appID) => {
    const response = await fetch(`${NODE_URL}/${appID}`, {
        method: "put",
    });
    return await response.json();
}

export {
    GetAllAppointments,
    GetAppointments,
    AddAppointment,
    CancelAppointment,
    ChangeAppointmentDate
}
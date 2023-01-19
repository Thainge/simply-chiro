let NODE_URL = 'https://simply-chiro.herokuapp.com/coupons';

const QueryCoupons = async (text) => {
    const response = await fetch(`${NODE_URL}/${text}`, {
        method: 'GET',
    });
    return await response.json();
}

/* Secure Admin Panel */
const GetCoupons = async () => {
    const response = await fetch(`${NODE_URL}`, {
        method: 'GET',
    });
    return await response.json();
}

const AddCoupon = async (data) => {
    return await fetch(`${NODE_URL}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

const updateCoupon = async (data) => {
    const response = await fetch(`${NODE_URL}/${data.id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

const DeleteCoupon = async (id) => {
    const response = await fetch(`${NODE_URL}/${id}`, {
        method: "delete",
    });
    return await response.json();
}

export {
    QueryCoupons,
    GetCoupons,
    AddCoupon,
    DeleteCoupon,
    updateCoupon
}
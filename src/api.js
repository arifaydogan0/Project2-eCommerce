import axios from "axios";

export const fetchProductList = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products?page=${pageParam}&limit=12`);
    //pageParam yani sayfa numarası

    return data;
};

export const fetchProductNonePageLimit = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products`);
    return data;
};

export const fetchProduct = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products/?id=${id}`);

    return data;
};

export const postProduct = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/products`, input
    );

    return data;
};

//tüm kategoriler sekmesinden gelecek API'lar
export const fetchCamMalzeme = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products`);
    const camMalzeme = data.filter(product => product.category === 1);
    return camMalzeme;
};

export const fetchPipet = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products`);
    const pipet = data.filter(product => product.category === 2);
    return pipet;
};

export const fetchHacimselOlcum = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products`);
    const hacimselOlcum = data.filter(product => product.category === 3);
    return hacimselOlcum;
};

//user eklenmesi, yani yeni kullanıcının eklenmesi.
export const fetchRegister = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/users`, input);

    return data;
}

//kullanıcı giris islemleri.
export const fetchLogin = async (email) => {
    const allUser = await getAllUsers();
    const user = allUser.find((item) => item.email === email);
    console.log("api", user)
    return user;
}

//user'ların cekilmesi
export const getAllUsers = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/users`);

    return data;
}

export const controllerUserMail = async (mail) => {
    // üye olan tüm kullanıcıları çektik
    const allUser = await getAllUsers();

    // bu kullanıcıların içinde email'i form'daki email olan var mı?
    return allUser.find(user => user.email === mail);

};

export const controllerUserPassword = async (password) => {
    const allUser = await getAllUsers();

    // password kontrol
    return allUser.find(user => user.password === password);
}


export const fetchMe = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/users`);

    return data;
};

export const fetchLogout = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/users`);

    return data;
};

export const postOrder = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/order`, input);

    console.log(input);
    return data;
};

export const fetchOrder = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/order`);

    return data;
};


//admin/products sayfasından ürün silmek 

export const deleteProduct = async (id) => {
    console.log(id)
    const { data } = await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/products/?id=${id}`);

    return data;
};


export const updateProduct = async (input, id) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_ENDPOINT}/products/${id}`, input);

    return data;
};


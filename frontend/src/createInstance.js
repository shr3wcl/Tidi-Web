import axios from "axios";
import jwt_decode from "jwt-decode";

const instance = axios.create({
    baseURL: "http://localhost:8000/",
    timeout: 1000,
});

const refreshToken = async (token) => {
    try {
        const res = await instance.post("v1/auth/refresh", '', {headers: {refreshToken: token}});
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const createAxios = (user, accessToken, reToken, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken(reToken);
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers["token"] = "Bearer " + data.accessToken;
            }
            else{
                config.headers["token"] = "Bearer " + accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};

export {createAxios, instance}

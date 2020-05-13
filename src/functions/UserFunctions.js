import axios from 'axios';
import { ipAddress } from "../config";

export default register = (user) => {
    return axios.post(ipAddress + "api/users", {
        username: user.username,
        email: user.email
    }).then(res => {
        if(res.data.message) {
            return res.data;
        }
        return res.data;
    })
        .catch(err => {
            console.log(err);
    });
};
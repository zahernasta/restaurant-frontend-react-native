import axios from 'axios';

export default register = (user) => {
    return axios.post("http://192.168.1.100:8080//api/users", {
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
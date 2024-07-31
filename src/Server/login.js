import axios from "axios";


// eslint-disable-next-line no-unused-vars
export const login = ()=> {
    axios.post('http://localhost:5000/api/user/login', {
    "name": "cato",
    "password": "1234",
    "email": "djshkd",
    "gender": "sjhk",
    "age": 18,
    "deleted": 0,
    "created_by": "cato",
    "update_by": "cato"
    }).then((response)=> {
        console.log('llego');3
        console.log(response.data);
    }).catch((error) => {
        console.log(error)
    })
}


const axios = require('axios').default

export const register = async  (username,password) => {
    try{
        axios.defaults.withCredentials = true
        const res = await axios.post('http://localhost:9090/register', {
            username,
            password
        })
        return res.data
    }catch(err){
        console.log(err)
    }
}

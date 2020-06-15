const axios = require('axios').default

export const isLoggedIn = async () => {
    try{
        axios.defaults.withCredentials = true
        const res = await axios.post('http://localhost:9090/isloggedin')

        return res.data

    }catch(err){
        console.log(err)
    }
}

const axios = require('axios').default

export const submitAvaliation = async  (data) => {
    try{
        axios.defaults.withCredentials = true
        const res = await axios.post('http://localhost:9090/submitavaliation', data)
        return res.data
        
    }catch(err){
        console.log(err)
    }
}
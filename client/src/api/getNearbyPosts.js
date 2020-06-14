const axios = require('axios').default

export const getNearbyPost = async  (position) => {
    try{
        const res = await axios.post('http://localhost:9090/nearby/', position)
        return res.data
    }catch(err){
        console.log(err)
    }
}
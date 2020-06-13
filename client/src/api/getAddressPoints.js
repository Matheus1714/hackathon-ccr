const axios = require('axios').default

export const getNearbyPost = async  (address) => {
    try{
        const res = await axios.get('http://localhost:9090/', {
            address
        })
        const data = await data.json()

        return data
    }catch(err){
        console.log(err)
    }
}
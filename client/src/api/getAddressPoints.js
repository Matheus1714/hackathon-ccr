const axios = require('axios').default

export const getAddressPoints = async  (address, radius) => {
    try{
        const res = await axios.post('http://localhost:9090/searchbyaddress', {
            address,
            radius
        })
        return res.data
        
    }catch(err){
        console.log(err)
    }
}
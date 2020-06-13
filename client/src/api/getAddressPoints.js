const axios = require('axios').default

export const getAddressPoints = async  (address) => {
    try{
        const res = await axios.get('http://localhost:9090/searchbyaddress', {
            address
        })
        const data = await data.json()

        return data
    }catch(err){
        console.log(err)
    }
}
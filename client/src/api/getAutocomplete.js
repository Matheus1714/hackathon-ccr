const axios = require('axios').default

export const getAutocomplete = async  (text) => {
    try{
        axios.defaults.withCredentials = true
        const res = await axios.post('http://localhost:9090//autocomplete', {
            string: text
        })
        return res.data
    }catch(err){
        console.log(err)
    }
}
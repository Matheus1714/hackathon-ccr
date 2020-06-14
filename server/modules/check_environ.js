module.exports = function (env_list){
    for (env of env_list){
        if (!(env in process.env)){
            console.error(`${env} must be on environment`);
            process.exit(1);
        }
    }
}

const axios = require("axios");
const connect = require('./connect');

const getPoints = async (callback) => {
    await connect.getHeadersGM((err, headers) => {
        let credential = headers.credential;
        if(err){
            callback(err)
        }
        axios.get(process.env.NEURONEGM+'/api/'+credential.app_code+'/points',headers.headers ).then((response)=> {
            callback(null, response.data.data)
        }).catch((err) => {
            callback(err);
        })
    });
}

const postPoint = async (point, callback) => {
    await connect.getHeadersGM((err, headers) => {
        let credential = headers.credential;
        if(err){
            callback(err)
        }
        axios.post(process.env.NEURONEGM+'/api/'+credential.app_code+'/points', point, headers ).then((response)=> {
            callback(null, response.data.data)
        }).catch((err) => {
            callback(err);
        })
    });
}

const updatePoint = async (point, code, callback) => {
    await connect.getHeadersGM((err, headers) => {
        let credential = headers.credential;
        if(err){
            callback(err)
        }
        axios.put(process.env.NEURONEGM+'/api/'+credential.app_code+'/points/'+code, point, headers ).then((response)=> {
            callback(null, response.data.data)
        }).catch((err) => {
            callback(err);
        })
    });
}

const deletePoint = async (code, callback) => {
    await connect.getHeadersGM((err, headers) => {
        let credential = headers.credential;
        if(err){
            callback(err)
        }
        axios.delete(process.env.NEURONEGM+'/api/'+credential.app_code+'/points/'+code, headers ).then((response)=> {
            callback(null, response.data.data)
        }).catch((err) => {
            callback(err);
        })
    });
}

const point = {
    getPoints,
    postPoint,
    updatePoint,
    deletePoint
};

module.exports = point;
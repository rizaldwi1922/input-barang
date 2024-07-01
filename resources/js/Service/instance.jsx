export const httpInstance = async (endpoint, method, data = null) => {
    let response = {
        data:{},
        error:'',
        success:false
    }
    let url = endpoint
    await axios({
        url: url,
        method: method,
        timeout: 300000,
        data:data,
        // headers: {
        //     'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`
        // }
    })
        .then(res => {
            var data = res.data
            response.data = data
            response.success = true
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 403) {
                    // window.location.href = '/login/logout'
                }
                response = {
                    'data':{},
                    'success': false
                , ...err.response.data}
            } else {
                response = {
                    'data':{},
                    'error': String(err),
                    'success': false
                }
            }
            
        })
    return response
}
export function Fetch(method, url, headers, data) {

    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
        throw new Error(method + ' not supported')
    }

    let core = {
        method: method.toUpperCase(),
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data !== undefined ? data : {}), 
        headers: new Headers(headers !== undefined ? headers : {})
    }

    if (method.toUpperCase() === 'GET') {
        delete core.body
    }

    return fetch(url, core)
            .then(res => res.json())
            .catch(err => err)
}
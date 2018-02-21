
function GET(url, auth) {
    let content = {
        'Accept': 'application/json'
    }

    if (auth !== undefined) {
        content['Authorization'] = auth
    }
    
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: new Headers(content)
    }).then(res => res.json())
    .catch(err => err)
}

function POST(url, data, auth) {
    let content = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (auth !== undefined) {
        content['Authorization'] = auth
    }

    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data), 
        headers: new Headers(content)
      }).then(res => res.json())
      .catch(err => err)
}

export { GET, POST }
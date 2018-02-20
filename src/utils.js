
function GET(url, auth) {
    let content = {
        'Accept': 'application/json'
    }

    if (auth !== undefined) {
        content['Authorization'] = auth
    } 
    
    return fetch(url, {
        method: 'GET',
        mode: 'CORS',
        headers: new Headers(content)
    }).then(res => res.json())
    .catch(err => err)
}

function POST(url, data, auth) {
    let content = {
        'Content-Type': 'application/json'
    }

    if (auth !== undefined) {
        content['Authorization'] = auth
    } 

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: new Headers(content)
      }).then(res => res.json())
      .catch(err => err)
}

export { GET, POST }
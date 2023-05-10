
export const sendBasicRequest = async(url, method, body, headers) => {
    const init = {
        method,
        body: JSON.stringify(body),
        headers: {
            ...headers,
            'Content-Type': 'application/json' // pridajte toto
        }
    };

    if(body === null)
        init.body = undefined;

    const request = await fetch(url, init);

    let data = null;
    if(request.status !== 204){
        data = await request.json();
    }
    // if(!request.ok)
    //     return { data: data, error: true, ok: false, statusCode: request.status, errorObj: null, errorMessage: null};

    try{
        if(request.status !== 200 && request.status !== 201){
            return { data: data, error:true, ok: true, statusCode: request.status, errorObj: data.error, errorMessage: data.message};
        }
        return { data: data, error: false, ok: true, statusCode: request.status, errorObj: null, errorMessage: null };
    } catch (e){
        return { data: data, error:true, ok: true, statusCode: request.status, errorObj: e, errorMessage: e.message};
    }

}
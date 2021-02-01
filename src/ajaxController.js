function ajaxController({url, method='GET', data}) {
    const abortController = new AbortController();
    return {
        call: async () => {
            try {
                const response = await fetch(url, {
                    signal: abortController.signal,
                    method,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                });
                return await response.json();
            }catch(e) {
                return e;
            }
        },
        abort: abortController.abort
    };
};
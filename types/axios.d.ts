type Data = {
    code: number;
    data: any;
    msg: string;
}

interface Response {
    data: Data;
    status: number;
    headers: any;
    config: any;
    request: any;
}

export {
    Data,
    Response
}
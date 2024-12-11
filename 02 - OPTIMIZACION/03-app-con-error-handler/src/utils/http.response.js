const HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
};

class HttpResponse {
    Ok(res, data){
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data
        })
    };

    NotFound(res, data){
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            error: data
        })
    }
}

export const httpResponse = new HttpResponse();
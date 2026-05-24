class ApiError extends Error {
    public readonly status: number;
    public readonly message: string;

    constructor(status: number, message: string) {
        super(message);
        this.message = message;
        this.status = status;
    }

    static badRequest(message: string = 'Bad request') {
        return new ApiError(400, message);
    }

    static unauthorized(message: string = 'Unauthorized') {
        return new ApiError(401, message);
    }

    static forbidden(message: string = 'Forbidden') {
        return new ApiError(403, message);
    }

    static notFound(message: string = 'Not found') {
        return new ApiError(404, message);
    }

    static internal(message: string = 'Internal server error') {
        return new ApiError(500, message);
    }
}

export default ApiError;

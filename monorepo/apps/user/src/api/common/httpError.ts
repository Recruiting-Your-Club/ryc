class HttpError extends Error {
    statusCode: number;
    errorResponse: unknown;

    constructor(statusCode: number, message: string, errorResponse?: unknown) {
        super(message); // 상속받은 Error의 변수에 값 대입 -> 클래스에 따로 정의 x
        this.statusCode = statusCode;
        this.errorResponse = errorResponse;
        this.name = 'HttpError'; // 이것도 상속받은 Error의 변수에 값 대입 -> 클래스에 따로 정의 x
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
    }
}
export { HttpError };

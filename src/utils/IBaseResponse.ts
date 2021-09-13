/**
 * BaseResponse interface.
 */
export interface IBaseResponse<Response> {
    success: boolean,
    status: number,
    message: string,
    data?: Response
}

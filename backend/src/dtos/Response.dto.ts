export class ResponseDTO {
    success: boolean;
    message: string;
    status: number;
    data: any;

    constructor(success: boolean, message: string, status: number, data: any = null) {
        this.success = success;
        this.message = message;
        this.status = status;
        this.data = data;
    }
} 
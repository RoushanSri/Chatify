export default class ResposeError extends Error {
    constructor(message, status){
        super(message)
        this.message=message
        this.statusCode=status
    }
}
export const createError = (status, message) => {
    const err = new Error();
    err.status = status; // Fix this line
    err.message = message;

    return err;
}

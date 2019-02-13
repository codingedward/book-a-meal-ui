const singleError = (errorPayload) => {
    if (errorPayload && errorPayload.data) {
        const response = errorPayload.data;
        // alternative to Object.keys...
        for (let errorKey in response.errors) {
            return response.errors[errorKey]
        }
        if (response.message) {
            return response.message;
        }    
    }
    return 'Unknown error. Please try again.';
 }

export default singleError;

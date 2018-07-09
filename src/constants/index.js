export const BASE_URL = 'http://localhost:8000/api/v1';
export const IMAGES_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/codingedward/image/upload';

export const Status = {
    DEFAULT: -1,
    STARTED: 0,
    SUCCESS: 1,
    FAIL: 2,

}

export const Role = {
    SUPER_ADMIN: 0,
    ADMIN: 1,
    USER: 2,
}

export  const EntryType = {
    TEXT: 0,
    NUMBER: 1,
    IMAGE: 2,
    DATE: 3,
}


export default function authenticated() {
    return localStorage.getItem('token') !== null;
}

export function uniqid(prefix: string = '') {
    return `${prefix}${Math.random().toString(36).slice(2)}`;
}

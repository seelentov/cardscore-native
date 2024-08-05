export function encodeURIComponentSafe(str: string): string {
    return encodeURIComponent(str).replace(/%20/g, '+');
}
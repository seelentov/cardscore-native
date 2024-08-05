export function encodeUrl(url: string): string {
    return encodeURIComponent(url).replace('/', "%2F").replace(':', "%3A");
}
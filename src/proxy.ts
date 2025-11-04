import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest): Promise<NextResponse> {
    const requestHeaders = new Headers(req.headers)

    const [cspHeader, nonce] = createCsp()
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set('Content-Security-Policy', cspHeader)

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
}

function createCsp(): [string, string] {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
        style-src 'self' 'nonce-${nonce}' https://cdn.nav.no;
        img-src 'self' blob: data:;
        font-src 'self' https://cdn.nav.no;
        object-src 'self';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
    `
        .replace(/\s{2,}/g, ' ')
        .trim()

    return [cspHeader, nonce]
}

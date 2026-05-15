import crypto from "crypto";

/**
 * Signed download tokens. Lightweight, stateless, no DB required.
 * Token shape: base64url(payload).hex(hmac)
 * payload = JSON({ slug, format, exp, oid })
 */

interface TokenPayload {
  slug: string;
  format: string;
  exp: number; // ms epoch
  oid: string; // stripe checkout session id (for tracing)
}

function getSecret(): string {
  const s = process.env.DOWNLOAD_SIGNING_SECRET;
  if (!s || s === "replace_me_with_64_hex_chars") {
    throw new Error("DOWNLOAD_SIGNING_SECRET is not configured");
  }
  return s;
}

function b64url(buf: Buffer | string): string {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string): Buffer {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return Buffer.from(s, "base64");
}

export function signDownloadToken(opts: {
  slug: string;
  format: string;
  oid: string;
  ttlHours?: number;
}): string {
  const ttl = opts.ttlHours ?? Number(process.env.DOWNLOAD_TOKEN_TTL_HOURS || 168);
  const payload: TokenPayload = {
    slug: opts.slug,
    format: opts.format,
    oid: opts.oid,
    exp: Date.now() + ttl * 3600_000,
  };
  const body = b64url(JSON.stringify(payload));
  const mac = crypto.createHmac("sha256", getSecret()).update(body).digest("hex");
  return `${body}.${mac}`;
}

export function verifyDownloadToken(token: string): TokenPayload | null {
  try {
    const [body, mac] = token.split(".");
    if (!body || !mac) return null;
    const expected = crypto.createHmac("sha256", getSecret()).update(body).digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
    const payload = JSON.parse(fromB64url(body).toString("utf8")) as TokenPayload;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

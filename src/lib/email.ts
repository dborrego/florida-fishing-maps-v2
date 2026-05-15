import { Resend } from "resend";
import { absoluteUrl } from "./utils";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

const FROM = process.env.ORDER_FROM_EMAIL || "Florida Fishing Maps <orders@floridafishingmaps.com>";
const REPLY_TO = process.env.ORDER_REPLY_TO || "support@floridafishingmaps.com";

interface OrderEmailInput {
  to: string;
  productName: string;
  formatLabel: string;
  spotCount: number;
  downloadUrl: string;
  expiresHours: number;
}

export async function sendOrderEmail(input: OrderEmailInput) {
  const { to, productName, formatLabel, spotCount, downloadUrl, expiresHours } = input;
  const subject = `Your ${productName} download is ready`;

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#040A14;font-family:Inter,Arial,sans-serif;color:#F8FAFC;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="border-bottom:1px solid rgba(0,229,255,.2);padding-bottom:18px;margin-bottom:28px;">
      <div style="font-size:20px;font-weight:700;letter-spacing:-.01em;">
        Florida<span style="color:#00E5FF">Fishing</span>Maps
      </div>
    </div>

    <h1 style="font-size:26px;line-height:1.2;margin:0 0 16px;color:#F8FAFC;">
      You're locked in. Spots ready to load.
    </h1>

    <p style="font-size:15px;line-height:1.6;color:#cbd5e1;margin:0 0 24px;">
      Thanks for buying <strong style="color:#F8FAFC">${productName}</strong> —
      <strong style="color:#F8FAFC">${spotCount}</strong> GPS-verified fishing
      spots packaged for <strong style="color:#F8FAFC">${formatLabel}</strong>.
    </p>

    <div style="background:rgba(15,34,64,.5);border:1px solid rgba(0,229,255,.2);border-radius:12px;padding:24px;margin-bottom:24px;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:.2em;color:#00E5FF;margin-bottom:10px;font-family:monospace;">
        Your Download
      </div>
      <a href="${downloadUrl}"
         style="display:inline-block;background:#FF6B47;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;font-size:15px;">
        Download My Maps →
      </a>
      <div style="font-size:12px;color:#94a3b8;margin-top:12px;">
        Link is active for ${expiresHours} hours.
        Lost it later? Reply to this email and we'll send a fresh one.
      </div>
    </div>

    <h2 style="font-size:16px;color:#F8FAFC;margin:28px 0 8px;">How to load on your chartplotter</h2>
    <ol style="font-size:14px;line-height:1.7;color:#cbd5e1;padding-left:18px;margin:0 0 24px;">
      <li>Download the file (button above) and save it to a blank SD card.</li>
      <li>Plug the SD card into your chartplotter.</li>
      <li>Use your unit's Import / My Data / Files menu to load the spots.</li>
      <li>Spots appear as labeled waypoints. Pick one and route to it.</li>
    </ol>
    <p style="font-size:14px;color:#cbd5e1;line-height:1.6;">
      A brand-specific PDF guide is included in the download. Stuck? Reply to this email.
    </p>

    <div style="border-top:1px solid rgba(0,229,255,.15);margin-top:32px;padding-top:18px;">
      <p style="font-size:12px;color:#64748b;margin:0;line-height:1.5;">
        Florida Fishing Maps — Reply to this email for support, or write
        <a href="mailto:support@floridafishingmaps.com" style="color:#00E5FF;">support@floridafishingmaps.com</a>.
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `Your ${productName} download is ready.

${spotCount} GPS-verified fishing spots, packaged for ${formatLabel}.

Download: ${downloadUrl}
(Link active for ${expiresHours} hours.)

How to load:
1. Download the file and save it to a blank SD card.
2. Plug the SD card into your chartplotter.
3. Use Import / My Data / Files to load the spots.
4. Spots appear as labeled waypoints.

A brand-specific PDF guide is included.

Need help? Reply to this email.

Florida Fishing Maps
${absoluteUrl()}`;

  return resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    text,
    replyTo: REPLY_TO,
  });
}

export async function sendAdminNotification(opts: {
  productName: string;
  formatLabel: string;
  customerEmail: string;
  amountCents: number;
  oid: string;
}) {
  const to = process.env.ADMIN_NOTIFY_EMAIL;
  if (!to) return;
  const amount = (opts.amountCents / 100).toFixed(2);
  return resend.emails.send({
    from: FROM,
    to,
    subject: `💰 New order: ${opts.productName} — $${amount}`,
    text: `New paid order:

Product: ${opts.productName}
Format: ${opts.formatLabel}
Customer: ${opts.customerEmail}
Amount: $${amount}
Stripe session: ${opts.oid}

View in Stripe: https://dashboard.stripe.com/payments`,
  });
}

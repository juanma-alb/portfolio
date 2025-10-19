import { NextResponse } from "next/server";
import { z } from "zod";

const BodySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = BodySchema.parse(json);

        const hasResend = Boolean(process.env.RESEND_API_KEY);
        const hasSmtp =
            Boolean(process.env.SMTP_HOST) &&
            Boolean(process.env.SMTP_PORT) &&
            Boolean(process.env.SMTP_USER) &&
            Boolean(process.env.SMTP_PASS) &&
            Boolean(process.env.SMTP_FROM) &&
            Boolean(process.env.SMTP_TO);

        if (!hasResend && !hasSmtp) {
            console.log("[contact:mock]", body);
            return NextResponse.json({ ok: true, mocked: true });
        }

        if (hasResend) {
            const { Resend } = await import("resend");
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: process.env.SMTP_FROM || "contacto@example.com",
                to: [process.env.SMTP_TO || "owner@example.com"],
                subject: `Nuevo mensaje de ${body.name}`,
                reply_to: body.email,
                text: body.message,
            });
            return NextResponse.json({ ok: true, provider: "resend" });
        }

        if (hasSmtp) {
            type NodemailerLike = {
                createTransport: (options: {
                    host?: string;
                    port?: number;
                    secure?: boolean;
                    auth?: { user?: string; pass?: string };
                }) => {
                    sendMail: (opts: {
                        from?: string;
                        to?: string;
                        subject?: string;
                        replyTo?: string;
                        text?: string;
                    }) => Promise<unknown>;
                };
            };

            const { default: nodemailer } = (await import("nodemailer")) as unknown as {
                default: NodemailerLike;
            };
            const smtpHost = process.env.SMTP_HOST!;
            const smtpPort = parseInt(process.env.SMTP_PORT!, 10);
            const smtpUser = process.env.SMTP_USER!;
            const smtpPass = process.env.SMTP_PASS!;
            const smtpFrom = process.env.SMTP_FROM!;
            const smtpTo = process.env.SMTP_TO!;

            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: Number.isNaN(smtpPort) ? 587 : smtpPort,
                secure: false,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            });

            await transporter.sendMail({
                from: smtpFrom,
                to: smtpTo,
                subject: `Nuevo mensaje de ${body.name}`,
                replyTo: body.email,
                text: body.message,
            });

            return NextResponse.json({ ok: true, provider: "smtp" });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Solicitud inválida" },
            { status: 400 },
        );
    }
}



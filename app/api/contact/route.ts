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

     const nodemailer = (await import("nodemailer")).default as any;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO,
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

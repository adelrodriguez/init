import { render } from "@react-email/render"
import { SendEmailError } from "@this/common/errors"
import env from "@this/env/email.server"
import { logger, styles } from "@this/observability/logger"
import type { ReactElement } from "react"

import client from "#client.ts"

export async function sendEmail({
  body,
  emails,
  subject,
  sendAt,
  from = env.EMAIL_FROM,
}: {
  emails: string[]
  subject: string
  // Setting the body as unknown and then casting it later to a ReactElement to
  // allow for any type of ReactElement, since Hono's JSX leads to type errors.
  body: unknown
  sendAt?: Date | string
  from?: string
}) {
  if (env.MOCK_RESEND) {
    const text = await render(body as ReactElement, { plainText: true })
    mockEmail(emails, text)

    return
  }

  const { error } = await client.emails.send({
    from,
    to: emails,
    react: body as ReactElement,
    subject,
    scheduledAt: typeof sendAt === "string" ? sendAt : sendAt?.toISOString(),
  })

  if (error) {
    throw new SendEmailError(
      { name: error.name, message: error.message, emails },
      error
    )
  }
}

export async function queueEmail({
  emails,
  subject,
  body,
  from = env.EMAIL_FROM,
}: {
  emails: string[]
  subject: string
  from?: string
  body: unknown
}) {
  if (env.MOCK_RESEND) {
    const text = await render(body as ReactElement, { plainText: true })

    mockEmail(emails, text, true)

    return
  }

  const { publishJob, resend } = await import("@this/queue/jobs")

  await publishJob({
    api: {
      name: "email",
      provider: resend({ token: env.RESEND_API_KEY }),
    },
    body: {
      from,
      to: emails,
      subject,
      react: body as ReactElement,
    },
  })
}

function mockEmail(emails: string[], html: string, isQueued = false) {
  logger.warn(styles.bold.yellowBright("📪 env.MOCK_RESEND is set!"))

  if (isQueued) {
    logger.info(styles.green("📫 Queueing email to", emails.join(", ")))
  } else {
    logger.info(styles.green("📫 Sending email to", emails.join(", ")))
  }

  logger.info(styles.green("📝 Email content:"))
  logger.info(styles.gray("----------------------------------------"))
  logger.info(styles.gray.italic(html))
  logger.info(styles.gray("----------------------------------------"))
}

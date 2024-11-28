/**
 * Custom error class for handling errors in a consistent way.
 * Use this to create specific error types for your application.
 */
class CustomError extends Error {
  constructor(name: string, message: string, cause?: unknown) {
    super(message)
    this.name = name
    if (cause) {
      this.cause = cause
    }
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string, cause?: unknown) {
    super("DatabaseError", message, cause)
  }
}

export class InternalError extends CustomError {
  constructor(message: string, cause?: unknown) {
    super("InternalError", message, cause)
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, cause?: unknown) {
    super("NotFoundError", message, cause)
  }
}

export class SendEmailError extends CustomError {
  constructor(
    { email, name, message }: { email: string; name: string; message: string },
    cause?: unknown
  ) {
    super(
      "SendEmailError",
      `Error sending email to ${email}. ${name}: ${message}`,
      cause
    )
  }
}
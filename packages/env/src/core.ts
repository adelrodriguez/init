import { createEnv } from "@t3-oss/env-core"
import * as z from "@this/validation"

export default createEnv({
  shared: {
    NODE_ENV: z.env().default("development"),
    ENVIRONMENT: z.env().default("development"),
    IS_DEVELOPMENT: z.boolean().default(true),
    IS_PRODUCTION: z.boolean().default(false),
    IS_TEST: z.boolean().default(false),
  },
  server: {},
  runtimeEnv: {
    ...process.env,
    IS_DEVELOPMENT: process.env.ENVIRONMENT === "development",
    IS_PRODUCTION: process.env.ENVIRONMENT === "production",
    IS_TEST: process.env.ENVIRONMENT === "test",
  },
  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" || process.env.CI === "true",
  emptyStringAsUndefined: process.env.ENVIRONMENT === "production",
})

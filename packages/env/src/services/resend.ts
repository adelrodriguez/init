import { createEnv } from "@t3-oss/env-core"
import { getRuntimeEnv } from "@this/common/utils/runtime"
import { z } from "zod"

const runtimeEnv = await getRuntimeEnv()

export default createEnv({
  server: {
    EMAIL_FROM: z.string(),
    RESEND_API_KEY: z.string(),
    MOCK_RESEND: z.preprocess(v => v === "true", z.boolean().default(false)),
  },
  runtimeEnv,

  skipValidation:
    runtimeEnv.SKIP_ENV_VALIDATION === "true" || runtimeEnv.CI === "true",
  emptyStringAsUndefined: runtimeEnv.NODE_ENV === "production",
})

import { createEnv } from "@t3-oss/env-core"
import { getWorkerEnv, isNodeRuntime } from "@this/common/utils/runtime"
import { z } from "zod"

export default createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),
    BETTER_AUTH_TRUSTED_ORIGINS: z
      .preprocess(
        val => (typeof val === "string" ? val.split(",") : val),
        z.array(z.string().url())
      )
      .optional(),
  },
  runtimeEnv: isNodeRuntime ? process.env : await getWorkerEnv(),
})

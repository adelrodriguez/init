import {
  intro,
  isCancel,
  log,
  multiselect,
  outro,
  select,
  text,
} from "@clack/prompts"
import { runProcess, runScript } from "../tooling/utils"

const APPS = [
  {
    value: "web",
    label: "web - Next.js application deployed on Vercel",
  },
  {
    value: "api",
    label: "api - Hono API deployed on Cloudflare Workers",
  },
  {
    value: "mobile",
    label: "mobile - Expo application deployed with EAS",
  },
]

const PACKAGES = [
  {
    value: "ai",
    label: "ai - AI SDK and vector database for building AI applications",
  },
  {
    value: "analytics",
    label: "analytics - Web and product analytics",
  },
  {
    value: "auth",
    label: "auth - Authentication utilities",
  },
  {
    value: "common",
    label: "common - Shared utilities, helpers, assets, and type definitions",
  },
  {
    value: "db",
    label: "db - Database client and ORM using Drizzle",
  },
  {
    value: "email",
    label: "email - Email templating and sending service using Resend",
  },
  {
    value: "env",
    label: "env - Environment variable management and validation",
  },
  {
    value: "queue",
    label:
      "queue - Serverless job queue and workflow management using Inngest and Upstash Qstash",
  },
  {
    value: "kv",
    label: "kv - Redis client and vector database integration using Upstash",
  },
  {
    value: "observability",
    label:
      "observability - Logging, error tracking, and monitoring using Sentry and Axiom",
  },
  {
    value: "security",
    label: "security - Security utilities and best practices using Arcjet",
  },
  {
    value: "ui",
    label: "ui - Reusable UI components and design system using shadcn/ui",
  },
  {
    value: "validation",
    label: "validation - Shared data validation schemas using Zod",
  },
]

async function main() {
  intro("Add a workspace app or package")

  const workspaceType = await select({
    message: "Which type of workspace would you like to add?",
    options: [
      {
        value: "app",
        label: "App",
      },
      {
        value: "package",
        label: "Package",
      },
    ],
  })

  if (isCancel(workspaceType)) {
    outro("Canceled adding workspace")
    process.exit()
  }

  let workspaces: symbol | string[] = []

  switch (workspaceType) {
    case "app":
      workspaces = await multiselect({
        message: "Which app(s) would you like to add?",
        options: APPS,
      })

      break

    case "package":
      workspaces = await multiselect({
        message: "Which package(s) would you like to add?",
        options: PACKAGES,
      })

      break
    default:
      throw new Error("Invalid workspace type")
  }

  if (isCancel(workspaces)) {
    outro("Canceled adding package")
    process.exit()
  }

  for (const workspace of workspaces) {
    let workspaceName = workspace

    if (workspaceType === "app") {
      const appName = await text({
        message: `What is the name of the ${workspace} app?`,
        defaultValue: workspaceName,
      })

      if (isCancel(appName)) {
        outro("Canceled adding app")
        process.exit()
      }

      workspaceName = appName
    }

    runProcess("turbo", [
      "gen",
      "workspace",
      "--copy",
      `https://github.com/adelrodriguez/init/tree/main/${workspaceType}s/${workspace}`,
      "--type",
      workspaceType,
      "--name",
      workspaceName,
    ])

    log.success(`Added "${workspaceName}" ${workspaceType} to the workspace`)
  }

  outro("Done!")
}

runScript(main)

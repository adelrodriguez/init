import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import * as React from "react"

export default function OrganizationInvitation({
  organizationName,
  inviterName,
  inviterEmail,
  invitationUrl,
}: {
  organizationName: string
  inviterName: string
  inviterEmail: string
  invitationUrl: string
}) {
  return (
    <Html>
      <Head />
      <Preview>You've been invited to join {organizationName}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-10 max-w-2xl rounded-lg bg-white p-8 shadow-sm">
            <Section className="text-center">
              <Img
                src="/placeholder.svg?height=60&width=200"
                alt="Company Logo"
                className="mx-auto mb-6"
                width={200}
                height={60}
              />
            </Section>

            <Heading className="mb-6 text-center font-bold text-2xl text-gray-900">
              You've been invited to join {organizationName}
            </Heading>

            <Text className="mb-4 text-center text-base text-gray-600">
              {inviterName} ({inviterEmail}) has invited you to join the{" "}
              {organizationName} organization on our platform.
            </Text>

            <Text className="mb-8 text-center text-base text-gray-600">
              Join {organizationName} to start collaborating with your team
              members and access shared resources.
            </Text>

            <Section className="text-center">
              <Button
                href={invitationUrl}
                className="inline-block rounded-md bg-black px-6 py-3 font-medium text-base text-white no-underline"
              >
                Accept Invitation
              </Button>
            </Section>

            <Text className="mt-8 text-center text-gray-500 text-sm">
              If you don't want to join {organizationName} or believe this
              invitation was sent in error, please ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
    username:string,
  otp: string;
  
}

export default function VerificationEmail({
 username,
  otp,
 
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Your verification code is {otp}</Preview>

      <Body
        style={{
          backgroundColor: "#f6f9fc",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          margin: 0,
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            margin: "0 auto",
            padding: "40px",
            maxWidth: "500px",
            borderRadius: "8px",
          }}
        >
          <Heading
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#111827",
              textAlign: "center",
            }}
          >
            Verify your email
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              color: "#374151",
              lineHeight: "24px",
            }}
          >
            Hi { username || "there"},
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#374151",
              lineHeight: "24px",
            }}
          >
            Thanks for signing up! Please use the verification code below to
            verify your email address.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "30px 0",
            }}
          >
            <Text
              style={{
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                color: "#111827",
                display: "inline-block",
                fontSize: "32px",
                fontWeight: "700",
                letterSpacing: "8px",
                padding: "16px 24px",
              }}
            >
              {otp}
            </Text>
          </Section>

          <Text
            style={{
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: "20px",
            }}
          >
            This verification code will expire in 10 minutes. If you didn't
            request this code, you can safely ignore this email.
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#9ca3af",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            © {new Date().getFullYear()} Your App. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
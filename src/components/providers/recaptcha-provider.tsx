"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type Props = {
  children: React.ReactNode;
};

export function RecaptchaProvider({ children }: Props) {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!key) {
    return <>{children}</>;
  }
  return (
    <GoogleReCaptchaProvider reCaptchaKey={key} language="es">
      {children}
    </GoogleReCaptchaProvider>
  );
}

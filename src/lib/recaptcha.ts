const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE = 0.5;

export type RecaptchaVerifyResult = {
  success: boolean;
  score: number;
};

export async function verifyRecaptchaToken(
  token: string
): Promise<RecaptchaVerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return { success: false, score: 0 };
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  const verifyRes = await fetch(`${VERIFY_URL}?${params}`, {
    method: "POST",
  });

  const data = (await verifyRes.json()) as {
    success?: boolean;
    score?: number;
  };

  const score = typeof data.score === "number" ? data.score : 0;
  const tokenOk = Boolean(data.success);
  const success = tokenOk && score >= MIN_SCORE;

  return { success, score };
}

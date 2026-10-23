// Switches for parts of the site that only work once a service behind them is connected.
// Nothing on the site may promise something that doesn't work yet (owner, phase 5).

export const FEATURES = {
  /** Newsletter sign-up (header link and forms). Off until a mailing tool is connected; set
   *  NEXT_PUBLIC_FEATURE_NEWSLETTER=1 to show it again. */
  newsletter: process.env.NEXT_PUBLIC_FEATURE_NEWSLETTER === "1",
} as const;

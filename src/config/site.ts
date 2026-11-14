// Update this URL when moving to a custom domain, then redeploy.
export const site = {
  url: "https://rafifmuhmr-portfolio.vercel.app",
  name: "rafifmuhmr",
  owner: "Rafif Muhammad Muflihur Rodwa",
  role: "Frontend Developer & UI/UX Designer",
} as const;

export const isPreview = process.env.VERCEL_ENV === "preview";

// Update this URL when moving to a custom domain, then redeploy.
export const site = {
  url: "https://rafifmuhmr-portfolio.vercel.app",
  name: "rafifmuhmr",
  owner: "Rafif Muhammad Muflihur Rodwa",
  role: "UI/UX Designer, Frontend Developer & Graphic Designer",
} as const;

export const isPreview = process.env.VERCEL_ENV === "preview";

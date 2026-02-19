export const SITE_NAME = "EcoGlow Soap Solutions";
export const SITE_TAGLINE = "Pure Care in Every Drop.";
export const SITE_DESCRIPTION =
  "EcoGlow Soap Solutions is a leading manufacturer of high-quality, eco-friendly cleaning and hygiene products in Kenya.";

export const CONTACT = {
  email: "Ecoglowke@gmail.com",
  phonePrimary: "0111 243 033",
  phoneSecondary: "0726 478 469",
  whatsappNumber: "254726478469",
  address: "Popo Road Off Mombasa Road, Nairobi, Kenya",
} as const;

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber}`;

export const NAV_LINKS = [
  { label: "Homecare", href: "/category/homecare" },
  { label: "Silkcare", href: "/category/silkcare" },
  { label: "Fabricare", href: "/category/fabricare" },
  { label: "Proclean", href: "/category/proclean" },
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  homecare: "#7CB342",
  silkcare: "#0288D1",
  fabricare: "#FF7043",
  proclean: "#5C6BC0",
};

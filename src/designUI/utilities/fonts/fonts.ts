import { Sora, Poppins, Montserrat } from "next/font/google";

export const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

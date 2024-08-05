import { Raleway, Buda } from "next/font/google";
import "../globals.css";
import Script from "next/script";

const raleway = Raleway({ weight: ["200", "400", "700"], subsets: ["latin"] });
const buda = Buda({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-buda",
});

export const metadata = {
  title: "JS Dev - John Mark Osias",
  description:
    "Web portfolio of John Mark Osias - A full stack javascript developer specializing in React.js and Node.js",
  links: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${buda.variable} ${raleway.className} overflow-hidden`}>
        {children}
      </body>
      <Script src="https://kit.fontawesome.com/b533e169ec.js"></Script>
    </html>
  );
}

import { Raleway, Buda } from "next/font/google";
import "../globals.css";

const raleway = Raleway({ subsets: ["latin"] });
const buda = Buda({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-buda",
});

export const metadata = {
  title: "JS Dev - John Mark Osias",
  description:
    "Web portfolio of John Mark Osias - A full stack javascript developer specializing in React.js and Node.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${buda.variable} ${raleway.className}`}>
        {children}
      </body>
    </html>
  );
}

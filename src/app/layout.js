import "./globals.css";
import { Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],           // có thể thêm "latin-ext" nếu font hỗ trợ
  weight: ["400", "700"],
});

export const metadata = { title: "Bái Đính complex " };

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={libreBaskerville.className}>
        {children}
      </body>
    </html>
  );
}
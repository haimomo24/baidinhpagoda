import "./globals.css";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // có thể thêm "300", "900" nếu muốn đa dạng hơn
  style: ["normal", "italic"], // Merriweather hỗ trợ italic luôn
});

export const metadata = { title: "Bái Đính complex " };

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={merriweather.className}>
        {children}
      </body>
    </html>
  );
}


import "../globals.css";
import HeaderPageVi from "../component/common/HeaderPage.vi";
import FooterPage from "../component/common/FooterPage";
import FloatingButtons from "../component/common/FloatingButtons"; // 👈 tách riêng

export const metadata = {
  title: "Bái Đính complex",
  icons: {
    icon: [
      { url: "/images/logo-bai-dinh.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
};

export default function ViLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <HeaderPageVi />
        {children}
        <FooterPage />
        <FloatingButtons /> 
      </body>
    </html>
  );
}

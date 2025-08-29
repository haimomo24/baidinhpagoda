// app/vi/layout.jsx
import "../globals.css";
import HeaderPageVi from "../component/common/HeaderPage.vi";
import FooterPage from "../component/common/FooterPage";

export const metadata = {
  title: "Bái Đính complex",
  icons: {
    icon: [
      { url: "/images/logo-bai-dinh.png", type: "image/png" }, 
      { url: "/favicon.ico", type: "image/x-icon" } // fallback nếu cần
    ],
  },
};

export default function ViLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <HeaderPageVi />
        {children}
        <FooterPage/>
      </body>
    </html>
  );
}

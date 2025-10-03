// app/en/layout.jsx
import "../globals.css";
import HeaderPageEn from "../component/common/HeaderPage.en";
import FooterPageen from "../component/common/FooterPageen";
import FloatingButtons from "../component/common/FloatingButtons";

export const metadata = {
 title: "Bai Đinh complex",
  icons: {
    icon: [
      { url: "/images/logo-bai-dinh.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
};

export default function EnLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderPageEn />
        {children}
        <FooterPageen/>
        <FloatingButtons /> 
      </body>
    </html>
  );
}

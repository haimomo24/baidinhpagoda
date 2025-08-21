// app/vi/layout.jsx
import "../globals.css"; // nếu bạn có global styles
import HeaderPageVi from "../component/common/HeaderPage.vi";

export const metadata = { title: "Bái Đính" };

export default function ViLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <HeaderPageVi />
        {children}
      </body>
    </html>
  );
}

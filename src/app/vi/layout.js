// app/vi/layout.jsx
import "../globals.css"; // nếu bạn có global styles
import HeaderPageVi from "../component/common/HeaderPage.vi";

export const metadata = { title: "Trang tiếng Việt" };

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

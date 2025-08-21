// app/en/layout.jsx
import "../globals.css";
import HeaderPageEn from "../component/common/HeaderPage.en";

export const metadata = { title: "Bai Dinh" };

export default function EnLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderPageEn />
        {children}
      </body>
    </html>
  );
}

import SiderbarDashboard from "../component/dashboard/common/SiderbarDashboard";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen  grid grid-cols-[16rem_1fr_10px] grid-rows-[40px_1fr_10px]">
      {/* Sidebar bên trái */}
      <SiderbarDashboard />

      {/* Header */}
      <header className="col-span-2 bg-[#374151] text-white flex items-center px-4 text-lg font-bold">
        
      </header>

      {/* Nội dung chính (chỉ phần này cuộn) */}
      <main className="p-6 overflow-y-auto h-[calc(100vh-40px-10px)]">
        {children}
      </main>

      {/* Panel bên phải */}
      <aside className="bg-[#374151] text-white flex items-center justify-center text-sm">
        
      </aside>

      {/* Footer */}
      <footer className="col-span-2 bg-[#374151] text-white flex items-center justify-center text-sm">
        
      </footer>
    </div>
  );
}

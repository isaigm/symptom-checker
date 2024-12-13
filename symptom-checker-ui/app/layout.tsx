import './ui/global.css'

import SideNav from "@/app/ui/main/sidenav";
import { SymptomProvider } from "@/app/context/SymptomContext";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow flex flex-col md:overflow-y-auto">
            <div className="p-6 md:p-12"> <SymptomProvider>{children}</SymptomProvider></div>
          </div>
        </div>
      </body>
    </html>
  );
}

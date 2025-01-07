import { AppBar } from "../components/AppBar";
import { SideBar } from "../components/SideBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppBar />
      <div className="flex flex-1">
      <SideBar/>
        <div className="flex-1 overflow-x-hidden flex justify-center items-center px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
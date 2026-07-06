import { ContentProvider } from "@/context/ContentContext";

export default function AdminLayout({ children }) {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-gray-100">{children}</div>
    </ContentProvider>
  );
}

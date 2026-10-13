import { ContentProvider } from "@/context/ContentContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContactWidget from "@/components/FloatingContactWidget";

export default function MainLayout({ children }) {
  return (
    <ContentProvider>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingContactWidget />
    </ContentProvider>
  );
}


import { ContentProvider } from "@/context/ContentContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <ContentProvider>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </ContentProvider>
  );
}

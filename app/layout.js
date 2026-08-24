import "./globals.css";

export const metadata = {
  title:
    "Top RFID Tag Manufacturer & IoT Solutions Provider India | Aether RFID",
  description:
    "Leading RFID tag manufacturer & IoT solution provider in India. UHF RFID tags, Zebra & Chainway readers, asset tracking, retail & warehouse RFID solutions.",
  keywords:
    "RFID tags manufacturer India, top RFID companies in India, RFID solution provider India, UHF RFID tag supplier, UHF reader supplier, NFC tags supplier, RFID handheld reader India, Zebra FX9600 RFID reader, Chainway RFID reader, RFID asset tracking solution India, RFID inventory management solution India, RFID warehouse management solution, RFID apparel tag supplier India, RFID retail solution provider India, RFID inventory tracking system India, best RFID reader provider India, IoT solutions provider India, RFID tags and readers India",
  verification: {
    google: "M-8JajL0aIPQJxwnvboQzrwHBJ79ThxXMW4RuNWxEJU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

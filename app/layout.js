import "./globals.css";

export const metadata = {
  title: "SvarAI Demo",
  description: "Digital receptionist til VVS-firmaer"
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
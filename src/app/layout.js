import "./globals.css";

export const metadata = {
  title: "CRUD completo API", 
  description: "Exemplo de um CRUD completo utilizando Next.js e uma API pública",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

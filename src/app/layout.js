import "./globals.css";

export const metadata = {
  title: "Task Demotivator",
  description: "An application created for masochists that love to be insoulted to not achieving their goals.",
  openGraph: {
    title: "Task Demotivator",
    description: "Add a task. Fail. Be insulted.",
    url: "https://task-demotivator.vercel.app",
    siteName: "Task Demotivator",
    images: [
      {
        url: "https://task-demotivator.vercel.app/angry.png",
        width: 1200,
        height: 630,
        alt: "An angry face",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Task Demotivator",
    description: "The most evil to-do app in history",
    images: ["https://task-demotivator.vercel.app"],
  },
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

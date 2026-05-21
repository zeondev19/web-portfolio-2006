import { useEffect, useState } from "react";
import AdminApp from "./components/AdminApp";
import PublicPortfolio from "./components/PublicPortfolio";
import { defaultContent, loadPortfolioContent } from "./lib/content";
import type { PortfolioContent } from "./lib/types";

export default function App() {
  const [content, setContent] = useState<PortfolioContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) {
      setLoading(false);
      return;
    }

    loadPortfolioContent()
      .then(setContent)
      .finally(() => setLoading(false));
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return <AdminApp />;
  }

  return <PublicPortfolio content={content} loading={loading} />;
}

import "../public/assets/styles/normalize.css";
import "../public/assets/styles/webflow.css";
import "../public/assets/styles/audit.css";
import "../public/assets/styles/random.css";
import "../public/assets/styles/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
    </QueryClientProvider>
  );
}

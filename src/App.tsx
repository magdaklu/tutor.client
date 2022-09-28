import styles from "./App.module.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { OidcProvider } from "@axa-fr/react-oidc";
import { Home } from "./Home";
import FlashCards from "./tutor/flash-cards/FlashCards";
import Quiz from "./tutor/quizes/Quiz";
import Exam from "./tutor/exams/Exam";
import { Header } from "./common/Header";
import { Loading } from "./common/Loading";
import { AuthSuccess } from "./common/oidc/AuthSuccess";
import { Authenticating } from "./common/oidc/Authenticating";
import { AuthError } from "./common/oidc/AuthError";

// This configuration use hybrid mode
// ServiceWorker are used if available (more secure) else tokens are given to the client
// You need to give inside your code the "access_token" when using fetch

const configuration = {
  client_id: process.env.REACT_APP_CLIENT_ID || "",
  redirect_uri: window.location.origin + "/authentication/callback",
  silent_redirect_uri:
    window.location.origin + "/authentication/silent-callback",
  scope: process.env.REACT_APP_SCOPE || "",
  authority: process.env.REACT_APP_AUTHORITY || "",
  service_worker_relative_url: "/OidcServiceWorker.js",
  service_worker_only: false,
};

const SessionLost = () => <p>Session Lost</p>;
const ServiceWorkerNotSupported = () => <p>Not supported</p>;

function App() {
  return (
    <OidcProvider
      configuration={configuration}
      loadingComponent={Loading}
      authenticatingErrorComponent={AuthError}
      authenticatingComponent={Authenticating}
      sessionLostComponent={SessionLost}
      serviceWorkerNotSupportedComponent={ServiceWorkerNotSupported}
      callbackSuccessComponent={AuthSuccess}
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/flashcards" element={<FlashCards />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/exam" element={<Exam />} />
        </Routes>
      </Router>
    </OidcProvider>
  );
}

export default App;

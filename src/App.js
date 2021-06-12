import { ToastProvider } from "react-toast-notifications";
import Router from "./Router";
import "./App.css";

function App() {
  return (
    <ToastProvider placement="bottom-right">
      <Router />
    </ToastProvider>
  );
}

export default App;

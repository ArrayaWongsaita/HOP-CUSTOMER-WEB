import CustomerContextProvider from "./contexts/CustomerContext";
import AppRouter from "./routes/AppRouter";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <CustomerContextProvider>
      <AppRouter />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Slide}
        theme="colored"
        draggable
      />
    </CustomerContextProvider>
  );
}

export default App;

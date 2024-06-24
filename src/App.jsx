import CustomerContextProvider from "./contexts/customerContext";
import AppRouter from "./routes/AppRouter";

import CommonInput from "./components/CommonInput";

function App() {
  return (
    <CustomerContextProvider>
      <AppRouter />
    </CustomerContextProvider>
  );
}

export default App;

import Card from "./components/Card";
import CustomerContextProvider from "./contexts/CustomerContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <CustomerContextProvider>
      <AppRouter />
    </CustomerContextProvider>
  );
}

export default App;

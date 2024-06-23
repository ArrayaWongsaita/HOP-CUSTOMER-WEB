
import CustomerContextProvider from "./contexts/customerContext";
import AppRouter from "./routes/AppRouter";

function App() {

  return (
    
    <CustomerContextProvider>
      <AppRouter />
    </CustomerContextProvider>

  );
}

export default App;

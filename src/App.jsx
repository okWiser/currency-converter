import "./App.css";
import CurrencyConverter from "./components/currency-converter";
import CurrencyDropdown from "./components/dropdown";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;

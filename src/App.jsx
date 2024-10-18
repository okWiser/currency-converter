import "./App.css";
import CurrencyConvertor from "./components/currency-convertor";
import CurrencyDropdown from "./components/dropdown";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container">
        <CurrencyConvertor />
      </div>
    </div>
  );
}

export default App;

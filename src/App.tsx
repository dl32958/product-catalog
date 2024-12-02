import './App.css'
import ProductList from "./components/ProductList";
import DarkModeToggle from "./components/DarkModeToggle";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4">
      <header className="text-center py-4">
        <h1 className="text-4xl font-bold tracking-tight">E-Commerce Product Catalog</h1>
        <DarkModeToggle />
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
};

export default App

import { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ScanBarcode,
  CreditCard,
  Banknote,
  Receipt,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Classic T-Shirt", category: "Clothing", price: 1200, stock: 24 },
  { id: 2, name: "Blue Jeans", category: "Clothing", price: 2500, stock: 12 },
  { id: 3, name: "Running Shoes", category: "Footwear", price: 3800, stock: 8 },
  { id: 4, name: "Cotton Shirt", category: "Clothing", price: 1800, stock: 16 },
  { id: 5, name: "Leather Belt", category: "Accessories", price: 900, stock: 20 },
  { id: 6, name: "Sports Jacket", category: "Clothing", price: 4200, stock: 5 },
];

function CashierPOS() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) return current;

        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {/* POS header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Back to login"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-semibold text-[#172B4D]">BusinessHub POS</h1>
            <p className="text-xs text-slate-500">Main Branch</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-slate-800">Cashier Account</p>
          <p className="text-xs text-slate-500">Sales terminal 01</p>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-[1fr_390px]">
        {/* Products */}
        <section className="p-4 md:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#172B4D]">
                Point of Sale
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Select products to add them to the current sale.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
              <ScanBarcode size={18} />
              Scan barcode
            </button>
          </div>

          <div className="mb-6 flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3">
            <Search size={19} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by name or barcode..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-[#172B4D]">Available products</h3>
            <span className="text-xs text-slate-500">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-[#7890A8] hover:shadow-sm"
              >
                <div className="mb-4 flex h-20 items-center justify-center rounded-lg bg-[#EEF2F6]">
                  <ShoppingCart size={28} className="text-[#7890A8]" />
                </div>

                <p className="font-medium text-[#172B4D]">{product.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {product.category}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-[#355C7D]">
                    KSh {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">
                    Stock: {product.stock}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              No products match your search.
            </div>
          )}
        </section>

        {/* Cart */}
        <aside className="flex flex-col border-t border-slate-200 bg-white lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h3 className="font-semibold text-[#172B4D]">Current sale</h3>
              <p className="mt-1 text-xs text-slate-500">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </p>
            </div>

            <button
              onClick={() => setCart([])}
              className="text-xs font-medium text-slate-500 hover:text-red-600"
            >
              Clear cart
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="flex h-48 flex-col items-center justify-center text-center">
                <div className="rounded-full bg-slate-100 p-4">
                  <ShoppingCart size={25} className="text-slate-400" />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  Your cart is empty
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Select a product to begin a sale.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-slate-100 pb-4"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        KSh {item.price.toLocaleString()} each
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-[#172B4D]">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-4 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        disabled={item.quantity >= item.stock}
                        className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-50 disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        setCart((current) =>
                          current.filter((product) => product.id !== item.id)
                        )
                      }
                      className="text-slate-400 hover:text-red-600"
                      aria-label="Remove item"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-200 p-5">
            <p className="mb-3 text-sm font-medium text-slate-700">
              Payment method
            </p>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Cash", icon: Banknote },
                { label: "M-Pesa", icon: CreditCard },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setPaymentMethod(label)}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm ${
                    paymentMethod === label
                      ? "border-[#355C7D] bg-[#EEF2F6] font-semibold text-[#172B4D]"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>KSh {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3">
                <span className="font-semibold text-[#172B4D]">Total</span>
                <span className="text-xl font-semibold text-[#172B4D]">
                  KSh {total.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              onClick={() => alert("Demo checkout. Backend payment integration comes later.")}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#172B4D] py-3.5 text-sm font-semibold text-white transition hover:bg-[#243D62] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Receipt size={18} />
              Complete sale
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CashierPOS;

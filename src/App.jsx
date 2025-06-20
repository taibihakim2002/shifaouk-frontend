import GlobalToast from "./components/common/GlobalToast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div dir="rtl" className="relative min-h-screen">
      <GlobalToast />
      <AppRoutes />
      {/* زر عائم في الأسفل */}
    </div>
  );
}

export default App;

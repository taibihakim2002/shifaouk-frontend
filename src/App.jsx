import GlobalToast from "./components/common/GlobalToast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div dir="rtl" className="relative">
      <GlobalToast />

      <AppRoutes />
    </div>
  );
}

export default App;

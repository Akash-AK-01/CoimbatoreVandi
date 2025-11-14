import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FloatingButtons } from "./components/layout/FloatingButtons";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Destinations from "./pages/Destinations";
import Vehicles from "./pages/Vehicles";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const queryClient = new QueryClient();
const App = () => /*#__PURE__*/_jsx(QueryClientProvider, {
  client: queryClient,
  children: /*#__PURE__*/_jsxs(TooltipProvider, {
    children: [/*#__PURE__*/_jsx(Toaster, {}), /*#__PURE__*/_jsx(Sonner, {}), /*#__PURE__*/_jsx(BrowserRouter, {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      },
      children: /*#__PURE__*/_jsxs("div", {
        className: "flex flex-col min-h-screen",
        children: [/*#__PURE__*/_jsx(Header, {}), /*#__PURE__*/_jsx("main", {
          className: "flex-grow",
          children: /*#__PURE__*/_jsxs(Routes, {
            children: [/*#__PURE__*/_jsx(Route, {
              path: "/",
              element: /*#__PURE__*/_jsx(Home, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/packages",
              element: /*#__PURE__*/_jsx(Packages, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/destinations",
              element: /*#__PURE__*/_jsx(Destinations, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/vehicles",
              element: /*#__PURE__*/_jsx(Vehicles, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/pricing",
              element: /*#__PURE__*/_jsx(Pricing, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/contact",
              element: /*#__PURE__*/_jsx(Contact, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/about",
              element: /*#__PURE__*/_jsx(About, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/admin/login",
              element: /*#__PURE__*/_jsx(AdminLogin, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/admin",
              element: /*#__PURE__*/_jsx(Admin, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "*",
              element: /*#__PURE__*/_jsx(NotFound, {})
            })]
          })
        }), /*#__PURE__*/_jsx(Footer, {})]
      })
    }), /*#__PURE__*/_jsx(FloatingButtons, {})]
  })
});
export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/header";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./layouts/footer";
import Profile from "./pages/profile";
import Breadcrumb from "./layouts/breadcrumb";
import { UserProvider } from "./contexts/user.context";
import FilterBook from "./pages/filterBook";
import DetailBook from "./pages/detailBook";
import Cart from "./pages/cart";
import GoogleAuthSuccess from "./pages/googleAuthSucess";
import MyTicket from "./pages/myTicket";
import TicketBorrow from "./pages/myTicket/ticketBorrow";
import TicketApproval from "./pages/myTicket/ticketApproval";
import TicketReturn from "./pages/myTicket/ticketReturn";
import TicketCancel from "./pages/myTicket/ticketCancel";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        <div className="mt-2 mb-2 flex justify-center">
          <Breadcrumb />
        </div>
        <div className="flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />

            <Route
              path="/:category/:subCategory/:bookId"
              element={<DetailBook />}
            />
            <Route path="/:category/:subCategory" element={<FilterBook />} />
            <Route path="/:category" element={<FilterBook />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<MyTicket />}>
              <Route path="ticket-borrow" element={<TicketBorrow />} />
              <Route path="ticket-approval" element={<TicketApproval />} />
              <Route path="ticket-return" element={<TicketReturn />} />
              <Route path="ticket-cancel" element={<TicketCancel />} />
            </Route>
            <Route
              path="/google-auth-success"
              element={<GoogleAuthSuccess />}
            />
          </Routes>
        </div>
        <Footer />
        <ToastContainer autoClose={1600} pauseOnHover={false} />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

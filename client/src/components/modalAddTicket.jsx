import { useState } from "react";
import DatePicker from "react-datepicker";
import { vi } from "date-fns/locale";
import BooksSearched from "../pages/admin/booksSearched";
import UsersSearched from "../pages/admin/usersSearched";
import ticketApi from "../api/ticket.api";
import { toast } from "react-toastify";

export default function ModalAddTicket() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState({});
  const [keyWord, setKeyWord] = useState("");
  const [keyWordEmail, setKeyWordEmail] = useState("");

  console.log(selectedBooks);
  const handleSearchClose = () => {
    setKeyWord("");
    setKeyWordEmail("");
  };
  const handleRemove = (bookId) => {
    setSelectedBooks((prev) => prev.filter((book) => book._id !== bookId));
  };

  const handleCreateTicket = async () => {
    if (!borrowDate || !returnDate || selectedBooks.length === 0) {
      toast.warning("Vui lòng chọn đủ ngày và ít nhất một sách");
      return;
    }
    console.log(selectedBooks);

    const ticketBody = {
      borrowDate: borrowDate,
      returnDate: returnDate,
      note: note,
      books: selectedBooks.map((book) => ({
        bookId: book._id,
        quantity: book.quantity, //
      })),
    };

    try {
      await ticketApi.createTicketAdmin(selectedUser._id, ticketBody);

      // reset nếu cần
      setSelectedBooks([]);
      setSelectedUser(null);
      setNote("");
      setBorrowDate(null);
      setReturnDate(null);
      setError({});

      toast.success("Tạo phiếu thành công!");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // chuyển mảng lỗi thành object key: message
        const errorObj = {};
        err.response.data.errors.forEach((e) => {
          errorObj[e.field] = e.message;
        });
        setError(errorObj);
      } else {
        toast.error("Lỗi không xác định, vui lòng thử lại");
      }
    }
  };

  const handleQuantityChange = (bookId, value) => {
    setSelectedBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === bookId ? { ...book, quantity: parseInt(value) } : book
      )
    );
  };

  return (
    <div className="modal-box max-w-3xl">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

      <h3 className="font-bold text-lg mb-5">Thông tin phiếu mượn</h3>

      <div className="grid grid-cols-8 gap-6">
        <div className="col-span-4 row-span-5">
          <div className="mb-4 flex items-center gap-x-4 relative">
            <label className="w-25 text-sm font-medium text-gray-700">
              tài khoản
            </label>
            <label className="input input-sm w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                required
                placeholder="tìm theo email"
                value={keyWordEmail}
                onChange={(e) => setKeyWordEmail(e.target.value)}
              />
            </label>
            <UsersSearched
              onKeyWord={keyWordEmail}
              onClose={handleSearchClose}
              onSelect={(user) => setSelectedUser(user)}
            />
          </div>
          {selectedUser && (
            <div className="mb-2">
              <span className="text-xs mr-2">tài khoản đã chọn:</span>
              <span className="text-sm text-red-500 font-semibold mr-4">
                {selectedUser.email}
              </span>
              <span className="text-sm text-red-500 font-semibold">
                {selectedUser.username}
              </span>
            </div>
          )}
          <div className="mb-4 flex items-center gap-x-4 relative">
            <label className="w-25 text-sm font-medium text-gray-700">
              chọn sách
            </label>
            <label className="input input-sm w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                required
                placeholder="tìm theo tiêu đề"
                value={keyWord}
                className="grow"
                onChange={(e) => setKeyWord(e.target.value)}
              />
            </label>
            <BooksSearched
              onKeyWord={keyWord}
              onClose={handleSearchClose}
              onSelect={(book) => {
                setSelectedBooks((prevBooks) => {
                  if (!prevBooks.some((b) => b._id === book._id)) {
                    return [...prevBooks, { ...book, quantity: 1 }];
                  }
                  return prevBooks;
                });
              }}
            />
          </div>
          {/* Sách đã chọn */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Sách đã chọn
            </label>
            {selectedBooks.length === 0 ? (
              <div className="p-3 text-sm italic">
                Chưa có sách nào được chọn
              </div>
            ) : (
              <div className="space-y-2">
                {selectedBooks.map((book) => (
                  <div
                    key={book._id}
                    className="flex items-center gap-3 border rounded p-2"
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-8 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">{book.title}</p>
                      <div>
                        <span className="text-xs mr-2">số lượng</span>
                        <input
                          type="number"
                          name={`quantity-${book._id}`}
                          min={1}
                          value={book.quantity}
                          onChange={(e) =>
                            handleQuantityChange(book._id, e.target.value)
                          }
                          className="input input-sm mt-1 w-12"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(book._id)}
                      className="btn btn-sm btn-error btn-outline"
                    >
                      Xoá
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-4 row-span-5 col-start-5">
          <div className="mb-4 flex items-center gap-x-4">
            <label className="w-28 text-sm font-medium text-gray-700">
              Ngày mượn
            </label>
            <DatePicker
              locale={vi}
              dateFormat="dd/MM/yyyy"
              placeholderText="chọn ngày mượn"
              selected={borrowDate}
              onChange={(date) => setBorrowDate(date)}
              className="input input-sm input-bordered w-full"
              wrapperClassName="w-full"
            />
          </div>
          {error.borrowDate && (
            <span className="text-red-600 text-sm ml-1 text-center mb-2">
              {error.borrowDate}
            </span>
          )}

          {/* Ngày trả */}
          <div className="mb-4 flex items-center gap-x-4">
            <label className="w-28 text-sm font-medium text-gray-700">
              Ngày trả
            </label>
            <DatePicker
              locale={vi}
              dateFormat="dd/MM/yyyy"
              placeholderText="chọn ngày trả"
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              className="input input-sm input-bordered w-full"
              wrapperClassName="w-full"
            />
          </div>
          {error.returnDate && (
            <span className="text-red-600 text-sm ml-1 text-center mb-2">
              {error.returnDate}
            </span>
          )}

          {/* Ghi chú */}
          <div className="mb-4 flex items-start gap-x-4">
            <label className="w-28 text-sm font-medium text-gray-700 mt-1">
              Ghi chú
            </label>
            <textarea
              className="textarea textarea-bordered textarea-sm w-full"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="ghi chú (nếu có)"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="modal-action">
        <button
          className="btn btn-outline btn-primary"
          onClick={handleCreateTicket}
        >
          tạo phiếu
        </button>
      </div>
    </div>
  );
}

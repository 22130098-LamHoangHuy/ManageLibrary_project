import React from "react";

export default function DetailTicket({ ticket }) {
  const { _id, books, borrowDate, returnDate, status, createdAt, note } =
    ticket;

  const selectedBooks = books.map((item) => ({
    bookId: item.bookId._id,
    title: item.bookId.title,
    coverImage: item.bookId.coverImage,
    quantity: item.quantity,
  }));

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg mb-4">Chi tiết phiếu mượn</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p>
            <strong>ID:</strong> {_id}
          </p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Ngày mượn:</strong>{" "}
            {new Date(borrowDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Ngày trả:</strong>{" "}
            {new Date(returnDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Trạng thái:</strong>
            <span className="ml-1 badge badge-outline badge-primary">
              {status}
            </span>
          </p>
          <p>
            <strong>Ghi chú:</strong> {note || "Không có"}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Sách đã chọn:</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedBooks.map((book) => (
              <div
                key={book.bookId}
                className="flex items-center gap-3 border rounded p-2"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-10 h-14 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{book.title}</p>
                  <p className="text-sm text-gray-600">
                    Số lượng: {book.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-action">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
    </div>
  );
}

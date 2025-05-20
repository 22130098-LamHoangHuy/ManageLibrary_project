import Ticket from "../models/ticket.model.js";

export const getTicketByUserIdService = async (userId) => {
  return await Ticket.find({ userId }).populate("books.bookId");
};

export const getTicketByStatusService = async (userId, status) => {
  return await Ticket.find({ userId, status }).populate("books.bookId");
};
//6.7 lưu phiếu mượn vào cơ sở dữ liệu qua phương thức creatTicketService() từ TicketService
export const createTicketService = async (userId, ticketBody) => {
  return await Ticket.create({ userId, ...ticketBody });
};

export const setStatusTicketService = async (ticketId, status) => {
  return await Ticket.findByIdAndUpdate(ticketId, { status }, { new: true });
};

export const deleteTicketService = async (ticketId) => {
  return await Ticket.findByIdAndDelete(ticketId);
};

export const getAllTicketService = async (page = 1, limit = 8) => {
  const skip = (page - 1) * limit;
  const tickets = await Ticket.find()
    .populate("userId", "username email")
    .populate("books.bookId")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Ticket.countDocuments();

  return { tickets, total, page, pages: Math.ceil(total / limit) };
};

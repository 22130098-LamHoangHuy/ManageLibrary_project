import {
  getAllTicketService,
  getTicketByUserIdService,
  getTicketByStatusService,
  createTicketService,
  deleteTicketService,
  setStatusTicketService,
} from "../services/ticket.service.js";

export const getAllTicket = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllTicketService(
      Number(page) || 1,
      Number(limit) || 8
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getTicketByUserId = async (req, res, next) => {
  try {
    const tickets = await getTicketByUserIdService(req.userId);
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

export const getTicketByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const tickets = await getTicketByStatusService(req.userId, status);
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

export const creatTicket = async (req, res, next) => {
  try {
    const newTicket = await createTicketService(req.userId, req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    await deleteTicketService(ticketId);
    res.status(200).json({ message: "Xóa ticket thành công" });
  } catch (error) {
    next(error);
  }
};

export const setSatusTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;
    const updated = await setStatusTicketService(ticketId, status);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

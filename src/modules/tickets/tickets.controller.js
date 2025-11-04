import { ticketsService } from './tickets.service.js';

export const getTickets = async (req, res) => {
  try {
    const tickets = await ticketsService.getAll();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error al obtener tickets:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { title, description, priority, authorEmail, authorName } = req.body;

    if (!title || !description || !authorEmail) {
      return res.status(400).json({
        message: 'title, description y authorEmail son obligatorios',
      });
    }

    const ticket = await ticketsService.create({
      title,
      description,
      priority,
      authorEmail,
      authorName,
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error al crear ticket:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

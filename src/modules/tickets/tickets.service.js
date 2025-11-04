import { ticketsRepository } from './tickets.repository.js';
import prisma from '../../core/prisma.js';

export const ticketsService = {
  getAll: async () => {
    const tickets = await ticketsRepository.findAll();
    return tickets;
  },

  create: async ({ title, description, priority, authorEmail, authorName }) => {
    const user = await prisma.user.upsert({
      where: { email: authorEmail },
      update: {},
      create: {
        name: authorName || authorEmail.split('@')[0],
        email: authorEmail,
      },
    });

    return await ticketsRepository.create({
      title,
      description,
      priority,             
      authorId: user.id,
    });
  },
};

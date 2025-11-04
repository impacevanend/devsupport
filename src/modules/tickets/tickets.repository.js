import prisma from '../../core/prisma.js';

export const ticketsRepository = {
  findAll: async () => {
    return await prisma.ticket.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  create: async ({ title, description, priority = 'MEDIUM', authorId }) => {
    return await prisma.ticket.create({
      data: { title, description, priority, authorId },
      include: { author: true },
    });
  },
};

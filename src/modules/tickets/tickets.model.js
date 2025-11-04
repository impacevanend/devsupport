import { z } from 'zod';

export const TicketPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export const TicketStatusEnum   = z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']);

export const createTicketSchema = z.object({
  title: z.string().min(3, 'title debe tener al menos 3 caracteres'),
  description: z.string().min(5, 'description debe tener al menos 5 caracteres'),
  priority: TicketPriorityEnum.default('MEDIUM'),
  authorEmail: z.string().email('authorEmail debe ser un correo válido'),
  authorName: z.string().min(2, 'authorName debe tener al menos 2 caracteres').optional(),
});
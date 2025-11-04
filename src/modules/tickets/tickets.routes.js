import express from 'express';
import { getTickets, createTicket } from './tickets.controller.js';
import { validateBody } from '../../core/validate.js';
import { createTicketSchema } from './tickets.model.js';

const router = express.Router();

router.get('/', getTickets);
router.post('/', validateBody(createTicketSchema), createTicket);

export default router;

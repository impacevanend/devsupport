import prisma from '../../src/core/prisma.js';

export async function resetDb() {
  
  const tables = ['ticket', 'user'];

  for (const t of tables) {
    
    await prisma[t]?.deleteMany().catch(() => {});
  }
}

export async function disconnectDb() {
  await prisma.$disconnect();
}

export default async () => {
  try {
    const { default: prisma } = await import('../../src/core/prisma.js');
    await prisma.$disconnect();
  } catch {}
};
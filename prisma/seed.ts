import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.task.upsert({
    where: { id: '16d8b9db-1c8b-4358-86cb-0c2b01c6daff' },
    update: {},
    create: {
      id: '16d8b9db-1c8b-4358-86cb-0c2b01c6daff',
      title: 'Initialize the application.',
      priority: 'completed',
    },
  });
  await prisma.task.upsert({
    where: { id: '25e20c08-30a0-4b2b-905b-1ca89b38ec2b' },
    update: {},
    create: {
      id: '25e20c08-30a0-4b2b-905b-1ca89b38ec2b',
      title: 'Code features.',
      priority: 'important',
    },
  });
  await prisma.task.upsert({
    where: { id: 'e607c6aa-0fdf-4864-90ef-1147a8ec8a60' },
    update: {},
    create: {
      id: 'e607c6aa-0fdf-4864-90ef-1147a8ec8a60',
      title: 'Implement testing.',
      priority: 'backlog',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

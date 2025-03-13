import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: passwordHash,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Regular User',
      email: 'user@example.com',
      password: passwordHash,
    },
  });

  const group = await prisma.group.upsert({
    where: { name: 'Developers' },
    update: {},
    create: {
      name: 'Developers',
      ownerId: user1.id,
    },
  });

  await prisma.userGroup.createMany({
    data: [
      { userId: user1.id, groupId: group.id },
      { userId: user2.id, groupId: group.id },
    ],
    skipDuplicates: true,
  });

  console.log('Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

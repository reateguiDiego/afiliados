const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.category.upsert({
    where: { slug: 'general' },
    update: { name: 'General' },
    create: {
      name: 'General',
      slug: 'general',
    },
  });

  console.log('Seed completed: category "general" is ready.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

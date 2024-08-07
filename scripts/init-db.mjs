import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const prisma = new PrismaClient();


async function applyMigrations() {
  try {
    console.log('migrate...');
    await execPromise('npx prisma migrate deploy');
    console.log('migrate success');
  } catch (error) {
    console.error('migrate failed', error);
    process.exit(1); // 退出脚本以指示失败
  }
}


async function initializeData() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    const user = await prisma.user.findUnique({
      where: { id: 1 },
    });

   if (!user) {
      await prisma.user.create({
        data: {
          id: 1,
          name: "Kevin Smith",
          email: "kevin.smith@arcblock.com",
          mobile: "+8613650887765",
        },
      });
      console.log('Review test data "Kevin Smith" inserted');
    } else {
      console.log('"Kevin Smith" existed');
    }
  } catch (error) {
    console.error('"Kevin Smith" insert failed', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() { 
  await applyMigrations()
  await initializeData();
}

main();
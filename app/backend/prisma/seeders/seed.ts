import { PrismaClient } from '@prisma/client';
import { readdirSync } from 'fs';
import * as path from 'path';
const prisma = new PrismaClient();

export interface Model {
  data: Record<string, unknown>[] | Record<string, unknown>;
  run: (prisma: PrismaClient) => Promise<unknown>;
}

async function main() {
  const files = readdirSync(path.join(__dirname, 'models'));
  for (const file of files) {
    const model: Model = await import(
      path.join(__dirname, 'models', file)
    ).then((module) => module.default);
    console.log(`starting real seed: ${file}`);
    await model.run(prisma);
    console.log(`⤵️  Seeded: ${file}`);
  }
}

main()
  .then(() => {
    console.log('🎉  Seed successful');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    console.error('\n❌  Seed failed. See above.');
    process.exit(1);
  });

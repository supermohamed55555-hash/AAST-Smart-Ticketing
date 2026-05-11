import { prisma } from "../src/lib/prisma";

async function checkStack() {
  const actions = await prisma.adminAction.findMany({
    orderBy: { timestamp: "desc" }
  });
  console.log("Current Admin Actions Stack:", JSON.stringify(actions, null, 2));
}

checkStack()
  .catch(console.error)
  .finally(() => process.exit());

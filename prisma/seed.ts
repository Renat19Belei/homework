import { prisma } from "./prisma.client";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: "hashed_dummy_password",
      name: "Admin",
    },
  });
  const category = await prisma.category.upsert({
    where: { name: "General" },
    update: {},
    create: { name: "General" },
  });
  const post = await prisma.post.create({
    data: {
      title: "Перший пост",
      content: "фвопопвф",
      image: "image1.jpg",
      authorId: user.id,
      categoryId: category.id,
      tags: {
        create: [
          {
            tag: {
              create: { name: "Tech" },
            },
          },
        ],
      },
    },
    include: {
      tags: { include: { tag: true } },
      author: true,
      category: true,
    },
  });

  console.log("Seed complete:", { user, category, post });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

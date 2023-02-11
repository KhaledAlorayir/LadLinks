import prisma from "../../prisma/client";

async function typesSeeder() {
  const socialTypesData = [
    { name: "twitter" },
    { name: "instagram" },
    { name: "facebook" },
    { name: "linkedin" },
    { name: "website" },
    { name: "tiktok" },
    { name: "snapchat" },
    { name: "portfolio" },
    { name: "store" },
    { name: "wishlist" },
    { name: "youtube" },
    { name: "twitch" },
  ];

  await prisma.social_Types.createMany({ data: socialTypesData });
  console.log("social seeder done");
}

typesSeeder();

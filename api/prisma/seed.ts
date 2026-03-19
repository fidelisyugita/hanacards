import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding products...')
  
  // Clear existing products to avoid duplicates during repeated seeding
  await prisma.product.deleteMany()

  const productsToSeed = [
    {
      name: "Everlasting Friendship Card",
      description: "A minimalist boutique greeting card lying flat, expressing true friendship.",
      price: 9.5,
      category: "Friendship",
      primaryImage: "/images/friendship_card_1773215385372.png",
      hoverImage: "/images/floral_arrangement_1773215445584.png",
      stock: 50,
      active: true,
    },
    {
      name: "Pure Love Card",
      description: "A premium handmade greeting card for love, soft warm lighting.",
      price: 12.0,
      category: "Love",
      primaryImage: "/images/love_card_1773215401101.png",
      hoverImage: "/images/tabletop_card_scene_1773215431431.png",
      stock: 45,
      active: true,
    },
    {
      name: "Marble Birthday Card",
      description: "A minimalist birthday greeting card with elegant typography.",
      price: 8.5,
      category: "Birthday",
      primaryImage: "/images/birthday_card_1773215415586.png",
      hoverImage: "/images/greeting_card_pack_1773215457581.png",
      stock: 100,
      active: true,
    },
    {
      name: "Minimalist Card Bundle",
      description: "A sleek bundle of 3 minimalist greeting cards tied with a thin natural twine.",
      price: 24.0,
      category: "Packs",
      primaryImage: "/images/greeting_card_pack_1773215457581.png",
      hoverImage: "/images/friendship_card_1773215385372.png",
      stock: 20,
      active: true,
    },
    {
      name: "Tabletop Friendship Scene",
      description: "A friendship card ready to be written, lying next to a premium metal pen.",
      price: 9.5,
      category: "Friendship",
      primaryImage: "/images/tabletop_card_scene_1773215431431.png",
      hoverImage: "/images/birthday_card_1773215415586.png",
      stock: 35,
      active: true,
    },
    {
      name: "Floral Love Arrangement",
      description: "A beautiful card paired with a simple, elegant floral arrangement.",
      price: 18.0,
      category: "Love",
      primaryImage: "/images/floral_arrangement_1773215445584.png",
      hoverImage: "/images/love_card_1773215401101.png",
      stock: 25,
      active: true,
    },
    {
      name: "Golden Anniversary Card",
      description: "A high-quality, premium artisanal greeting card for an Anniversary. Minimalist and elegant.",
      price: 11.5,
      category: "Anniversary",
      primaryImage: "/images/anniversary_card_1773906140244.png",
      hoverImage: "/images/love_card_1773215401101.png",
      stock: 40,
      active: true,
    },
    {
      name: "Sincere Thank You Card",
      description: "A minimalist boutique greeting card to express gratitude, featuring elegant typography.",
      price: 7.5,
      category: "Thank You",
      primaryImage: "/images/thank_you_card_1773906169080.png",
      hoverImage: "/images/floral_arrangement_1773215445584.png",
      stock: 60,
      active: true,
    },
    {
      name: "Foil Congratulations Card",
      description: "A premium handmade greeting card meant for Congratulations, featuring classy gold foil accents.",
      price: 14.0,
      category: "Congratulations",
      primaryImage: "/images/congrats_card_1773906197827.png",
      hoverImage: "/images/tabletop_card_scene_1773215431431.png",
      stock: 30,
      active: true,
    },
    {
      name: "Watercolor Sympathy Card",
      description: "A tasteful and subtle greeting card meant for sympathy, with soft watercolor florals.",
      price: 8.5,
      category: "Sympathy",
      primaryImage: "/images/sympathy_card_1773906248521.png",
      hoverImage: "/images/floral_arrangement_1773215445584.png",
      stock: 15,
      active: true,
    }
  ]

  for (const p of productsToSeed) {
    await prisma.product.create({ data: p })
  }

  console.log('Seeded 10 products successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

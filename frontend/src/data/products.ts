export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Friendship" | "Love" | "Birthday" | "Packs";
  primaryImage: string;
  hoverImage: string;
}

export const products: Product[] = [
  {
    id: "p_friendship_1",
    name: "Everlasting Friendship Card",
    description:
      "A minimalist boutique greeting card lying flat, expressing true friendship.",
    price: 9.5,
    category: "Friendship",
    primaryImage: "/images/friendship_card_1773215385372.png",
    hoverImage: "/images/floral_arrangement_1773215445584.png",
  },
  {
    id: "p_love_1",
    name: "Pure Love Card",
    description:
      "A premium handmade greeting card for love, soft warm lighting.",
    price: 12.0,
    category: "Love",
    primaryImage: "/images/love_card_1773215401101.png",
    hoverImage: "/images/tabletop_card_scene_1773215431431.png",
  },
  {
    id: "p_birthday_1",
    name: "Marble Birthday Card",
    description: "A minimalist birthday greeting card with elegant typography.",
    price: 8.5,
    category: "Birthday",
    primaryImage: "/images/birthday_card_1773215415586.png",
    hoverImage: "/images/greeting_card_pack_1773215457581.png",
  },
  {
    id: "p_pack_1",
    name: "Minimalist Card Bundle",
    description:
      "A sleek bundle of 3 minimalist greeting cards tied with a thin natural twine.",
    price: 24.0,
    category: "Packs",
    primaryImage: "/images/greeting_card_pack_1773215457581.png",
    hoverImage: "/images/friendship_card_1773215385372.png",
  },
  {
    id: "p_friendship_2",
    name: "Tabletop Friendship Scene",
    description:
      "A friendship card ready to be written, lying next to a premium metal pen.",
    price: 9.5,
    category: "Friendship",
    primaryImage: "/images/tabletop_card_scene_1773215431431.png",
    hoverImage: "/images/birthday_card_1773215415586.png",
  },
  {
    id: "p_love_2",
    name: "Floral Love Arrangement",
    description:
      "A beautiful card paired with a simple, elegant floral arrangement.",
    price: 18.0,
    category: "Love",
    primaryImage: "/images/floral_arrangement_1773215445584.png",
    hoverImage: "/images/love_card_1773215401101.png",
  },
];

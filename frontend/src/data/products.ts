export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Friendship" | "Love" | "Birthday" | "Packs" | "Anniversary" | "Thank You" | "Congratulations" | "Sympathy";
  primaryImage: string;
  hoverImage: string;
  stock?: number;
  active?: boolean;
}

export const products: Product[] = [
  {
    id: "p_friendship_1",
    name: "Everlasting Friendship Card",
    description:
      "A minimalist boutique greeting card lying flat, expressing true friendship.",
    price: 9.5,
    category: "Friendship",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Ffriendship_card_1773215385372.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Ffloral_arrangement_1773215445584.png?alt=media",
  },
  {
    id: "p_love_1",
    name: "Pure Love Card",
    description:
      "A premium handmade greeting card for love, soft warm lighting.",
    price: 12.0,
    category: "Love",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Flove_card_1773215401101.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Ftabletop_card_scene_1773215431431.png?alt=media",
  },
  {
    id: "p_birthday_1",
    name: "Marble Birthday Card",
    description: "A minimalist birthday greeting card with elegant typography.",
    price: 8.5,
    category: "Birthday",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Fbirthday_card_1773215415586.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Fgreeting_card_pack_1773215457581.png?alt=media",
  },
  {
    id: "p_pack_1",
    name: "Minimalist Card Bundle",
    description:
      "A sleek bundle of 3 minimalist greeting cards tied with a thin natural twine.",
    price: 24.0,
    category: "Packs",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Fgreeting_card_pack_1773215457581.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Ffriendship_card_1773215385372.png?alt=media",
  },
  {
    id: "p_friendship_2",
    name: "Tabletop Friendship Scene",
    description:
      "A friendship card ready to be written, lying next to a premium metal pen.",
    price: 9.5,
    category: "Friendship",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Ftabletop_card_scene_1773215431431.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Fbirthday_card_1773215415586.png?alt=media",
  },
  {
    id: "p_love_2",
    name: "Floral Love Arrangement",
    description:
      "A beautiful card paired with a simple, elegant floral arrangement.",
    price: 18.0,
    category: "Love",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Ffloral_arrangement_1773215445584.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Flove_card_1773215401101.png?alt=media",
  },
  {
    id: "p_anniversary_1",
    name: "Golden Anniversary Card",
    description: "A high-quality, premium artisanal greeting card for an Anniversary. Minimalist and elegant.",
    price: 11.5,
    category: "Anniversary",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Fanniversary_card_1773906140244.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Flove_card_1773215401101.png?alt=media",
  },
  {
    id: "p_thankyou_1",
    name: "Sincere Thank You Card",
    description: "A minimalist boutique greeting card to express gratitude, featuring elegant typography.",
    price: 7.5,
    category: "Thank You",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Fthank_you_card_1773906169080.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Ffloral_arrangement_1773215445584.png?alt=media",
  },
  {
    id: "p_congrats_1",
    name: "Foil Congratulations Card",
    description: "A premium handmade greeting card meant for Congratulations, featuring classy gold foil accents.",
    price: 14.0,
    category: "Congratulations",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Fcongrats_card_1773906197827.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Ftabletop_card_scene_1773215431431.png?alt=media",
  },
  {
    id: "p_sympathy_1",
    name: "Watercolor Sympathy Card",
    description: "A tasteful and subtle greeting card meant for sympathy, with soft watercolor florals.",
    price: 8.5,
    category: "Sympathy",
    primaryImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Fsympathy_card_1773906248521.png?alt=media",
    hoverImage: "https://firebasestorage.googleapis.com/v0/b/hana-card.firebasestorage.app/o/products%2Ffloral_arrangement_1773215445584.png?alt=media",
  }
];

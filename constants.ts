import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Luxury Chronograph",
    price: 199.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
    description: "A masterclass in precision engineering. This luxury chronograph features a sapphire crystal face, Swiss movement, and a genuine leather strap that ages beautifully with time.",
    rating: 5,
    reviews: 128
  },
  {
    id: 2,
    title: "Minimalist Tote",
    price: 149.00,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
    description: "Crafted from Italian vegan leather, this tote is designed for the modern professional. Spacious enough for a 15-inch laptop yet sleek enough for evening events.",
    rating: 4.8,
    reviews: 84
  },
  {
    id: 3,
    title: "Urban Runner Elite",
    price: 129.00,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    description: "Experience cloud-like comfort with our proprietary foam technology. These sneakers are built for the urban explorer who refuses to compromise on style or substance.",
    rating: 4.9,
    reviews: 256
  },
  {
    id: 4,
    title: "Golden Horizon Chain",
    price: 89.00,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800",
    description: "18k gold vermeil chain that captures the light perfectly. A subtle statement piece that works as a standalone item or layered with other accessories.",
    rating: 4.7,
    reviews: 52
  },
  {
    id: 5,
    title: "Nomad Backpack",
    price: 110.00,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    description: "Water-resistant canvas meet reinforced stitching. The Nomad Backpack is your reliable companion for weekend getaways and daily commutes alike.",
    rating: 4.6,
    reviews: 45
  },
  {
    id: 6,
    title: "Aviator Classic",
    price: 155.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    description: "Timeless design updated with polarized lenses and lightweight titanium frames. Protect your eyes while looking effortlessly cool.",
    rating: 4.9,
    reviews: 112
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Art Director",
    content: "Absolutely love my new watch! The quality is top-notch and it arrived super fast. The packaging was an experience in itself.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    content: "The sneakers fit perfectly. I've walked miles in them and my feet feel great. Best purchase this year – highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Fashion Blogger",
    content: "Secure and easy checkout. Customer service was amazing when I had a question about sizing. A truly premium experience.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export const FAQS = [
  {
    question: "What is your shipping policy?",
    answer: "We offer fast worldwide shipping via DHL and FedEx. Orders are processed within 24 hours, and delivery typically takes 3-5 business days. We provide free shipping on all orders over $100."
  },
  {
    question: "How do I return an item?",
    answer: "We have a hassle-free 30-day return policy. If you're not completely satisfied, simply log into your account, select the order, and print a prepaid return label. No questions asked."
  },
  {
    question: "Is checkout secure?",
    answer: "Absolutely. We use industry-standard 256-bit SSL encryption to protect your personal information. We do not store credit card details on our servers."
  }
];
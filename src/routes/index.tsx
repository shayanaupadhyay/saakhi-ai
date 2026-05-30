import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Heart,
  ShoppingCart,
  Search,
  Mic,
  Camera,
  ArrowUpDown,
  ChevronDown,
  SlidersHorizontal,
  Home,
  LayoutGrid,
  Store,
  PlaySquare,
  Package,
  Star,
  Sparkles,
  Gift,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meesho — Lowest Prices, Best Quality" },
      {
        name: "description",
        content: "Shop on Meesho — fashion, beauty, home & more. Now with SakhiAI shopping assistant.",
      },
    ],
  }),
  component: HomePage,
});

const CATEGORIES = [
  { label: "All Catego...", emoji: "⌚" },
  { label: "Kurtis & Dr...", emoji: "👗" },
  { label: "Kids", emoji: "👶" },
  { label: "Home", emoji: "🏺" },
  { label: "Beauty", emoji: "💄" },
  { label: "Footwear", emoji: "👠" },
  { label: "Kitchen Uti...", emoji: "🍳" },
  { label: "Saree", emoji: "🥻" },
  { label: "Western W...", emoji: "👚" },
  { label: "Jewellery", emoji: "📿" },
  { label: "Men Fashion", emoji: "👔" },
  { label: "Women", emoji: "👩" },
];

type Tile = {
  emoji: string;
  bg: string;
  name: string;
  price: string;
  mrp: string;
  discount: string;
  rating: string;
  reviews: string;
  ad?: boolean;
  trusted?: boolean;
  cod?: string;
  video?: boolean;
};

const PRODUCTS: Tile[] = [
  {
    emoji: "👗",
    bg: "from-pink-100 to-rose-200",
    name: "Chitrarekha Fabulous Kurtis",
    price: "₹233",
    mrp: "260",
    discount: "10% off",
    rating: "4.2",
    reviews: "980",
    cod: "₹255 with COD",
    trusted: true,
  },
  {
    emoji: "📿",
    bg: "from-slate-200 to-slate-300",
    name: "Fashionate Men Bracelets",
    price: "₹251",
    mrp: "290",
    discount: "13% off",
    rating: "4.5",
    reviews: "15",
    cod: "₹284 with COD",
    ad: true,
  },
  {
    emoji: "📿",
    bg: "from-teal-100 to-cyan-200",
    name: "Trendy Men Bracelets",
    price: "₹231",
    mrp: "270",
    discount: "14% off",
    rating: "4.0",
    reviews: "34",
    cod: "₹264 with COD",
    ad: true,
  },
  {
    emoji: "👕",
    bg: "from-amber-100 to-orange-200",
    name: "Floral Print Shirt",
    price: "₹376",
    mrp: "410",
    discount: "8% off",
    rating: "3.9",
    reviews: "12352",
    video: true,
  },
  {
    emoji: "👙",
    bg: "from-pink-200 to-rose-300",
    name: "Pink Striped Top",
    price: "₹289",
    mrp: "599",
    discount: "51% off",
    rating: "4.1",
    reviews: "542",
  },
  {
    emoji: "👗",
    bg: "from-red-200 to-rose-400",
    name: "Red Bodycon Dress",
    price: "₹449",
    mrp: "999",
    discount: "55% off",
    rating: "4.3",
    reviews: "1.1K",
  },
];

function HomePage() {
  return (
    <main className="min-h-[100dvh] bg-background">
      <div className="relative mx-auto w-full max-w-md pb-20">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-2 bg-card px-3 py-2 shadow-sm">
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-accent">
            <div className="flex h-full w-full items-center justify-center text-sm">
              👩
            </div>
          </div>
          <button className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-primary">
            <Gift className="h-3.5 w-3.5" />
            Refer and Earn
          </button>
          <div className="flex-1" />
          <button className="p-1.5" aria-label="Wishlist">
            <Heart className="h-5 w-5 text-foreground" />
          </button>
          <button className="relative p-1.5" aria-label="Cart">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              12
            </span>
          </button>
        </header>

        {/* Search */}
        <div className="bg-card px-3 pb-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search by Keyword or Product ID"
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Mic className="h-4 w-4 text-muted-foreground" />
            <Camera className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Categories rail */}
        <section className="bg-card px-2 pb-3">
          <div className="grid grid-cols-6 gap-x-1 gap-y-3">
            {CATEGORIES.map((c) => (
              <button key={c.label} className="flex flex-col items-center gap-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-t-full rounded-b-md bg-gradient-to-b from-accent to-secondary text-2xl">
                  {c.emoji}
                </div>
                <span className="line-clamp-1 w-14 text-center text-[10px] text-foreground">
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Filter bar */}
        <div className="sticky top-[52px] z-10 flex items-center justify-between gap-2 border-y border-border bg-card px-3 py-2 text-xs font-medium">
          <button className="inline-flex items-center gap-1 text-foreground">
            <ArrowUpDown className="h-3.5 w-3.5" /> Sort
          </button>
          <button className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-foreground">
            Category <ChevronDown className="h-3 w-3" />
          </button>
          <button className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-foreground">
            Gender <ChevronDown className="h-3 w-3" />
          </button>
          <button className="inline-flex items-center gap-1 text-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </button>
        </div>

        {/* Product grid */}
        <section className="grid grid-cols-2 gap-0.5 bg-border/40">
          {PRODUCTS.map((p, i) => (
            <article key={i} className="relative bg-card">
              <div
                className={`relative flex aspect-square items-center justify-center bg-gradient-to-br ${p.bg} text-7xl`}
              >
                <span>{p.emoji}</span>
                <button
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow"
                  aria-label="Wishlist"
                >
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </button>
                {p.video && (
                  <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded bg-white/90">
                    <PlaySquare className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
              </div>
              <div className="p-2">
                {p.ad && (
                  <span className="text-[10px] font-semibold text-muted-foreground">
                    Ad ·{" "}
                  </span>
                )}
                <span className="line-clamp-1 text-xs text-foreground">{p.name}</span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-sm font-bold text-foreground">{p.price}</span>
                  <span className="text-[11px] text-muted-foreground line-through">
                    {p.mrp}
                  </span>
                  <span className="text-[11px] font-medium text-success">
                    {p.discount}
                  </span>
                  <span className="ml-auto text-[10px] font-medium text-muted-foreground">
                    UPI
                  </span>
                </div>
                {p.cod && (
                  <p className="text-[11px] text-muted-foreground">{p.cod}</p>
                )}
                <div className="mt-1 flex items-center justify-between">
                  <span className="inline-flex items-center gap-0.5 rounded bg-success px-1.5 py-0.5 text-[10px] font-semibold text-success-foreground">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    {p.rating}
                    <span className="ml-1 font-normal opacity-90">({p.reviews})</span>
                  </span>
                  {p.trusted && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary">
                      <span className="text-primary">m</span> Trusted
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Floating SakhiAI launcher */}
        <Link
          to="/sakhi"
          className="fixed bottom-20 right-4 z-30 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 max-[440px]:right-3"
          style={{
            background: "var(--gradient-primary)",
            // keep within the centered max-w-md column visually
          }}
          aria-label="Open SakhiAI"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-base">
            🌸
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="flex items-center gap-1">
              SakhiAI <Sparkles className="h-3 w-3" />
            </span>
            <span className="text-[10px] font-normal opacity-90">Ask me anything</span>
          </span>
        </Link>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 border-t border-border bg-card">
          <ul className="grid grid-cols-5">
            {[
              { icon: Home, label: "Home", active: true },
              { icon: LayoutGrid, label: "Categories" },
              { icon: Store, label: "Mall" },
              { icon: PlaySquare, label: "Video Finds" },
              { icon: Package, label: "My Orders" },
            ].map(({ icon: Icon, label, active }) => (
              <li key={label}>
                <button
                  className={`flex w-full flex-col items-center gap-0.5 py-2 text-[10px] ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}

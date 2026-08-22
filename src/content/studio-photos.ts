import { z } from "zod";

export const ownerMediaCapturedAt = "2026-08-22T18:14:00+02:00";

export const studioPhotoSchema = z.object({
  id: z.string().regex(/^studio-photo-[a-z0-9-]+$/),
  src: z.string().regex(/^\/media\/[a-z0-9-]+\.jpg$/),
  alt: z.string().min(1),
  width: z.literal(1024),
  height: z.literal(571),
  status: z.enum(["published", "blocked"]).default("published"),
});

export type StudioPhotoRecord = z.infer<typeof studioPhotoSchema>;
export type StudioPhotoInput = z.input<typeof studioPhotoSchema>;

const photo = (record: StudioPhotoInput): StudioPhotoRecord =>
  studioPhotoSchema.parse(record);

export const studioPhotos = {
  hero: photo({
    id: "studio-photo-hero",
    src: "/media/hero-branded-set.jpg",
    width: 1024,
    height: 571,
    alt: "Almond-shaped manicure with a nude base, tortoiseshell tips, black-and-white dotted tips, and gold bead and pearl accents on a Beauty Nail Studio by Cj display.",
  }),
  visitStorefront: photo({
    id: "studio-photo-visit-storefront",
    src: "/media/visit-storefront.jpg",
    width: 1024,
    height: 571,
    alt: "Night-time storefront of Beauty Nail Studio by Cj, with the studio name on the sign and the interior visible through glass doors.",
  }),
  studioInterior: photo({
    id: "studio-photo-interior",
    src: "/media/studio-interior.jpg",
    width: 1024,
    height: 571,
    alt: "Interior of Beauty Nail Studio by Cj with manicure tables, pink arched polish shelves, and butterfly pendant lights.",
  }),
  studioSign: photo({
    id: "studio-photo-sign",
    src: "/media/studio-sign.jpg",
    width: 1024,
    height: 571,
    alt: "Interior wall sign reading Beauty Nail Studio by Cj on a pink wall, with nail color displays in front.",
  }),
  studioHygiene: photo({
    id: "studio-photo-hygiene",
    src: "/media/studio-hygiene.jpg",
    width: 1024,
    height: 571,
    alt: "Open sterilizer tray holding stainless steel manicure tools, with a gloved hand nearby.",
  }),
  lashes: photo({
    id: "studio-photo-lashes",
    src: "/media/lashes-classic.jpg",
    width: 1024,
    height: 571,
    alt: "Close-up of finished eyelashes and eyebrows after a studio visit.",
  }),
  customNailArt: photo({
    id: "studio-photo-custom-nail-art",
    src: "/media/gallery-ocean.jpg",
    width: 1024,
    height: 571,
    alt: "Almond-shaped manicure with a nude base, blue-and-white textured wave details, and small gold starfish and pearl accents.",
  }),
  rose: photo({
    id: "studio-photo-rose",
    src: "/media/gallery-rose.jpg",
    width: 1024,
    height: 571,
    alt: "Manicure with pink rose nail art on a dark surface.",
  }),
  laceBow: photo({
    id: "studio-photo-lace-bow",
    src: "/media/gallery-lace-bow.jpg",
    width: 1024,
    height: 571,
    alt: "Almond-shaped manicure with a nude base, black lace-patterned tips, and small black bow accents.",
  }),
  goldLeaf: photo({
    id: "studio-photo-gold-leaf",
    src: "/media/gallery-gold-leaf.jpg",
    width: 1024,
    height: 571,
    alt: "Short rounded manicure with nude and blush bases, gold leaf, and thin gold line work on a dark reflective surface.",
  }),
  redChrome: photo({
    id: "studio-photo-red-chrome",
    src: "/media/gallery-red-chrome.jpg",
    width: 1024,
    height: 571,
    alt: "Manicure with a glossy red chrome finish.",
  }),
  pink: photo({
    id: "studio-photo-pink",
    src: "/media/gallery-pink.jpg",
    width: 1024,
    height: 571,
    alt: "Manicure in a glossy pink finish.",
  }),
  rhinestone: photo({
    id: "studio-photo-rhinestone",
    src: "/media/gallery-rhinestone.jpg",
    width: 1024,
    height: 571,
    alt: "Almond-shaped manicure with a sheer nude base, champagne glitter tips, and rhinestone accents.",
  }),
} as const;

export const pageStudioPhotos = [
  studioPhotos.hero,
  studioPhotos.visitStorefront,
  studioPhotos.studioInterior,
  studioPhotos.studioSign,
  studioPhotos.studioHygiene,
  studioPhotos.lashes,
  studioPhotos.customNailArt,
] as const;

export function publishedPhotoById(id: string): StudioPhotoRecord | undefined {
  const photo = Object.values(studioPhotos).find((item) => item.id === id);

  if (!photo || photo.status !== "published") {
    return undefined;
  }

  return photo;
}

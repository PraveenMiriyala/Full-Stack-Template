import Image from "next/image";

export interface ImageBlockProps {
  image?:
    | {
        url?: string;
        alt?: string;
        width?: number;
        height?: number;
      }
    | string;
  caption?: string;
}

export function ImageBlockComponent({ image, caption }: ImageBlockProps) {
  if (!image) return null;

  const imageUrl = typeof image === "string" ? image : image.url;
  const imageAlt =
    typeof image === "string" ? "Media content" : image.alt || "Media content";

  if (!imageUrl) return null;

  return (
    <figure className="container flex flex-col items-center py-8">
      <div className="relative h-80 w-full max-w-4xl overflow-hidden rounded-xl shadow-md md:h-96">
        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

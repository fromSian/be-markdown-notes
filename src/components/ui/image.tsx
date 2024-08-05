import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
interface ImageProps {
  src: string;
  iconSize?: number;
  className?: string;
  alt?: string;
  showAlt?: boolean;
}

const BeautyImage = ({
  src,
  iconSize = 16,
  className = "",
  alt = "",
  showAlt = false,
}: ImageProps) => {
  // load successfully or not
  const [imageLoaded, setImageLoaded] = useState(false);

  /**
   * onLoad event
   */
  const onImageLoad = () => {
    setImageLoaded(true);
  };

  /**
   * everytime the src changes, set load status to fail
   */
  useEffect(() => {
    setImageLoaded(false);
  }, [src]);

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center text-xs text-ttertiary",
        className
      )}
    >
      <div
        className={cn(
          "grid",
          imageLoaded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <img className="rounded-full" src={src} onLoad={onImageLoad} />
        </div>
      </div>
      {/* custom error component */}
      {!imageLoaded && (
        <div className="flex flex-col items-center justify-center">
          <Image size={iconSize} />
          {showAlt && alt && <p>{alt}</p>}
        </div>
      )}
    </div>
  );
};

export default BeautyImage;

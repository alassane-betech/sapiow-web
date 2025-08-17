"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Professional } from "@/types/professional";
import Image from "next/image";

interface ProfessionalCardProps {
  professional: Professional;
  isLiked: boolean;
  onToggleLike: (id: number) => void;
  onProfessionalClick?: (professional: Professional) => void;
  imageWidth?: number;
  imageHeight?: number;
  maxWidth?: string;
  lineClamp?: number;
}

export default function ProfessionalCard({
  professional,
  isLiked,
  onToggleLike,
  onProfessionalClick,
  imageWidth = 175,
  imageHeight = 196,
  maxWidth = "max-w-[175px]",
  lineClamp = 3,
}: ProfessionalCardProps) {
  return (
    <Card
      className={`mx-auto p-0 m-0 border-none shadow-none ${maxWidth} w-full cursor-pointer duration-200 my-3 rounded-2xl`}
      onClick={() => onProfessionalClick?.(professional)}
    >
      <div className="relative">
        {professional.topExpertise && (
          <Badge className="absolute bottom-3 left-3 bg-white text-black font-bold font-inter text-xs hover:bg-white">
            Top Expert
          </Badge>
        )}
        <Image
          src={professional.image || professional.avatar || "/placeholder.svg"}
          alt={
            professional.name ||
            `${professional.first_name || ""} ${
              professional.last_name || ""
            }`.trim() ||
            "Professional"
          }
          width={imageWidth}
          height={imageHeight}
          quality={100}
          className="w-full h-full object-cover rounded-[12px]"
          style={{
            objectFit: "cover",
            width: imageWidth,
            height: imageHeight,
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/20 hover:bg-white rounded-full w-8 h-8 backdrop-blur-[1.4px]"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(
              typeof professional.id === "string"
                ? parseInt(professional.id, 10) || 0
                : professional.id
            );
          }}
        >
          <Image
            src={
              isLiked
                ? "/assets/icons/heartactif.svg"
                : "/assets/icons/heart.svg"
            }
            alt="Heart"
            width={16}
            height={16}
            className="transition-all duration-200"
          />
        </Button>
      </div>
      <CardContent className="flex items-center justify-between p-0 m-0">
        <div>
          <div className="flex items-center mb-1">
            <h3 className="font-bold text-black text-sm truncate">
              {professional.name ||
                `${professional.first_name || ""} ${
                  professional.last_name || ""
                }`.trim() ||
                "Nom non disponible"}
            </h3>
            {professional.verified && (
              <Image
                src="/assets/icons/verified.svg"
                alt="Verified"
                width={16}
                height={16}
                className="transition-all duration-200"
              />
            )}
            {professional.topExpertise && (
              <Image
                src="/assets/icons/top-verified.svg"
                alt="Verified"
                width={16}
                height={16}
                className="transition-all duration-200"
              />
            )}
          </div>
          <p className="text-xs text-black mb-1">
            {professional.price ? (
              <>
                <span className="font-bold font-figtree">
                  {professional.price}
                </span>{" "}
                / Session
              </>
            ) : (
              ""
            )}
          </p>
          <p
            className={`text-xs text-gray-500 leading-relaxed font-figtree line-clamp-${lineClamp} overflow-hidden`}
          >
            {professional.description}
          </p>
        </div>
        {professional.linkedin && (
          <Image
            src="/assets/icons/linkedin.svg"
            alt="Linkedin"
            width={25}
            height={25}
            className="transition-all duration-200"
          />
        )}
      </CardContent>
    </Card>
  );
}

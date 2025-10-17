"use client";
import { Button } from "@/components/common/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import AccountLayout from "../AccountLayout";

export default function APropos() {
  const t = useTranslations();

  return (
    <AccountLayout>
      <div className="flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-200px)]">
        <Image
          src="/assets/iconSidebare/logo.svg"
          alt={t("about.logoAlt")}
          width={74}
          height={74}
          className="p-0 m-0"
        />
        <div className="w-full flex flex-col justify-center items-center gap-4 mt-3">
          <Link href="/" className="text-xl">
            Sapiow.com
          </Link>
          <p className="text-base text-gray-500 mb-10">
            {t("about.copyright")}
          </p>

          <Button
            label={t("about.contactUs")}
            className="bg-white font-bold text-ford-blue h-[56px] w-full max-w-[343px] border border-light-blue-gray hover:bg-light-blue-gray font-figtree"
          />
          <Button
            label={t("about.visitWebsite")}
            className="bg-white font-bold text-ford-blue h-[56px] w-full max-w-[343px] border border-light-blue-gray mt-1 hover:bg-light-blue-gray font-figtree"
          />
        </div>
      </div>
    </AccountLayout>
  );
}

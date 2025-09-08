import { Button } from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";
import AccountLayout from "../AccountLayout";

export default function APropos() {
  return (
    <AccountLayout>
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src="/assets/icons/logoSapiow.svg"
          alt="logo"
          width={101}
          height={91}
          className="p-0 mt-10"
        />
        <Image
          src="/assets/icons/sapiow.svg"
          alt="logo"
          width={203}
          height={74}
          className="p-0 m-0"
        />
        <div className="w-full flex flex-col justify-center items-center gap-4 mt-3">
          <Link href="/" className="text-xl">
            Sapiow.com
          </Link>
          <p className="text-base text-gray-500 mb-10">
            © 2025 Sapiow. Tous droits réservés.
          </p>

          <Button
            label="Contactez-nous"
            className="bg-white font-bold text-ford-blue h-[56px] w-full max-w-[343px] border border-light-blue-gray hover:bg-light-blue-gray font-figtree"
          />
          <Button
            label="Visitez le site web"
            className="bg-white font-bold text-ford-blue h-[56px] w-full max-w-[343px] border border-light-blue-gray mt-1 hover:bg-light-blue-gray font-figtree"
          />
        </div>
      </div>
    </AccountLayout>
  );
}

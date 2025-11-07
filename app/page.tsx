import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Link href="/intro">Intro</Link>
      <Link href="/product/a" prefetch={false}>
        Product a
      </Link>
      <Link href="/product/b" prefetch={false}>
        Product a=b
      </Link>
      <Link href="/product/c" prefetch={false}>
        Product a=b
      </Link>
    </div>
  );
}

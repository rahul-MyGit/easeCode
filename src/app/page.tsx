import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
export default async function Home() {
  return (
    <Button onClick={() => {
      alert("clicked");
    }}>
      Click me
    </Button>
  );
}

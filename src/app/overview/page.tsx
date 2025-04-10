import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OverviewPage() {
    return(
        <div>
            <Link
              className="px-2 py-3 text-center text-white transition hover:text-[#e4212b] sm:hidden sm:rounded-lg sm:py-1 md:px-4"
              href="/"
            >
              Shuffle
            </Link>
        </div>
    );
}
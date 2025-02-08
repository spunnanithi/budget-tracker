import { PiggyBank } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2">
			<PiggyBank className="stroke stroke-amber-500 stroke-[1.5] h-11 w-11" />
			<p className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold text-transparent leading-right tracking-tighter">
				BudgetTracker
			</p>
		</Link>
	);
}
export function LogoMobile() {
	return (
		<Link href="/" className="flex items-center gap-2">
			<p className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold text-transparent leading-right tracking-tighter">
				BudgetTracker
			</p>
		</Link>
	);
}

export default Logo;

import Navbar from "@/components/Navbar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex h-screen w-full flex-col">
			<Navbar />
			<div className="w-full mx-4">{children}</div>
		</div>
	);
}

export default Layout;

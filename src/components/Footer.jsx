import React from "react";

export const Footer = () => {
    return (
        <footer className=" w-screen bg-slate-900 text-zinc-100 border-t border-zinc-700">
            <div className="container mx-auto py-4 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} CareerCrafter. All rights reserved.
                </p>
            </div>
        </footer>
    );
};


import React from "react";
import { MenuIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";
export const HeaderSection = (): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    { label: "Offre", href: "#offre" },
    { label: "Démos", href: "#demos" },
    { label: "Tarifs", href: "#products" },
  ];

  return (
    <header className="flex items-center justify-between px-4 md:px-8 lg:px-20 py-4 md:py-6 relative self-stretch w-full flex-[0_0_auto] bg-transparent">
      {/* Logo/Brand Name */}
      <div className="relative w-fit font-heading-5 font-[number:var(--heading-5-font-weight)] text-amber-900 text-xl md:text-2xl lg:text-[length:var(--heading-5-font-size)] tracking-[var(--heading-5-letter-spacing)] leading-[var(--heading-5-line-height)] whitespace-nowrap [font-style:var(--heading-5-font-style)]">
        <img
          className="w-12 h-12 md:w-16 md:h-16"
          alt="Logo"
          src="/logo-pv.png"
          />
      </div>

      {/* Navigation and Sign Up Button */}
      <div className="inline-flex items-center gap-2 md:gap-4 relative flex-[0_0_auto]">
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="flex gap-2">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.href}
                  className="inline-flex items-center gap-2 px-2 py-3 relative self-stretch flex-[0_0_auto]"
                >
                  <span className="relative w-fit mt-[-1.00px] font-button-m font-[number:var(--button-m-font-weight)] text-gray-900 text-[length:var(--button-m-font-size)] tracking-[var(--button-m-letter-spacing)] leading-[var(--button-m-line-height)] whitespace-nowrap [font-style:var(--button-m-font-style)]">
                    {item.label}
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Connexion espace client */}
        <a
          href="/espace-client-login"
          className="ml-4 px-5 py-2 rounded-lg bg-blue-gray900 text-white font-bold shadow hover:bg-blue-gray700 transition hidden md:inline-block"
        >
          Espace client
        </a>

        {/* Mobile Menu Button */}
        <div className="lg:hidden p-2 cursor-pointer">
          <MenuIcon className="w-6 h-6 text-amber-900" />
        </div>

      </div>
    </header>
  );
};
 

import { Menu, Home, Search as SearchIcon, Bell } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="bg-white hover:bg-white/90">
            <Menu className="h-6 w-6 text-water-dark" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 bg-white border-l-water">
          <SheetHeader>
            <SheetTitle className="text-water-dark">Menu</SheetTitle>
          </SheetHeader>
          <NavigationMenu className="mt-8 w-full">
            <NavigationMenuList className="flex flex-col space-y-4 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/" className="text-water-dark hover:text-water transition-colors flex items-center gap-3 w-full px-2 py-1">
                  <Home className="h-5 w-5" />
                  Main
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/search" className="text-water-dark hover:text-water transition-colors flex items-center gap-3 w-full px-2 py-1">
                  <SearchIcon className="h-5 w-5" />
                  Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/alerts" className="text-water-dark hover:text-water transition-colors flex items-center gap-3 w-full px-2 py-1">
                  <Bell className="h-5 w-5" />
                  Alerts
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navigation;

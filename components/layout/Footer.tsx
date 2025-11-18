import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-accent-primary text-background py-12">
      <div className="w-[85%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Pora Door</h3>
            <p className="text-sm opacity-90">
              Storm Doors, Simplified.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="#products" className="hover:opacity-100 transition-opacity">
                  Storm Doors
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:opacity-100 transition-opacity">
                  Entry Doors
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:opacity-100 transition-opacity">
                  Historic Styles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="#about" className="hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="#" className="hover:opacity-100 transition-opacity">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition-opacity">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition-opacity">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-divider text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Pora Door. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


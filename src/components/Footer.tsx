import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-secondary text-gray-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-black text-xl">
                N
              </div>
              <h2 className="text-xl font-black tracking-tighter text-white">
                NAIRO<span className="text-primary">MARKET</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Kenya's leading marketplace for electronics, fashion, and home essentials. Quality products, fast delivery.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Combined */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px]">Shop</h4>
              <ul className="space-y-2 text-xs">
                {["Electronics", "Fashion", "Home", "Health"].map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px]">Support</h4>
              <ul className="space-y-2 text-xs">
                {["Help Center", "Track Order", "Returns", "Contact"].map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Minimal */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px]">Contact</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@nairomarket.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© 2024 NairoMarket. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
            <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-white">M-PESA</div>
            <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-white">MASTERCARD</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

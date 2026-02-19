import React from 'react';
import { Phone, Mail, Github, Linkedin, MapPin, Building2, IndianRupee } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-card p-8 mt-8">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <p className="text-3xl font-bold gradient-text mb-2">Kumar Harsh</p>
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Phone className="w-4 h-4" />
            <a href="tel:+919279157296" className="hover:text-blue-400 transition-colors">
              +91 9279157296
            </a>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-400 max-w-2xl">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Building2 className="w-4 h-4" />
            <span>Octa Byte AI Pvt Ltd</span>
          </div>
          <p className="text-xs">CIN: U62099KA2025PTC201620</p>
          <div className="flex items-center justify-center space-x-1 mt-2">
            <MapPin className="w-3 h-3" />
            <p className="text-xs">
              WeWork Prestige Cube, Site no:26, Laskar Housur Rd, Adugodi, Bangalore South, Bangalore -560030, Karnataka
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all hover:scale-110">
            <Github className="w-5 h-5 text-gray-400" />
          </a>
          <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all hover:scale-110">
            <Linkedin className="w-5 h-5 text-gray-400" />
          </a>
          <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all hover:scale-110">
            <Mail className="w-5 h-5 text-gray-400" />
          </a>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <span>© 2024 Portfolio Dashboard</span>
          <span>•</span>
          <span>Real-time data from Alpha Vantage</span>
          <span>•</span>
          <span>All values in ?</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

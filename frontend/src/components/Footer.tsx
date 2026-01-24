import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Computer Science RMUTL NAN Lottery App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

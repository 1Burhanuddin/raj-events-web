import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-lime-400 text-black py-4 px-4 shadow-md w-full">
        <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <img 
                src="/app_logo_dark.png" 
                alt="RajEvents Logo" 
                className="h-10 w-auto brightness-0 contrast-200"
              />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              RajEvents
            </span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-800 hover:text-gray-600 font-medium transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="w-screen mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-4 px-4 border-t w-full">
        <div className="max-w-7xl mx-auto w-full px-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-center border-b-2 pb-2">
            <span>© {new Date().getFullYear()} RajEvents. All rights reserved.</span>
          </div>
          <Link to="/delete-account" className="text-destructive hover:underline flex items-center justify-center pt-2">
            Delete Account
          </Link>
        </div>
      </footer>
    </div>
  );
};

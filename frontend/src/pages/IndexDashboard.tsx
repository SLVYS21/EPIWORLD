
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          EpiWorld
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Your all-in-one platform for campus dining, lost & found, and student forum.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="w-12 h-12 bg-cafeteria/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cafeteria">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                <line x1="6" x2="6" y1="2" y2="4"></line>
                <line x1="10" x2="10" y1="2" y2="4"></line>
                <line x1="14" x2="14" y1="2" y2="4"></line>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Cafeteria</h2>
            <p className="text-gray-600 text-sm">
              Order food, view daily specials, and track your orders in real-time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="w-12 h-12 bg-lost/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lost">
                <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
                <path d="m7 16.5-4.74-2.85"></path>
                <path d="m7 16.5 5-3"></path>
                <path d="M7 16.5v5.17"></path>
                <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
                <path d="m17 16.5-5-3"></path>
                <path d="m17 16.5 4.74-2.85"></path>
                <path d="M17 16.5v5.17"></path>
                <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
                <path d="M12 8 7.26 5.15"></path>
                <path d="m12 8 4.74-2.85"></path>
                <path d="M12 13.5V8"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Lost & Found</h2>
            <p className="text-gray-600 text-sm">
              Report lost items or search through found items to recover your belongings.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="w-12 h-12 bg-forum/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forum">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Student Forum</h2>
            <p className="text-gray-600 text-sm">
              Connect with other students, share information, and participate in discussions.
            </p>
          </div>
        </div>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link to="/admin">Access Admin Dashboard</Link>
        </Button>
      </div>
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © 2025 EpiWorld. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;

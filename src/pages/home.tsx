import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useAction, useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../convex/_generated/api";

const FEATURES = [
  {
    icon: "⚡️",
    title: "React + Vite",
    description: "Lightning-fast development with modern tooling and instant HMR"
  },
  {
    icon: "🔐",
    title: "Clerk Auth",
    description: "Secure authentication and user management out of the box"
  },
  {
    icon: "🚀",
    title: "Convex BaaS",
    description: "Real-time backend with automatic scaling and TypeScript support"
  },
  {
    icon: "💳",
    title: "Stripe",
    description: "Seamless payment integration for your SaaS"
  }
] as const;

function App() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const storeUser = useMutation(api.users.store);


  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      storeUser();
    }
  }, [user, storeUser]);


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              Tempo React Starter
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mb-8">
              Launch your next project faster with our modern tech stack: React + Vite, Clerk Auth, Convex BaaS, and Stripe payments.
            </p>

            {!isUserLoaded ?
              <div className="flex gap-4">
                <div className="px-8 py-3 w-[145px] h-[38px] rounded-lg bg-gray-200 animate-pulse"></div>
              </div>
              :
              <div className="flex justify-center items-center gap-4">
                <Unauthenticated>
                  <SignInButton mode="modal">
                    <Button className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200">
                      Get Started
                    </Button>
                  </SignInButton>
                </Unauthenticated>
                <Authenticated>
                  <Button onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                </Authenticated>
              </div>}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {FEATURES.map(feature => (
              <div key={feature.title} className="p-6 bg-gray-50 rounded-xl">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
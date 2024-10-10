import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, Users, Map, BookOpen, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code2 className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold">SheenEdge</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/codo" className="hover:text-blue-400 transition-colors">
            Codo
          </Link>
          <Link to="#features" className="hover:text-blue-400 transition-colors">
            Features
          </Link>
          <Link to="#community" className="hover:text-blue-400 transition-colors">
            Community
          </Link>
          <Link to="#resources" className="hover:text-blue-400 transition-colors">
            Resources
          </Link>
        </nav>
        <Link to="/login" className="hidden md:inline-flex hover:text-slate-100 active:bg-[rgb(17,24,39)] hover:bg-[rgb(31,41,55)] shadow-lg bg-white hover:border-[rgb(31,41,55)] text-black px-3 py-2 rounded-xl border-2 border-black">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mr-2"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"></path>
          </svg>
          Sign in
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {isNavOpen && (
        <nav className="md:hidden bg-gray-800 py-4">
          <ul className="space-y-4 text-center">
            <li>
              <Link to="/codo" className="hover:text-blue-400 transition-colors">
                Codo
              </Link>
            </li>
            <li>
              <Link to="#Features" className="hover:text-blue-400 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link to="#community" className="hover:text-blue-400 transition-colors">
                Community
              </Link>
            </li>
            <li>
              <Link to="#resources" className="hover:text-blue-400 transition-colors">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-slate-100 transition-colors">
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      )}

<main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Empower Your Coding Journey</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            SheenEdge provides students with community exposure, an integrated code editor, and
            personalized AI-made roadmaps. All your resources, in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Learning
            </Button>
            <Button size="lg" variant="outline">
              Explore Features
            </Button>
          </div>
        </section>

        <section id="features" className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose SheenEdge?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="mb-4">
                  <Users className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Vibrant Community</h3>
                <p className="text-gray-300">
                  Connect with like-minded students, share knowledge, and grow together in our supportive community.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="mb-4">
                  <Code2 className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrated Code Editor</h3>
                <p className="text-gray-300">
                  Write, run, and debug your code directly in our platform with our powerful integrated code editor.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="mb-4">
                  <Map className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Roadmaps</h3>
                <p className="text-gray-300">
                  Get personalized learning paths created by our AI to guide you through your coding journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="community" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Thriving Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with thousands of students, mentors, and industry professionals. Learn, share, and grow together.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Join Community
            </Button>
          </div>
        </section>

        <section id="resources" className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">All Resources in One Place</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-700 p-6 rounded-lg flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Tutorials</h3>
                  <p className="text-gray-300 mb-4">
                    Access a wide range of tutorials covering various programming languages and concepts.
                  </p>
                  <Link to="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Code2 className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Practice Projects</h3>
                  <p className="text-gray-300 mb-4">
                    Apply your skills with real-world projects and build your portfolio.
                  </p>
                  <Link to="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mentor Connect</h3>
                  <p className="text-gray-300 mb-4">
                    Get guidance from experienced mentors in your field of interest.
                  </p>
                  <Link to="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Map className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Career Roadmaps</h3>
                  <p className="text-gray-300 mb-4">
                    Explore different career paths and plan your journey in the tech industry.
                  </p>
                  <Link to="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join SheenEdge today and take the first step towards mastering your coding skills.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-sm bg-gray-700 text-white border-gray-600"
              />
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold">SheenEdge</span>
            </div>
            <nav className="flex space-x-6">
              <Link to="#" className="hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div className="mt-6 text-center text-gray-400">
            © {new Date().getFullYear()} SheenEdge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

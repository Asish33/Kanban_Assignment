import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const LandingPage = () => {
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    navigate("/dashboard")
  }
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex justify-center">
        <div className="bg-gray-900 text-white overflow-hidden w-full h-full">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 z-10"></div>
            <div className="relative z-20 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col items-center justify-center min-h-full">
              <nav className="absolute top-0 left-0 right-0 flex justify-between items-center py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8 lg:px-16 w-full">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-indigo-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform transition-transform duration-300 hover:scale-110"
                    ></path>
                    <path
                      d="M12 22V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform transition-transform duration-300 hover:scale-110"
                    ></path>
                    <path
                      d="M12 12L20 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform transition-transform duration-300 hover:scale-110"
                    ></path>
                    <path
                      d="M12 12L4 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform transition-transform duration-300 hover:scale-110"
                    ></path>
                  </svg>
                  <span className="font-bold text-lg sm:text-xl tracking-tight">
                    KanBan
                  </span>
                </div>

                <details className="md:hidden relative">
                  <summary className="list-none cursor-pointer p-2 hover:bg-gray-800 rounded-md transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </summary>
                </details>
              </nav>

              <div className="text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400">
                    Organize. Prioritize. Achieve.
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 text-gray-300">
                  Take control of your tasks with a beautifully designed Kanban
                  board.
                </p>
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:gap-4">
                  <Button
                    onClick={handleNavigate}
                    className="px-6 sm:px-7 md:px-8 py-3 bg-indigo-500 rounded-lg font-medium hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-600/30"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

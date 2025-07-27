import { FaGithub, FaLinkedin } from "react-icons/fa";

// Define the SocialIcons component
export function SocialIcons() {
    return (
      <div className="flex gap-x-4">
        
        {/* GitHub icon */}
        <a
          href="https://github.com/gowthamde24/Automated-Aquarium-Project.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-white hover:text-gray-300" />
        </a>
        {/* Add more social media icons as needed */}
      </div>
    );
  }
  
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Define the SocialIcons component
export function SocialIcons() {
    return (
      <div className="flex gap-x-4">
        {/* LinkedIn icon */}
        {/* <a
          href="https://www.linkedin.com/in/gowtham-reddy-sodanapalli-401348194/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-white hover:text-gray-300" />
        </a> */}
        {/* GitHub icon */}
        <a
          href="https://github.com/Joserra13/automated-aquarium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-white hover:text-gray-300" />
        </a>
        {/* Add more social media icons as needed */}
      </div>
    );
  }
  
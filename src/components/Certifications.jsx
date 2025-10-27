import { FaAward, FaDatabase, FaUserGraduate } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { GiLaurelCrown } from "react-icons/gi";
import { SiCoursera } from "react-icons/si";

const Certifications = () => {
  const certs = [
    {
      name: "Full Development Bootcamp",
      issuer: "Roman GUERRY",
      year: "2025",
      icon: <FaUserGraduate className="text-blue-400 text-2xl" />,
      link: "https://example.com/bootcamp", 
    },
    {
      name: "Database Design & SQL Fundamentals",
      issuer: "Roman GUERRY",
      year: "2025",
      icon: <FaDatabase className="text-green-400 text-2xl" />,
      link: "https://example.com/database-sql",
    },
    {
      name: "Innovative Creator Award",
      issuer: "Datawords Philippines",
      year: "2025",
      icon: <FaAward className="text-yellow-400 text-2xl" />,
      link: "https://example.com/creator-award",
    },
    {
      name: "Youth Empowerment Session",
      issuer: "Synchrony Global",
      year: "2025",
      icon: <SiCoursera className="text-purple-400 text-2xl" />,
      link: "#",
    },
    {
      name: "Using Python to Interact with the Operating System",
      issuer: "Coursera",
      year: "2025",
      icon: <SiCoursera className="text-blue-500 text-2xl" />,
      link: "https://www.coursera.org/account/accomplishments/records/ZLQ3GCRJVF9R",
    },
    {
      name: "Crash Course on Python",
      issuer: "Coursera",
      year: "2025",
      icon: <SiCoursera className="text-blue-500 text-2xl" />,
      link: "https://coursera.org/share/8eef1cc2b9b57f4bef89f5430b3ecbf7",
    },
    {
      name: "Foundations of Cybersecurity",
      issuer: "Coursera",
      year: "2025",
      icon: <SiCoursera className="text-blue-500 text-2xl" />,
      link: "https://www.coursera.org/account/accomplishments/certificate/VNLK04AACGRC",
    },
    {
      name: "Tech Talk: Generative AI",
      issuer: "Accenture",
      year: "2025",
      icon: <SiCoursera className="text-purple-800 text-2xl"/>,
      link: "https://drive.google.com/file/d/11kBTU8gfx3j9-ru65cGBv2m4snc4unDH/view?usp=drive_link"
    }
  ];

  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow mt-6">
      <h2 className="text-2xl font-bold mb-3">Certifications</h2>
      <ul className="space-y-3">
        {certs.map((cert, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg 
             transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              {cert.icon}
              <div>
                <a href={cert.link}>
                <h3 className="text-lg font-semibold">{cert.name}</h3>
                <p className="text-gray-400 text-sm">
                  {cert.issuer} • {cert.year}
                </p>
                </a>
              </div>
            </div>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transform hover:translate-x-1 transition duration-300"
            >
              <FiArrowRight className="text-2xl" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Certifications;

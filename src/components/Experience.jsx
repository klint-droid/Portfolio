import React from "react";

const Experience = () => {
    const seminars = [
        {
            title: "Full Stack Development",
            organizer: "Roman GUERRY",
            year: "2025",
            description: "Learned frontend (HTML, CSS, JavaScript, React) and backend (Node.js, Express, MySQL) development through hands-on projects."
        },
        {
            title: "Database Design & SQL Fundamentals",
            organizer: "Roman GUERRY",
            year: "2025",
            description: "Focused on database schema design, CRUD operations, and using SQL & NoSQL databases."
        },
        {
            title: "Adobe Photoshop Training",
            organizer: "Datawords",
            year: "2025",
            description: "Learned image editing, layout design, color correction, and creating visuals for web and print."
        },
        {
            title: "Youth Empowerment Session",
            organizer: "Synchrony Global",
            year: "2025",
            description: "Participated in a training focused on leadership, teamwork, and personal development skills for young individuals."
        },
        {
            title: "Tech Talk in Navigating the Digital Age: Cloud, Generative AI & Cybersecurity",
            organizer: "Accenture Inc.",
            year: "2025",
            description: "Participated in a symposium focused on Cloud, Generative AI & Cybersecurity"
        }
    ]

    return(
        <section className="bg-gray-800 p-6 rounded-xl shadow mt-6">
            <h2 className="text-2xl font-bold mb-3">Workshops & Bootcamps</h2>
            <ul className="space-y-4">
                {seminars.map((e, index) => (
                    <li 
                    key={index}
                    className="flex justify-between items-center border-gray-700"
                    >
                        <div>
                            <h3 className="font-semibold text-white">{e.title}</h3>
                            <h2 className="text-gray-400 text-sm">{e.organizer}</h2>
                            <p className="text-gray-400 text-sm">{e.description}</p>
                        </div>
                        <span className="text-gray-500">{e.year}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Experience;
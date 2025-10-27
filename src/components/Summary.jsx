import React from "react";

const Summary = () => {
    return(
        <section className="grid grid-rows-1 gap-5 mt-2">
            <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-800 p-6 rounded-xl text-center shadow transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out">
                <h3 className="text-3xl font-bold text-blue-400">2.5</h3>
                <p className="text-gray-300">Associate in Computer Technology Major in Software Development</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center  transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out">
                <h3 className="text-3xl font-bold text-green-400">2</h3>
                <p className="text-gray-300">Projects Completed</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center shadow transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out">
                <h3 className="text-3xl font-bold text-purple-400">13</h3>
                <p className="text-gray-300">Tech Stack</p>
            </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 shadow transform hover:-translate-y-1 hover:scale-104 transition duration-300 ease-in-out">
                <span className="text-xl font-semibold">Available for new opportunities</span>
                <span className="text-cl"> - Open to work</span>
            </div>
        </section>
    );
}

export default Summary;
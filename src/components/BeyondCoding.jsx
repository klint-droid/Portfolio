import React from "react";
import { FaRegBookmark } from "react-icons/fa";

const BeyondCoding = () => {
    return(
        <div className="card rounded-3xl h-auto">
            <div className="flex items-center gap-2 mb-4">
                <FaRegBookmark size={24} />
                <h2 className="text-lg font-bold">Beyond Coding</h2>
            </div>
            <div className="space-y-4 text-sm leading-tight">
                <p>I stay active through running, biking, and hiking, which keeps me energized and focused, fueling creativity and productivity in my work.</p>
                <p>I'm also involved in church activities as multimedia staff and part of the music team, strengthening my teamwork and leadership skills.</p>
            </div>
        </div>
    );
}

export default BeyondCoding;
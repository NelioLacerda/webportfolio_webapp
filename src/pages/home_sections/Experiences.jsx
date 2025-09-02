import { Timeline } from "../../components/Timeline.jsx";
import { experiences } from "../../constants/index.js";

const Experiences = () => {
    return (
        <div className="w-full" id="experiences">
            <Timeline data={experiences} />
        </div>
    );
};

export default Experiences;
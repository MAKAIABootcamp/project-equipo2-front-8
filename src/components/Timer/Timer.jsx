import { useMemo } from "react";
import PropTypes from 'prop-types';

const Timer = ({ timeLeft }) => {
    const formattedTime = useMemo(() => {
      return `${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${
        timeLeft % 60
      }`;
    }, [timeLeft]);
  
    return (
      <div className="relative w-1/2 bg-purple-200 rounded-full h-8 mt-6">
        <div className="absolute bg-color-1 h-8 w-full rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="text-black text-sm font-dosis leading-none">
            {`Tiempo restante: ${formattedTime}`}
          </p>
        </div>
      </div>
    );
  };

  Timer.propTypes = {
    timeLeft: PropTypes.number.isRequired,
  };

  export default Timer;
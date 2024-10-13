import { useMemo } from "react";
import PropTypes from 'prop-types';

const InterviewProgress = ({ currentQuestionIndex, questionsLength }) => {
    const progress = useMemo(() => {
      return Math.floor((currentQuestionIndex / questionsLength) * 100);
    }, [currentQuestionIndex, questionsLength]);
  
    return (
      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center bg-gradient-to-r from-purple-200 to-purple-300 text-black font-semibold px-4 py-2 rounded-full mr-2">
          Tu Progreso en la Entrevista
        </div>
        <div className="relative w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-md border-4 border-purple-200">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-60">
            <path
              className="text-purple-200 stroke-current"
              strokeWidth="4"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-purple-600 stroke-current"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress}, 100`}
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-lg text-purple-700 font-bold">
            {progress}%
          </span>
        </div>
      </div>
    );
  };

InterviewProgress.propTypes = {
    currentQuestionIndex: PropTypes.number.isRequired,
    questionsLength: PropTypes.number.isRequired,
  };

export default InterviewProgress;
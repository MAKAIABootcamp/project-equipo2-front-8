import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: null,
  questions: [],
  currentQuestionIndex: 0,
  chatHistory: [],
  timeLeft: 60,
  timerActive: false,
  showModal: false,
  hasStarted: false,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    setTimerActive: (state, action) => {
      state.timerActive = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setHasStarted: (state, action) => {
      state.hasStarted = action.payload;
    },
    resetInterview: (state) => {
      state.currentQuestionIndex = 0;
      state.chatHistory = [];
      state.timeLeft = 60;
      state.timerActive = false;
      state.hasStarted = false;
      state.showModal = false;
    },
  },
});

export const {
  setSelectedCategory,
  setQuestions,
  nextQuestion,
  addChatMessage,
  setTimeLeft,
  setTimerActive,
  setShowModal,
  setHasStarted,
  resetInterview,
} = interviewSlice.actions;

export default interviewSlice.reducer;
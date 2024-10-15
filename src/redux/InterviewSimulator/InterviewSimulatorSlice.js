import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../Firebase/firebaseConfig';

export const fetchQuestions = createAsyncThunk(
  'interview/fetchQuestions',
  async (selectedCategory) => {
    const querySnapshot = await getDocs(collection(database, "preguntas"));
    const questionsData = querySnapshot.docs.map(doc => doc.data());
    
    // Filtro de preguntas por categoría seleccionada
    const filteredQuestions = questionsData.filter(
      question => question.categoria === selectedCategory
    );

    // Mezclar las preguntas filtradas de manera aleatoria
    const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());

    // Seleccionar las primeras 10 preguntas de la lista mezclada
    const selectedQuestions = shuffledQuestions.slice(0, 10);

    return selectedQuestions;
  }
);

const initialState = {
  selectedCategory: null,
  questions: [],
  currentQuestionIndex: 0,
  chatHistory: [],
  timeLeft: 60,
  timerActive: false,
  showModal: false,
  hasStarted: false,
  status: 'idle',
  error: null,
};

const interviewSimulatorSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
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
      state.selectedCategory = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.chatHistory = [];
      state.timeLeft = 60;
      state.timerActive = false;
      state.showModal = false;
      state.hasStarted = false;
    },
    resetInterviewState: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.chatHistory = [];
      state.timeLeft = 60;
      state.timerActive = false;
      state.hasStarted = false;
      state.showModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedCategory,
  nextQuestion,
  addChatMessage,
  setTimeLeft,
  setTimerActive,
  setShowModal,
  setHasStarted,
  resetInterview,
  resetInterviewState,
} = interviewSimulatorSlice.actions;

export default interviewSimulatorSlice.reducer;

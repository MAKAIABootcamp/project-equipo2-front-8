import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";
import { analyzeInterviewResponse } from "../../services/openIAService";

export const fetchQuestions = createAsyncThunk(
  "interview/fetchQuestions",
  async (selectedCategory) => {
    const querySnapshot = await getDocs(collection(database, "preguntas"));
    const questionsData = querySnapshot.docs.map((doc) => doc.data());

    // Filtro de preguntas por categoría seleccionada
    const filteredQuestions = questionsData.filter(
      (question) => question.categoria === selectedCategory
    );

    // Mezclar las preguntas filtradas de manera aleatoria
    const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());

    // Seleccionar las primeras 10 preguntas de la lista mezclada
    const selectedQuestions = shuffledQuestions.slice(0, 2);

    return selectedQuestions;
  }
);

// // Acción asíncrona para analizar la respuesta
// export const analyzeAnswer = createAsyncThunk(
//   "interview/analyzeAnswer",
//   async ({ question, response, idIntento }) => {
//     let feedbacks = [];
//     const feedback = await analyzeInterviewResponse(question, response);
//     const feedbackRef = doc(database, "feedbacks", idIntento);

//     const feedbackDoc = await getDoc(feedbackRef);

//     if (feedbackDoc.exists()) {
//       feedbacks = [...feedbackDoc.data(), feedback];
//     } else {
//       feedbacks.push(feedback);
//     }

//     await setDoc(feedbackRef, feedbacks);

//     return {
//       id: idIntento,
//       feedback: feedbacks,
//     };
//   }
// );

const analyzeAnswer = async ({ question, response, idIntento }) => {
  let feedbacks = null;
  const feedback = await analyzeInterviewResponse(question, response);
  const feedbackRef = doc(database, "feedbacks", idIntento);

  const feedbackDoc = await getDoc(feedbackRef);

  if (feedbackDoc.exists()) {
    // feedbacks = [...feedbackDoc.data(), feedback];
    feedbacks = {
      feedback: [...feedbackDoc.data().feedback, feedback],
    };
  } else {
    feedbacks = {
      feedback: [feedback],
    };
  }

  await setDoc(feedbackRef, feedbacks);

  return {
    id: idIntento,
    feedback: feedbacks,
  };
};

export const createChatHistory = createAsyncThunk(
  "interview/createChatHistory",
  async ({ question, response, category }, { rejectWithValue }) => {
    const chatHistory = {
      sesion: [
        {
          question,
          response,
          category,
        },
      ],
    };
    console.log(chatHistory);
    try {
      const simulationRef = await addDoc(
        collection(database, "intentos"),
        chatHistory
      );
      const result = await analyzeAnswer({
        question,
        response,
        idIntento: simulationRef.id,
      });

      console.log(result);

      return {
        message: {
          id: simulationRef.id,
          chatHistory: chatHistory.sesion,
        },
        feedback: {
          id: simulationRef.id,
          feedback: {
            id: result.id,
            feedback: result.feedback,
          },
        },
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeedback = createAsyncThunk(
  "interview/fetchFeedback",
  async (idIntento) => {
    const feedbackRef = doc(database, "feedbacks", idIntento);
    const feedbackDoc = await getDoc(feedbackRef);

    if (feedbackDoc.exists()) {
      return {
        id: idIntento,
        ...feedbackDoc.data()
      };
    } else {
      throw new Error("Intento no encontrado");
    }
  }
);

export const updateChatHistory = createAsyncThunk(
  "interview/updateChatHistory",
  async ({ question, response, category, idIntento }, { rejectWithValue }) => {
    console.log({ question, response, category, idIntento });
    let intentos = [];
    try {
      const intentosRef = doc(database, "intentos", idIntento);
      const intentoDoc = await getDoc(intentosRef);

      if (intentoDoc.exists()) {
        const sesion = { ...intentoDoc.data() };
        intentos = [...sesion.sesion, { question, response, category }];
        await setDoc(intentosRef, { sesion: intentos });

        const result = await analyzeAnswer({
          question,
          response,
          idIntento,
        });

        return {
          message: {
            id: idIntento,
            chatHistory: intentos,
          },
          feedback: {
            id: idIntento,
            feedback: {
              id: result.id,
              feedback: result.feedback,
            },
          },
        };
      } else {
        throw new Error("Intento no encontrado en la base de datos");
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChat = createAsyncThunk(
  "interview/fetchChat",
  async (idIntento) => {
    const intentoRef = doc(database, "intentos", idIntento);
    const intentoDoc = await getDoc(intentoRef);

    if (intentoDoc.exists()) {
      return {
        id: idIntento,
        chatHistory: intentoDoc.data()?.sesion
      };
    } else {
      throw new Error("Intento no encontrado");
    }
  }
)



const initialState = {
  selectedCategory: null,
  questions: [],
  currentQuestionIndex: 0,
  chatHistory: [],
  messages: null,
  feedbacks: null,
  timeLeft: 120,
  timerActive: false,
  showModal: false,
  hasStarted: false,
  status: "idle",
  error: null,
};

const interviewSimulatorSlice = createSlice({
  name: "interview",
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
      state.timeLeft = 120;
      state.timerActive = false;
      state.showModal = false;
      state.hasStarted = false;
    },
    resetInterviewState: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.chatHistory = [];
      state.timeLeft = 120;
      state.timerActive = false;
      state.hasStarted = false;
      state.showModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createChatHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload.message;
        state.feedbacks = {
          id: action.payload.feedback.id,
          feedback: action.payload.feedback.feedback.feedback.feedback,
        };
      })
      .addCase(createChatHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createChatHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateChatHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload.message;
        // state.feedbacks = action.payload.feedback;
        state.feedbacks = {
          id: action.payload.feedback.id,
          feedback: action.payload.feedback.feedback.feedback.feedback,
        };
      })
      .addCase(updateChatHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateChatHistory.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(analyzeAnswer.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.feedbacks = action.payload;
      // })
      // .addCase(analyzeAnswer.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      // .addCase(analyzeAnswer.pending, (state) => {
      //   state.status = "loading";
      // });
      .addCase(fetchFeedback.pending, (state) => {
        state.status = "loading"; // Marca el estado como cargando
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.status = "succeeded"; // Marca el estado como exitoso
        state.feedbacks = action.payload; // Almacena los datos del intento
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.status = "failed"; // Marca el estado como fallido
        state.error = action.error.message; // Almacena el mensaje de error
      }).addCase(fetchChat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      }).addCase(fetchChat.rejected, (state, action) => {
        state.status = "failed"; // Marca el estado como fallido
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

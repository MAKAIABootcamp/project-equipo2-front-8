import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { auth } from "../../Firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Por favor ingrese un número celular")
    .matches(/^[0-9]+$/, "Debe contener solo números del 0 al 9")
    .max(10, "El número celular debe tener 10 dígitos")
    .min(10, "El número celular debe tener 10 dígitos"),
});

const PhoneLogin = () => {
  const navigate = useNavigate();

  const generateRecaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const sendSMS = (phone, recaptchaVerifier) => {
    signInWithPhoneNumber(auth, `+57${phone}`, recaptchaVerifier)
      .then((response) => {
        window.confirmationResult = response;
        Swal.fire(
          "Excelente",
          `Te enviaremos un mensaje para confirmar a ${phone}`,
          "success"
        ).then(() => navigate(`/verificationCode/+57${phone}`));
      })
      .catch((error) => {
        console.error(error);
        Swal.fire(
          "Oops!",
          `Ocurrió un error al realizar tu solicitud ${error.message}`,
          "error"
        );
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-color-1">
          Iniciar sesión con tu número celular
        </h1>
        <Formik
          initialValues={{
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            generateRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            sendSMS(values.phone, appVerifier);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-color-3 font-semibold"
                >
                  Número celular:
                </label>
                <Field
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Ingrese su número celular"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-color-1 text-white py-2 rounded-md"
              >
                Enviar SMS
              </button>
            </Form>
          )}
        </Formik>
        <div id="recaptcha-container"></div>
      </div>
    </main>
  );
};

export default PhoneLogin;

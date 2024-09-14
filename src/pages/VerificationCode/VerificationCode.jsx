import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  clearError,
  loginWithVerificationCodeThunk,
} from "../../redux/auth/authSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, user } = useSelector((store) => store.auth);

  if (error) {
    Swal.fire({
      title: "Oops!",
      text: "¡Ha ocurrido un error en el inicio de sesión! Intente nuevamente",
      icon: "error",
    }).then(() => dispatch(clearError()));
  }
  if (isAuthenticated) {
    Swal.fire({
      title: "¡Has iniciado sesión exitosamente!",
      text: user?.displayName
        ? `¡Te damos la bienvenida, ${user?.displayName}!`
        : "¡Te damos la bienvenida!",
      icon: "success",
    }).then(() => navigate("/"));
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-color-1">
          Ingresar código de verificación
        </h1>
        <Formik
          initialValues={{
            code: "",
          }}
          validationSchema={Yup.object().shape({
            code: Yup.string()
              .required("Por favor ingrese un código de verificación")
              .matches(/^[0-9]+$/, "Debe contener solo números del 0 al 9")
              .max(6, "El código de verificación debe tener 6 dígitos")
              .min(6, "El código de verificación debe tener 6 dígitos"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(loginWithVerificationCodeThunk(values.code));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="code"
                  className="block text-color-3 font-semibold"
                >
                  Código de verificación:
                </label>
                <Field
                  type="number"
                  name="code"
                  id="code"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-color-1 text-white py-2 rounded-md"
              >
                Iniciar sesión
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default VerificationCode;

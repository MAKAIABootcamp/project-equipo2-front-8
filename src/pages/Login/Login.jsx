import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  clearError,
  googleLoginThunk,
  loginWithEmailAndPassworThunk,
} from "../../redux/auth/authSlice";
import Swal from "sweetalert2";
import loginImage from "../../assets/skillmatePhoto1.jpg"
import googleIcon from "../../assets/google.png"
import phoneIcon from "../../assets/phone.png"

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, user } = useSelector((store) => store.auth);

  const handleGoogleLogin = () => {
    dispatch(googleLoginThunk());
  }

  const handleNavigatePhoneLogin = () => navigate("/phoneLogin");

  if (error) {
    Swal.fire({
      title: "Oops!",
      text: "¡Ha ocurrido un error en el inicio de sesión! Verifique sus credenciales",
      icon: "error",
    }).then(() => dispatch(clearError()));
  }

  if (isAuthenticated) {
    Swal.fire({
      title: "¡Has iniciado sesión exitosamente!",
      text: `¡Te damos la bienvenida, ${user?.displayName}!`,
      icon: "success",
    }).then(() => navigate("/"));
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 md:flex md:space-x-12">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-center md:text-left text-color-1">Iniciar Sesión</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(loginWithEmailAndPassworThunk(values));
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-color-3 font-semibold"
                  >
                    Correo electrónico:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="ejemplo@email.com"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-color-3 font-semibold"
                  >
                    Contraseña:
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingrese su contraseña"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-color-1 text-white py-2 rounded-md mt-4"
                >
                  Iniciar sesión
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-4 text-gray-500 flex justify-center">
            Si aún no tiene una cuenta, por favor dar click{" "}
            <Link to="/register" className="text-color-1 font-bold">
              aquí!
            </Link>
          </p>

          <section className="mt-6 text-center">
            <span className="text-gray-500 flex justify-center">
              o, también puedes iniciar sesión con:
            </span>
            <div className="mt-7 flex justify-center space-x-5">
              <button onClick={handleGoogleLogin} className="">
              <img src={googleIcon} alt="Iniciar sesión con Google" className="w-8 h-8 mr-2" />
              </button>
              <button onClick={handleNavigatePhoneLogin} className="">
              <img src={phoneIcon} alt="Iniciar sesión con número telefonico" className="w-8 h-8 mr-2" />
              </button>
            </div>
          </section>
        </div>

        <div className="hidden md:block w-full mt-20 md:w-1/2 bg-gray-200 h-80">
          <img
            src={loginImage}
            alt="Imagen de inicio de sesión"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
    </main>
  );
};

export default Login;

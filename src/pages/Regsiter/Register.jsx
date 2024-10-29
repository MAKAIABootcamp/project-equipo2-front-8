import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import uploadFiles from "../../services/uploadFiles";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createAccountThunk } from "../../redux/auth/authSlice";
import loginImage from "../../assets/skillmatePhoto1.jpg"
import imageRegister from "../../assets/registerImage.svg"


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(/[^a-zA-Z0-9]/, "Debe contener al menos un carácter especial")
    .required("La contraseña es obligatoria"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Debe confirmar la contraseña"),
  photo: Yup.mixed()
    .test("fileSize", "El archivo no debe exceder los 2MB", (value) => {
      if (!value) return true; 
      return value && value.size <= 2 * 1024 * 1024;
    })
    .required("Debes seleccionar una foto de perfil"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { error, isAuthenticated, user } = useSelector((store) => store.auth);

  if (error) {
        Swal.fire({
          title: "Oops!",
          text: "¡Ha ocurrido un error en la creación de tu cuenta!",
          icon: "error",
        }).then(()=>dispatch(clearError()))
  }

  if (isAuthenticated) {
    Swal.fire({
      title: `¡Excelente, ${user?.displayName}!`,
      text: "¡Has creado exitosamente tu cuenta!",
      icon: "success",
    }).then(() => navigate("/"));
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 md:flex md:space-x-12">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-color-1 font-montserrat">Crear una cuenta</h1>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              repeatPassword: "",
              photo: undefined,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const profileImage = await uploadFiles(values.photo);
              if (profileImage) {
                values.photo = profileImage;
                dispatch(createAccountThunk(values));
              } else {
                Swal.fire({
                  title: "Oops!",
                  text: "¡Ha ocurrido un error en la carga de tu imagen de perfil! Intenta nuevamente.",
                  icon: "error",
                });
              }

              setSubmitting(false);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-color-3">Nombre completo</label>
                  <Field
                    name="name"
                    id="name"
                    placeholder="Lucas Gonzales"
                    type="text"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md font-dosis"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-color-3 font-montserrat">Correo electrónico</label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    placeholder="ejemplo@email.com"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md font-dosis"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-color-3 font-montserrat">Contraseña</label>
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    placeholder="xxxxxx"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md font-dosis"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                </div>

                <div>
                  <label htmlFor="repeatPassword" className="block text-color-3 font-montserrat">Confirmar contraseña</label>
                  <Field
                    name="repeatPassword"
                    id="repeatPassword"
                    type="password"
                    placeholder="xxxxxx"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md font-dosis"
                  />
                  <ErrorMessage name="repeatPassword" component="div" className="text-red-600 text-sm" />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-color-1 text-white py-2 rounded-md mt-4 font-montserrat"
                >
                  Crear cuenta
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-4 text-gray-500 flex justify-center font-dosis">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="text-color-1 font-bold ml-2 font-dosis"> Inicie sesión!</Link>
          </p>
        </div>
        <div className="hidden md:flex w-full mt-24 md:w-1/2 bg-gray-200 h-80 items-center justify-center">
            <img
              src={imageRegister}
              alt="Login Image"
              className="object-cover w-full h-full"
            />
        </div>
      </div>
    </main>
  );
};

export default Register;

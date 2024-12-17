import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../../globals/constantes";
import axios from "axios";
import { SwipeLeftAlt } from "@mui/icons-material";
import Swal from "sweetalert2";


export function SignIn() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/'); // Redirige al usuario si ya está autenticado
    }
  }, [navigate]); 

  const handleLogin = async () => {

    try {
      const data = {
        username: username,
        password: password
      }

      const response = await axios.post(`${LOGIN.POST_LOGIN}`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = response.data;
      localStorage.setItem('token', token);
      
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      Swal.fire( {
        title: 'Error al iniciar sesión',
        text: error.message,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',  
      } )
  
    }
  };


  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Iniciar Sesión</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        
          <Button className="mt-6" fullWidth onClick={handleLogin}>
            Sign In
          </Button>

         
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;

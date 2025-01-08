import {
  FormControl,
  Input,
  VStack,
  FormLabel,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { server, Context } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  // const saveUser = async () => {
  //   const { data } = await axios.get(`${server}/users/me`, {
  //     headers: { "Content-Type": "application/json" },
  //     withCredentials: true,
  //   });
  //   setUser(data.user);
  //   setIsAuthenticated(true);
  // };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      // console.log(email, password);
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      if (isAuthenticated) {
        navigate("/pizzas");
        // return <Navigate to={"/pizza"} />;
      }
    } catch (error) {
      toast.error(data.message);
      setIsAuthenticated(false);
    }
  };

  return (
    <VStack justifyContent={"center"} h={"90vh"} p={"4"}>
      <form onSubmit={submitHandler}>
        <Box w={"xs"} h={"sm"}>
          <Box pt={"2"} pb={"2"}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box pt={"2"} pb={"2"}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button colorScheme="orange" w={"100%"} type="submit" mt={"2"}>
            Login
          </Button>
          <Button
            variant={"outline"}
            colorScheme="orange"
            w={"100%"}
            type="submit"
            mt={"2"}
          >
            <Link to={"/register"}>Sign Up</Link>
          </Button>
        </Box>
      </form>
    </VStack>
  );
};

export default Login;

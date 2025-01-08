import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useContext } from "react";
import { server, Context } from "../main";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        { email, name, password, address },
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
              type={"email"}
              isRequired
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box pt={"2"} pb={"2"}>
            <FormLabel>Name</FormLabel>
            <Input
              type={"text"}
              isRequired
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box pt={"2"} pb={"2"}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              isRequired
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box pt={"2"} pb={"2"}>
            <FormLabel>Address</FormLabel>
            <Input
              type={"text"}
              isRequired
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>

          <Button w={"100%"} colorScheme="orange" type="submit" mt={"2"}>
            Register
          </Button>
          <Button
            w={"100%"}
            colorScheme="orange"
            type="button"
            mt={"2"}
            variant={"outline"}
          >
            <Link to={"/login"}>Sign In</Link>
          </Button>
        </Box>
      </form>
    </VStack>
  );
};

export default Register;

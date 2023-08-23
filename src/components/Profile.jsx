import {
  Button,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Profile = () => {
  const { user, setIsAuthenticated, setUser } = useContext(Context);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const enableBtn = name == "" || address == "";
  const [update, setUpdate] = useState(false);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed");
      setIsAuthenticated(true);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${server}/users/updateDetails`,
        { name, address },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setUpdate(!update);
      if (data.success) {
        let userData = await axios.get(`${server}/users/me`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setName("");
        setAddress("");
        // setUser(userData.data.user);
        // setIsAuthenticated(true);
      }
    } catch (error) {
      toast.error("Error!, Try Again..");
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        if (res.data.user !== undefined) {
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
      });
  }, [update]);
  return (
    <>
      {user === undefined ? (
        <Login />
      ) : (
        <VStack p={["3", "10"]}>
          <HStack w={["full", "lg"]} p={"10"} justifyContent={"space-between"}>
            <Heading>Edit Profile</Heading>
            <Button onClick={logoutHandler} colorScheme="red">
              Logout
            </Button>
          </HStack>
          <form onSubmit={onSubmit}>
            <VStack w={["full", "lg"]}>
              <FormLabel alignSelf={"flex-start"} mt={"5"}>
                Email
              </FormLabel>
              <Input placeholder={`${user.email}`} isDisabled />
              <FormLabel alignSelf={"flex-start"} mt={"5"}>
                Name
              </FormLabel>
              <Input
                value={name}
                placeholder={`${user.name}`}
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel alignSelf={"flex-start"} mt={"5"}>
                Address
              </FormLabel>
              <Input
                value={address}
                placeholder={`${user.address}`}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button
                type="submit"
                colorScheme="orange"
                mt={"2"}
                isDisabled={enableBtn}
              >
                Update Profile!
              </Button>
            </VStack>
          </form>
        </VStack>
      )}
    </>
  );
};
export default Profile;

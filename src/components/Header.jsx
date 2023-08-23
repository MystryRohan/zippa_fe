import { Button, HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher.jsx";
import { BiCart, BiUser } from "react-icons/bi";
const Header = ({ getPizza }) => {
  return (
    <HStack
      top={"0"}
      left={"0"}
      p={["2", "10"]}
      pos={"sticky"}
      w={"full"}
      h={"10vh"}
      zIndex={"11"}
      justifyContent={"space-between"}
      bgColor={"orange.500"}
    >
      <Heading pl={["2", "16"]}>Zippa</Heading>
      <HStack w={["60%", "lg"]} justifyContent={"space-around"}>
        <Button variant={"unstyled"}>
          <Link to={"/"}>Home</Link>
        </Button>
        <Button variant={"unstyled"}>
          <Link to={"/pizzas"}>Pizza</Link>
        </Button>
        <Button variant={"unstyled"}>
          <Link to={"/cart"}>
            <BiCart size={"20"} />
          </Link>
        </Button>
        {/* <Link to={"/register"}>Sign Up</Link>
        <Link to={"/login"}>Sign In</Link> */}

        <Button variant={"unstyled"}>
          <Link to={"/profile"}>
            <BiUser size={"20"} />
          </Link>
        </Button>
        {/* <ColorModeSwitcher /> */}
      </HStack>
    </HStack>
  );
};

export default Header;

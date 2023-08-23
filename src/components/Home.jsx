import { VStack, Heading, HStack, Button, Spacer, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import pizza2 from "../assets/pizza-2.jpg";

const Home = () => {
  return (
    <Box
      bgSize={"cover"}
      backgroundImage={`linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0)),url(${pizza2})`}
    >
      <VStack
        w={"full"}
        h={"90vh"}
        justifyContent={"center"}
        pos={"relative"}
        zIndex={"10"}
      >
        <Heading p={"10"} color={"orange.500"} size={"4xl"}>
          Zippa: Tasty Pizzas
        </Heading>
        <HStack w={"xs"} justifyContent={"space-around"}>
          <Button variant={"solid"} h={"14"} w={"32"} colorScheme={"orange"}>
            <Link to={"/register"}>Sign Up</Link>
          </Button>
          <Button
            variant={"outline"}
            h={"14"}
            w={"32"}
            colorScheme={"orange"}
            _hover={{
              backgroundColor: "orange.500",
              color: "white",
              borderColor: "orange.500",
            }}
          >
            <Link to={"/login"}>Sign In</Link>
          </Button>
        </HStack>
      </VStack>
      {/* <motion.div className="circle-base"></motion.div>
      <motion.div className="circle-front"></motion.div> */}
    </Box>
  );
};

export default Home;

// #defcf9 #cadefc #c3bef0 cca8e9

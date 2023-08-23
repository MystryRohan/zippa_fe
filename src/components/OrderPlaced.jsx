import { Flex, Heading } from "@chakra-ui/react";
import pizza2 from "../assets/pizza-2.jpg";
const OrderPlaced = () => {
  return (
    <Flex
      h={"90vh"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      bgSize={"cover"}
      backgroundImage={`linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0)),url(${pizza2})`}
    >
      <Heading color={"orangered"} size={"lg"}>
        Order Placed!
      </Heading>
      <Heading color={"orangered"} size={"md"}>
        Thanks for Using Zippa...
      </Heading>
    </Flex>
  );
};

export default OrderPlaced;

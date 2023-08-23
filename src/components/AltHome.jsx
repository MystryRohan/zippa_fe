import { Button, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const AltHome = () => {
  const { pizzas, isAuthenticated } = useContext(Context);
  const countries = [
    "India",
    "Italy",
    "United States",
    "Japan",
    "Germany",
    "United Kingdom",
    "China",
  ];

  return (
    <>
      {pizzas.map((pizza, idx) => (
        <PizzaSlide
          key={idx}
          country={countries[idx]}
          name={pizza.name}
          description={pizza.description}
          price={pizza.price}
          isAuthenticated={isAuthenticated}
          id={pizza._id}
          pizzas={pizzas}
        />
      ))}
    </>
  );
};

const PizzaSlide = ({
  country,
  name,
  description,
  price,
  isAuthenticated,
  id,
  pizzas,
}) => {
  const cartHandler = async (id, buy = false) => {
    const currPizza = pizzas.find((x) => x._id === id);
    // console.log(currPizza);
    try {
      if (isAuthenticated) {
        const { data } = await axios.post(
          `${server}/pizza/addpizza/${id}`,
          { currPizza },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        toast.success(buy ? "Pizzaman Homecoming" : "added to cart");
      } else {
        toast.error("Login First");
      }
    } catch (error) {
      toast.error("Add Failed");
    }
  };

  return (
    <HStack
      flexDirection={["column", "row"]}
      w={"full"}
      h={"100vh"}
      p={["0", "10"]}
      bgColor={"#f8f7f5"}
    >
      <VStack
        pl={["0", "16"]}
        w={["", "50%"]}
        p={["10", ""]}
        alignItems={"flex-start"}
      >
        <Heading size={"md"}>{country}</Heading>
        <Heading size={"3xl"} color={"orange"}>
          {name}
        </Heading>
        <Text>
          {description +
            " " +
            description +
            " " +
            description +
            " " +
            description +
            " " +
            description}
        </Text>
        <Button
          colorScheme={"orange"}
          mt={"5"}
          onClick={() => cartHandler(id)}
        >{`Rs. ${price}`}</Button>
      </VStack>
      <VStack w={["full", "50%"]}>
        <motion.div>
          <Image w={"40vmax"} src={"./src/assets/piz-2.jpeg"}></Image>
        </motion.div>
      </VStack>
    </HStack>
  );
};
export default AltHome;

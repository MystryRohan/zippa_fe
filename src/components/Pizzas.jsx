import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Context, server } from "../main";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import PizzaImg from "../assets/pizza-1.jpg";

const Pizzas = () => {
  const { pizzas, setPizzas, isAuthenticated } = useContext(Context);
  // const getPizzas = async () => {
  //   const { data } = await axios.get(`${server}/pizza/pizzas`);
  //   setPizzas(data.message);
  // };

  const dispatch = useDispatch();

  const buyHandler = async (id) => {
    // dispatch({ type: "addToCart", payload: currPizza });
    cartHandler(id, true);
    try {
      if (isAuthenticated) {
        const { data } = await axios.get(`${server}/pizza/checkoutCart`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        // toast.success("Pizzaman Homecoming");
      } else {
        toast.error("Login First");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };
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

  useEffect(() => {
    axios
      .get(`${server}/pizza/pizzas`)
      .then((res) => {
        setPizzas(res.data.message);
        console.log("inside", `${server}/pizza/pizzas`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <HStack wrap={"wrap"} p={"3"} justifyContent={"center"} bgColor={"gray.50"}>
      {pizzas.map((pizza) => (
        <PizzaCard
          key={pizza._id}
          name={pizza.name}
          description={pizza.description}
          price={pizza.price}
          id={pizza._id}
          buyHandler={buyHandler}
          cartHandler={cartHandler}
        />
      ))}
    </HStack>
  );
};

const PizzaCard = ({
  id,
  name,
  description,
  price,
  buyHandler,
  cartHandler,
}) => {
  return (
    <Card maxW={"sm"} variant={"elevated"} boxShadow={"md"}>
      <CardBody>
        <Image src={PizzaImg}></Image>
        <Stack mt={"6"} spacing={"3"}>
          <Heading size={"md"}>{name}</Heading>
          <Text>{description}</Text>
          <Text>{`Rs.${price}`}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button
            variant={"solid"}
            colorScheme="orange"
            onClick={() => buyHandler(id)}
          >
            Buy
          </Button>
          <Button
            variant={"ghost"}
            colorScheme="orange"
            onClick={() => cartHandler(id)}
          >
            Add To Cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Pizzas;

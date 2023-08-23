import {
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Context, server } from "../main";
import axios from "axios";
import Login from "./Login";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PizzaImg from "../assets/pizza-1.jpg";

const Cart = () => {
  const { isAuthenticated, pizzas } = useContext(Context);
  const [cartItems, setCartItems] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);

  const deleteHandler = async (pizzaName) => {
    try {
      if (isAuthenticated) {
        const { data } = await axios.get(
          `${server}/pizza/deleteOne/${pizzaName}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        toast.success("Pizza Deleted");
        const tempPizzas = data.message.name;
        tempPizzas[pizzaName] = tempPizzas[pizzaName] - 1;
        if (tempPizzas[pizzaName] === 0) {
          delete tempPizzas[pizzaName];
        }
        setUpdate(!update);
        // console.log(data);
        // // if (data.success) {
        // // navigate("/orderPlaced");
        // // }
      } else {
        toast.error("Login First");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };
  const buyHandler = async () => {
    try {
      if (isAuthenticated) {
        const { data } = await axios.get(`${server}/pizza/checkoutCart`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        toast.success("Pizzaman Homecoming");

        if (data.success) {
          navigate("/orderPlaced");
        }
      } else {
        toast.error("Login First");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/users/cart`, { withCredentials: true })
      .then((res) => {
        setCartItems(res.data.message);
        // console.log(res.data.message);
        if (res.data.success) {
          setFlag(true);
        }
        console.log("called");
      })
      .catch((error) => {
        setCartItems([]);
        setFlag(false);
      });
  }, [update]);

  return (
    <>
      {flag ? (
        <Flex
          w={"full"}
          h={"90vh"}
          flexDirection={["column", "row"]}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <VStack>
            {flag &&
              Object.entries(cartItems.name).map((pizza, idx) => (
                <CartItem
                  key={idx}
                  deleteHandler={deleteHandler}
                  name={pizza[0]}
                  qty={pizza[1]}
                />
              ))}
          </VStack>
          <VStack p={["5vmax", "10vmax"]} alignItems={["center", "flex-start"]}>
            <Heading size={"sm"} p={"1"}>
              Pizza Costing: Rs. {cartItems.price}
            </Heading>
            <Heading size={"xs"} pl={"1"}>
              Delivery: Rs. {49}
            </Heading>
            <Heading size={"md"} p={"1"}>
              Total: Rs. {cartItems.price + 49}
            </Heading>
            <Button
              w={"150px"}
              mt={"2.5"}
              colorScheme="orange"
              onClick={buyHandler}
            >
              Buy
            </Button>
          </VStack>
        </Flex>
      ) : (
        <VStack>
          <Heading>Cart is Empty...</Heading>
        </VStack>
      )}
    </>
  );
};

const CartItem = ({ qty, name, deleteHandler }) => {
  return (
    <HStack
      w={["full", "md"]}
      justifyContent={"space-between"}
      boxShadow={"md"}
      p={"3"}
    >
      <HStack h={"16"} w={"fit-content"}>
        <Image objectFit={"contain"} w={"8vmax"} src={PizzaImg} />
        <Heading size={"xs"} pl={"3"}>
          {name}
        </Heading>
      </HStack>
      <HStack>
        <Text pr={"3"}>qty: {qty}</Text>
        <AiFillDelete
          color="red"
          cursor={"pointer"}
          size={"20"}
          onClick={() => deleteHandler(name)}
        />
      </HStack>
    </HStack>
  );
};

export default Cart;

import React from "react";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  // const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(MdDarkMode, MdLightMode);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      color={"black"}
      variant={"unstyled"}
      colorScheme="orange"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  );
};

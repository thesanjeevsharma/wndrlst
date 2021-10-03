import React from "react";
import Icon, { IconProps } from "@chakra-ui/icon";

type Props = IconProps & {
  size?: number;
  color?: string;
  isFilled?: boolean;
};

const Heart = ({
  size = 8,
  color = "red.400",
  isFilled = false,
  ...props
}: Props) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={isFilled ? color : "none"}
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </Icon>
);
export default Heart;

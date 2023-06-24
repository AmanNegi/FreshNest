// Vegies
import cabbage from "../assets/items/cabbage.png";
import cabbage2 from "../assets/items/cabbage2.png";
import brocolli from "../assets/items/brocolli.png";
import tomato from "../assets/items/tomato.png";

// Icons
import { BiSolidAward, BiSolidCoinStack, BiStoreAlt } from "react-icons/bi";
import { BsEyeFill, BsListCheck } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { GiCurledLeaf } from "react-icons/gi";

export const gridItems = [
  { name: "Cabbage", image: cabbage },
  { name: "Brocolli", image: brocolli },
  { name: "Tomato", image: tomato },
  { name: "Cabbage", image: cabbage2 },
];

export const data = [
  { name: "Vocal for Local", icon: <BiStoreAlt /> },
  { name: "Support Local Farmers", icon: <FaHandsHelping /> },
  { name: "Natural and Organic", icon: <GiCurledLeaf /> },
];

export const features = [
  {
    title: "Product Quality",
    description:
      "Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh",
    icon: <BiSolidAward />,
  },
  {
    title: "Cost Efficient",
    description:
      "Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh",
    icon: <BiSolidCoinStack />,
  },
  {
    title: "Transparency",
    description:
      "Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh",
    icon: <BsEyeFill />,
  },
  {
    title: "Product Variety",
    description:
      "Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh",
    icon: <BsListCheck />,
  },
];

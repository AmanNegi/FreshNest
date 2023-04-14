import local_millet from "../assets/local_millet.jpg";

// Vegeies
import cabbage from "../assets/items/cabbage.png";
import cabbage2 from "../assets/items/cabbage2.png";
import brocolli from "../assets/items/brocolli.png";
import tomato from "../assets/items/tomato.png";
import potato from "../assets/items/potato.png";
import peas from "../assets/items/peas.png";
import ladyfinger from "../assets/items/lady_finger.png";
import onion from "../assets/items/onion.png";

// Fruits
import banana from "../assets/items/banana.png";
import apple from "../assets/items/Apple.png";
import guava from "../assets/items/Guava.png";
import kiwi from "../assets/items/Kiwi.png";
import watermelon from "../assets/items/Watermelon.png";
import grapes from "../assets/items/Grapes.png";
import pomegranate from "../assets/items/Pomegranate.png";

export const shopItems = [
  { name: "Cabbage", price: 20, image: cabbage },
  { name: "Brocolli", price: 50, image: brocolli },
  { name: "Tomato", price: 20, image: tomato },
  { name: "Cabbage", price: 30, image: cabbage2 },

  { name: "Potato", price: 20, image: potato },
  { name: "Peas", price: 50, image: peas },
  { name: "Lady Finger", price: 20, image: ladyfinger },
  { name: "Onion", price: 80, image: onion },
];

export const fruitItems = [
  { image: banana, name: "Banana", price: 40 },
  { image: apple, name: "Apple", price: 50 },
  { image: guava, name: "Guava", price: 60 },
  { image: kiwi, name: "Kiwi", price: 120 },
  { image: watermelon, name: "Watermelon", price: 70 },
  { image: grapes, name: "Grapes", price: 50 },
  { image: pomegranate, name: "Pomegranate", price: 100 },
];

export const grainItems = [
  { name: "Gehu", price: 80, image: local_millet },
  { name: "Gehu", price: 80, image: local_millet },
  { name: "Gehu", price: 80, image: local_millet },
  { name: "Gehu", price: 80, image: local_millet },
];

export const gridItems = [
  { name: "Cabbage", image: cabbage },
  { name: "Brocolli", image: brocolli },
  { name: "Tomato", image: tomato },
  { name: "Cabbage", image: cabbage2 },
];

export const galleryImages = [
  local_millet,
  local_millet,
  local_millet,
  local_millet,
  local_millet,
  local_millet,
];

export const data = [
  { name: "Vocal for Local", icon: "fa-solid fa-store" },
  { name: "Support Local Farmers", icon: "fa-solid fa-trowel" },
  { name: "Natural and Organic", icon: "fa-solid fa-leaf" },
];

export const features = [
  {
    title: "Product Quality",
    description:
      "Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh",
    icon: "fa-solid fa-award",
  },
  {
    title: "Cost Efficient",
    description:
      "Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh",
    icon: "fa-solid fa-coins",
  },
  {
    title: "Transparency",
    description:
      "Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh",
    icon: "fa-regular fa-eye",
  },
  {
    title: "Product Variety",
    description:
      "Farmers can directly sell their products to customers, ensuring that the products are of high quality and fresh",
    icon: "fa-solid fa-list-check",
  },
];

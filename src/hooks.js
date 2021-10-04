import { useState } from "react";
import axios from "axios";
import uuid from "uuid";

//Flip a card over
function useFlip() {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
        setIsFacingUp(isUp => !isUp);
      };

    return [isFacingUp, flipCard];
}

//Get cards via axios
function useAxios(url) {
  const [cards, setCards] = useState([]);
  const addCard = async (name) => {
    //For reasons I don't understand, if no variable is passed
    //as an argument, then "name", rather than being null, is some sort of Object. 
    //So, to make this work, you have to check to make sure "name" is a String. 
    const fullURL = typeof name === 'string' ? url + name : url;
    const response = await axios.get(`${fullURL}`);
    setCards(cards => [...cards, { ...response.data, id: uuid() }]);
  };

  return [cards, addCard];
}
export {useFlip, useAxios};
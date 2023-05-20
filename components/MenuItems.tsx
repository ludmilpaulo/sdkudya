import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
//import { foods } from '../data/foodsData'
import tailwind from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, updateBusket } from "../redux/slices/basketSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../configs/colors";

interface Meals {
  foods: any;
  food: any;
  resImage: string;
  resName: string;
  resId: number;
  category: string;
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  short_description: string;
}

const MenuItems = ({ resId, food, resName, resImage, foods }: Meals) => {
  const [isPressed, setIsPressed] = useState(false);

  const setTheQuantity = () => {
    const resIndex = cartItems.findIndex((item: { resName: string; }) => item.resName === resName);

    if (resIndex >= 0) {
      const menuIndex = cartItems[resIndex].foods.findIndex(
        (item: { id: any; }) => item.id === food.id
      );
      if (menuIndex >= 0) {
        console.log("Menu Index => ", menuIndex);
        const menuItem = cartItems[resIndex].foods[menuIndex];
        console.log("Menu Item => ", menuItem);
        setQty(menuItem.quantity);
      }
    }
  };

  useEffect(() => {
    setTheQuantity();
  }, []);
  const [qty, setQty] = useState(0);
  const [restaurantId, setRestaurantId] = useState(resId);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  function quantityUp() {
    setQty(qty + 1);
  }

  function quantityDown() {
    if (qty != 0) {
      setQty(qty - 1);
    }
  }

  const match = (id: any) => {
    const resIndex = cartItems.findIndex((item: { resName: string; }) => item.resName === resName);
    if (resIndex >= 0) {
      const menuIndex = cartItems[resIndex].foods.findIndex(
        (item: { id: any; }) => item.id === id
      );
      if (menuIndex >= 0) return true;
      return false;
    }
    return false;
  };

  const handleAddRemove = (id: any) => {
    const indexFromFood = foods.findIndex((x: { id: any; }) => x.id === id);
    const resIndex = cartItems.findIndex((item: { resName: string; }) => item.resName === resName);
    const foodItem = foods[indexFromFood];
    foodItem.quantity = qty;
    console.log(foodItem);

    if (resIndex >= 0) {
      const menuIndex = cartItems[resIndex].foods.findIndex(
        (item: { id: any; }) => item.id === id
      );
      if (menuIndex >= 0) {
        let oldArrays = [...cartItems];
        let oldfoods = [...oldArrays[resIndex].foods];
        oldfoods.splice(menuIndex, 1);
        oldArrays.splice(resIndex, 1);
        let newArray = [
          ...oldArrays,
          { foods: oldfoods, resName, resImage, resId },
        ];
        dispatch(updateBusket(newArray));
      } else {
        let oldArrays = [...cartItems];
        let newFoodArray = [...oldArrays[resIndex].foods, foodItem];
        oldArrays.splice(resIndex, 1);
        let updatedResArray = [
          ...oldArrays,
          { foods: newFoodArray, resName, resImage, resId },
        ];
        dispatch(updateBusket(updatedResArray));
      }
    } else {
      let oldArrays = [...cartItems];
      let newResFoodArray = [
        ...oldArrays,
        {
          foods: [{ ...foodItem }],
          resName,
          resImage,
          resId,
        },
      ];
      dispatch(updateBusket(newResFoodArray));
    }
  };

  return (
    <>
      <View style={tailwind`mt-5 mb-12`}>
        <View
          style={tailwind`mb-3 flex-row justify-between items-center pb-3 border-b border-gray-100`}
        >
          <View style={tailwind`flex-1 pr-3 flex-row items-center`}>
            <View style={tailwind`flex-1 pl-2`}>
              <Text
                style={[
                  tailwind`text-gray-900 font-bold mb-1`,
                  { fontSize: 16 },
                ]}
              >
                {food.name}
              </Text>
              <Text style={tailwind`text-gray-800 text-xs`}>
                {food.price},Kz
              </Text>
              <Text style={tailwind`text-gray-600 text-xs`}>
                {food.short_description}
              </Text>
            </View>

            <View
              style={{
                borderRadius: 5,
                borderWidth: 2,
                borderColor: colors.gray,
                width: 96,
                height: 35,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 32,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => quantityDown()}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>-</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{qty}</Text>

              <TouchableOpacity
                style={{
                  width: 32,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => quantityUp()}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tailwind``}>
            <Image
              style={tailwind`h-16 w-16 rounded-lg`}
              source={{ uri: food.image }}
            />
          </View>
        </View>

        {qty > 0 && (
          <>
            {match(food.id) ? (
              <TouchableOpacity
                onPress={() => handleAddRemove(food.id)}
                style={tailwind`bg-black absolute bottom-1 self-center py-1 px-12 rounded-full z-50`}
              >
                <Text style={tailwind`text-white text-sm`}>
                  Remover da Bandeja
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handleAddRemove(food.id)}
                style={tailwind`bg-black absolute bottom-1 self-center py-1 px-12 rounded-full z-50`}
              >
                <Text style={tailwind`text-white text-sm`}>
                  Adicionar na Bandeja
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default MenuItems;

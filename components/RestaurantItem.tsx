import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind from "tailwind-react-native-classnames";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Restaurant {
  id: number;
  name: string;
  phone: number;
  address: string;
  logo: string;
}

const RestaurantItem = ({ restaurantData }: any) => {
  const navigation = useNavigation<any>();

  const handlePress = (item: Restaurant) => {
    navigation.navigate("DetailsScreen", {
      item: item,
      name: item.name,
      restaurantId: item.id,
      phone: item.phone,
      image_url: item.logo,
      address: item.address,
    });
  };

  return (
    <View>
      {restaurantData?.map((item: any, index: any) => (
        <RestaurantItemCard
          key={index}
          item={item}
          onPress={() => handlePress(item)}
        />
      ))}
    </View>
  );
};

export default RestaurantItem;

const RestaurantItemCard = ({ item, onPress }: { item: any; onPress: any }) => {
  const [loved, setLoved] = useState(false);

  return (
    <TouchableOpacity style={tailwind`mx-4 mb-4`} onPress={onPress}>
      <Image
        source={{ uri: item.logo }}
        style={tailwind`w-full h-48 rounded-lg`}
      />
      <TouchableOpacity
        style={tailwind`absolute top-2 right-2`}
        onPress={() => setLoved((e) => !e)}
      >
        <Entypo
          name={`${loved ? "heart" : "heart-outlined"}`}
          size={28}
          color="#fff"
        />
      </TouchableOpacity>
      <View 
      key={item.id}
      style={tailwind`flex-row items-center mt-1`}>
        <View style={tailwind`flex-grow`}>
          <Text style={tailwind`font-bold text-lg`} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={tailwind`flex-row items-center`}>
            <MaterialCommunityIcons
              name="clock-time-four"
              size={13}
              color="#06C167"
            />
            <Text style={tailwind`text-xs text-gray-700`}>
              {" "}
              20-30 • min • 
            </Text>
          </View>
        </View>
        <View
          style={tailwind`w-48 h-8 justify-center items-center bg-gray-100 rounded-full`}
        >
          <Text style={tailwind`text-gray-600 text-xs`}>{item.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

import Text from "@/components/atomics/text";
import { View } from "react-native";
import { backgroundColor } from "@/constants/colors";
import Header from "@/components/molecules/header";

export default function Home() {
  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <Header />
      <Text>Hello, World!</Text>
    </View>
  );
}

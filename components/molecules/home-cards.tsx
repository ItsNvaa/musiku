import React from "react";
import { FlatList, Linking } from "react-native";
import Card from "../atomics/card";
import { rowsGap } from "@/constants/styles";
import SparklesSVG from "@/assets/icons/sparkles.svg";
import CommandLineSVG from "@/assets/icons/command-line.svg";
import HeartSVG from "@/assets/icons/heart.svg";
import ApplicationConfiguration from "@/app.json";
import metadata from "@/package.json";

export default function HomeCards(): React.JSX.Element {
  const homeCardsData = React.useMemo(
    () => [
      {
        title: "Rate our apps!",
        link: `market://details?id=${ApplicationConfiguration.expo.android.package}`,
        description:
          "Hey, could you give me some stars? i will appreciate that!",
        icon: SparklesSVG,
      },
      {
        title: "Report some bugs",
        link: `mailto:${metadata.author.email}`,
        description: "Have an issues while using this application?",
        icon: CommandLineSVG,
      },
      {
        title: "Give a feedback!",
        link: `market://details?id=${ApplicationConfiguration.expo.android.package}`,
        description: "Contribute to musiku app development!",
        icon: HeartSVG,
      },
    ],
    []
  );

  return (
    <FlatList
      data={homeCardsData}
      style={{
        flexGrow: 0,
      }}
      renderItem={({ item }) => (
        <Card
          title={item.title}
          onPress={() => Linking.openURL(item.link)}
          description={item.description}
          icon={<item.icon />}
        />
      )}
      horizontal
      contentContainerStyle={{ gap: rowsGap }}
    />
  );
}

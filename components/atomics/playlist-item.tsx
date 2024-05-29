import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Text from "./text";
import AlbumSVG from "@/assets/icons/album.svg";
import { IconButton } from "./button";
import OptionsSVG from "@/assets/icons/music-options.svg";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import PlaylistOptions from "./playlist-options";

interface PlaylistProps extends TouchableOpacityProps {
  title: string;
  description: string;
}

function Playlist(props: PlaylistProps): React.JSX.Element {
  const optionsDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<null | BottomSheetModalMethods>(null);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.container}
        onPress={() => console.log("test")}
      >
        <View style={styles.headerWrapper}>
          <AlbumSVG width={38} height={38} />
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {props.title}
            </Text>
            <Text style={styles.description} numberOfLines={1}>
              {props.description}
            </Text>
          </View>
        </View>
        <IconButton
          icon={<OptionsSVG width={24} height={24} />}
          onPress={() => optionsDrawerRef.current?.present()}
        />
      </TouchableOpacity>
      <PlaylistOptions modalRef={optionsDrawerRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.85,
  },
  headerWrapper: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    width: "75%",
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default React.memo(Playlist);

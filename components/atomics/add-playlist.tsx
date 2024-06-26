import React from "react";
import colors, {
  destructiveColor,
  inputBackgroundColor,
  modalBackgroundColor,
} from "@/constants/colors";
import Text from "./text";
import { StyleSheet, View } from "react-native";
import { borderRadius } from "@/constants/styles";
import {
  BottomSheetTextInput,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Button } from "./button";
import savePlaylist from "@/utils/save-playlist";
import {
  PlaylistTitleSetter,
  RefreshPlaylist,
  usePlaylistStore,
} from "@/stores/playlist";
import { useRouter } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { Playlist } from "@/interfaces/playlist";
import showToast from "@/utils/toast";
import { useDebounce } from "use-debounce";
import { BottomSheetModalContextType } from "@gorhom/bottom-sheet/lib/typescript/contexts/modal/external";
import Modal, { ModalProps } from "./modal";

export default function AddPlaylist(props: ModalProps): React.JSX.Element {
  const { dismissAll }: BottomSheetModalContextType = useBottomSheetModal();
  const setCurrentPlaylistTitle: PlaylistTitleSetter = usePlaylistStore(
    (state) => state.setPlaylistTitle
  );
  const router: ExpoRouter.Router = useRouter();
  const refreshPlaylist: RefreshPlaylist = usePlaylistStore(
    (state) => state.refresh
  );
  const [playlistTitle, setPlaylistTitle] = React.useState<string>("");
  const [debouncedPlaylistTitle] = useDebounce(playlistTitle, 200);

  const savePlaylistHandler: () => void = React.useCallback(() => {
    if (!debouncedPlaylistTitle) {
      showToast("Please fill the playlist title correctly!");

      return;
    }

    dismissAll();
    const newPlaylist: Playlist = savePlaylist(debouncedPlaylistTitle);
    refreshPlaylist();

    showToast(`Successfully added new "${newPlaylist.title}" playlist`);
    setCurrentPlaylistTitle(newPlaylist.title);
    router.push(`/playlist?item=${JSON.stringify(newPlaylist)}`);
  }, [debouncedPlaylistTitle]);

  return (
    <Modal
      modalRef={props.modalRef}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title}>New Playlist</Text>
        <BottomSheetTextInput
          onChangeText={(text: string) => setPlaylistTitle(text)}
          style={styles.input}
          placeholder="Name it something cool!"
          placeholderTextColor={colors.dark.text}
        />
        <View style={styles.buttonWrapper}>
          <Button
            textStyle={{
              color: destructiveColor,
            }}
            style={styles.button}
            onPress={() => props.modalRef.current?.close()}
          >
            Cancel
          </Button>
          <Button style={styles.button} onPress={() => savePlaylistHandler()}>
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
    position: "absolute",
    width: "100%",
    backgroundColor: modalBackgroundColor,
    borderRadius,
    paddingVertical: 25,
  },
  title: {
    fontFamily: "bold",
    fontSize: 17,
  },
  buttonWrapper: {
    top: 5,
    gap: 8,
    flexDirection: "row",
    width: "100%",
  },
  button: {
    flex: 1,
  },
  input: {
    fontFamily: "medium",
    width: "100%",
    backgroundColor: inputBackgroundColor,
    padding: 9,
    paddingHorizontal: 13,
    fontSize: 13,
    color: colors.dark.text,
    borderRadius,
  },
});

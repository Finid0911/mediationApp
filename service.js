import TrackPlayer, {
  Event,
  RepeatMode,
  AppKilledPlaybackBehavior,
  Capability,
} from "react-native-track-player";

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
        Capability.JumpBackward,
        Capability.SeekTo,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
        Capability.JumpBackward,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
        Capability.JumpBackward,
        Capability.SeekTo,
      ],
      progressUpdateEventInterval: 2,
    });
    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTrack(tracks) {
  await TrackPlayer.add(tracks);
  await TrackPlayer.setRepeatMode(RepeatMode.Track);
}

export async function playBackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  // TrackPlayer.addEventListener(Event.RemoteNext, () => {
  //   TrackPlayer.skipToNext();
  // });
  // TrackPlayer.addEventListener(Event.RemotePrevious, () => {
  //   TrackPlayer.skipToPrevious();
  // });
  TrackPlayer.addEventListener(Event.RemoteSeek, ({ position }) => {
    TrackPlayer.seekTo(position);
  });
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, () => {
    TrackPlayer.getPosition().then((position) =>
      TrackPlayer.seekTo(position - 10)
    );
  });
  TrackPlayer.addEventListener(Event.RemoteJumpForward, () => {
    TrackPlayer.getPosition().then((position) =>
      TrackPlayer.seekTo(position + 10)
    );
  });
}

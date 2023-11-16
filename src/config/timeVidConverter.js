export default timeVidConverter = (time) => {
  const minute = Math.floor(time / 60);
  var remainingSeconds = time % 60;
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  return minute + ":" + remainingSeconds;
};

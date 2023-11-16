export default timeConverter = (time) => {
  const hour = Math.floor(time / 360);
  const minute = Math.floor((time % 360) / 60);
  const remainingSeconds = time % 60;
  return hour + " giờ " + minute + " phút ";
};

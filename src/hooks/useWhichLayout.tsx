import useMediaQuery from "./useMediaQuery";
type Layout = "desktop" | "mobile";
const useWhichLayout = (): Layout => {
  const matches = useMediaQuery("(min-width: 768px)");
  return matches ? "desktop" : "mobile";
};

export default useWhichLayout;

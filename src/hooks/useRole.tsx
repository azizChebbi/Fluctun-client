import usePayload from "@hooks/usePayload";

const useRole = () => {
  const { role } = usePayload();
  return role;
};

export default useRole;

import VerifySuccess from "../components/Verify/VerifySuccess";
import VerifyFailed from "../components/Verify/VerifyFailed";
import useVerify from "../hooks/useVerify";

const Verify = () => {
  const token = new URLSearchParams(location.search).get("token") || "";
  const { success } = useVerify(token);

  return <>{success ? <VerifySuccess /> : <VerifyFailed />}</>;
};

export default Verify;

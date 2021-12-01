import { useHistory } from "react-router-dom";

function useGoBack() {
  const history = useHistory();
  const goBack = () => history.goBack();

  return { goBack };
}

export default useGoBack;

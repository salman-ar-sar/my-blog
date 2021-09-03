import { match } from "react-router-dom";
import useFetch from "../components/useFetch";
import { User } from "../types/types";

interface Params {
  name: string;
}

const ViewProfile = ({ match }: { match: match<Params> }) => {
  const name = match.params.name;

  const {
    data: user,
    isPending,
    errorMsg,
  } = useFetch<User>(`http://localhost:8000/users/${name}`);

  return (
    <div>
      <h1>{user?.name}</h1>
      {isPending && <div className="loadingMsg">Loading...</div>}
      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
    </div>
  );
};

export default ViewProfile;

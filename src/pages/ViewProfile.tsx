import { match } from "react-router-dom";

interface Params {
  name: string;
}

const ViewProfile = ({ match }: { match: match<Params> }) => {
  console.log(match.params.name);

  return <div></div>;
};

export default ViewProfile;

import CountDownTo from "@/component/CountDownTo";
import { Alert } from "@mui/material";

export default function Home() {
  const destination = "/users/1/profile";
  return (
    <Alert severity="warning">
      Please visite{" "}
      <a className="text-sky-500 hover:text-sky-700" href={destination}>
        {destination}
      </a>{" "}
      to view the user profile page.
      <CountDownTo to={destination} count={5} />
    </Alert>
  );
}

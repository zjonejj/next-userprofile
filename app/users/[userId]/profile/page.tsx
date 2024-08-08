import CountDownTo from "@/component/CountDownTo";
import UserProfileUpdateDialog from "@/component/userprofile/UserProfileUpdateDialog";
import { userService } from "@/services/user-service";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { Alert } from "@mui/material";
import { AiFillPhone } from "react-icons/ai";

interface UserPageProps {
  params: {
    userId: string;
  };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const user = await userService.getUserById(parseInt(params.userId));

  if (user == null) {
    const destination = "/users/1/profile";
    return (
      <Alert severity="warning">
        Please visite a existed user,{" "}
        <a className="text-sky-500 hover:text-sky-700" href={destination}>
          {destination}
        </a>{" "}
        to view the user profile page.
        <CountDownTo to={destination} count={5} />
      </Alert>
    );
  }

  return (
    <div>
      <img
        className="w-full min-w-[300px] h-44 md:h-52 object-cover object-center"
        src="/bg-show.jpg"
        alt="profile-bg-picture"
      />
      <div className="flex flex-col md:flex-row bg-white">
        <div className="relative w-full md:w-1/3 md:mt-0 -mt-24 flex itemms-center justify-center">
          <img
            src="/h-man.jpg"
            className="h-36 w-36 md:h-40 md:w-40 md:absolute md:-top-10 md:right-0 rounded-full object-cover object-center border-4 shadow-lg border-white"
            alt="user-avator"
          />
        </div>
        <div className="w-full  my-0 px-4 py-5 md:w-2/3 relative md:flex md:justify-start md:items-start">
          <div>
            <div className="relative">
              <h1 className="font-extrabold text-xl inline">{user?.name}</h1>
            </div>
            <p className="text-base font-normal">
              Advisor and Consultant at Stripe Inc.
            </p>
            <ul className="my-3 text-slate-500 text-sm flex space-x-5">
              <li className="cursor-text">
                <AiFillPhone className="size-5 inline-block mr-2" />
                {user?.mobile}
              </li>
              <li className="cursor-text">
                <EnvelopeIcon className="size-5 inline-block mr-2" />
                {user?.email}
              </li>
            </ul>
          </div>
          <div className="absolute right-3 top-0 md:pl-6 md:static">
            {user && <UserProfileUpdateDialog user={user} refresh />}
          </div>
        </div>
      </div>
      <div className="w-full h-[800px] bg-slate-100"></div>
    </div>
  );
};

export default UserPage;

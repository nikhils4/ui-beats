import {redirect} from "next/navigation";
import {sideNav} from "@/config/side-nav";

const Animation = () => {
  redirect(sideNav[2]?.subItems[0]?.path);
};

export default Animation;

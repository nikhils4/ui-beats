import { redirect } from "next/navigation";
import { sideNav } from "@/config/side-nav";

const Animation = () => {
  redirect(sideNav[3]?.subItems[0]?.path);
};

export default Animation;

import { redirect } from "next/navigation";
import { sideNav } from "@/config/side-nav";

const Background = () => {
  redirect(sideNav[1]?.subItems[0]?.path);
};

export default Background;

import { redirect } from "next/navigation";
import { sideNav } from "@/config/side-nav";

const Button = () => {
  redirect(sideNav[2]?.subItems[0]?.path);
};

export default Button;

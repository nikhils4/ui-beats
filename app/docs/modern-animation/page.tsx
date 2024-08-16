import { redirect } from "next/navigation";
import { sideNav } from "@/config/side-nav";

const ModernAnimation = () => {
  redirect(sideNav[2]?.subItems[0]?.path);
};

export default ModernAnimation;

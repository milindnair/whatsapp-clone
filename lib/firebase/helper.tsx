import { AllUsers } from "@/types";

const getUser = async () => {
    const staticData = await fetch("https://dummyjson.com/users", {
      cache: "force-cache",
    });
    const dynamicData = await fetch("https://dummyjson.com/users", {
      cache: "no-cache",
    });
    const revalidatedData = await fetch("https://dummyjson.com/users", {
      next: { revalidate: 10 },
    });
    const userData: AllUsers = await dynamicData.json();
    return userData;
  };

export default getUser;
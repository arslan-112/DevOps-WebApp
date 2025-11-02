import { Exclusive } from "../Components/Exclusive/Exclusive";
import { Middle } from "../Components/Middle/Middle";
import { Newarrivals } from "../Components/NewArrivals/Newarrivals";

export const Shop = () => {
  return (
    <div>
      <Middle />
      <Newarrivals />
      <Exclusive />
    </div>
  );
};

import Image from "next/image";
import AddComponent from "../components/ui/AddComponent";

const initPayments = [
  {
    cardNetwork: "Mastercard",
    lastFourDigits: "1234"
  },
  {
    cardNetwork: "Visa",
    lastFourDigits: "6789"
  },
  {
    cardNetwork: "Discover",
    lastFourDigits: "1900"
  }
];

export default function Home() {
  return (
    <AddComponent title="Income" paymentMethods={initPayments}/>
  );
}

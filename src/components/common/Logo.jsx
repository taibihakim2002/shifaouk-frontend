import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <div className="flex gap-4 items-center">
        <img className="w-12" src="/logo.png" alt="Logo" />
        <h1 className="text-lg text-primaryColor font-bold">شفائك</h1>
      </div>
    </Link>
  );
}

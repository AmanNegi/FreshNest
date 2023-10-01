import { useNavigate } from "react-router-dom";

function Button({ text = "Button", additionalClasses = "", path = "/" }) {
  var navigate = useNavigate();
  return (
    <button
      className="btn btn-accent"
      onClick={() => {
        navigate(path);
      }}
    >
      {text}
    </button>
  );
  // return (
  //   <button
  //     onClick={() => {
  //       navigate(path);
  //     }}
  //     className={`bg-green-500 hover:bg-opacity-80 text-sm md:text-lg lg:text-lg rounded-md py-3 px-4 text-white ${additionalClasses}`}
  //   >
  //     {text}
  //   </button>
  // );
}

export default Button;

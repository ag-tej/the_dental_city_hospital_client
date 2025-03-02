import logo from "../assets/logo.webp";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center animate-pulse p-8">
      <img src={logo} alt="The Dental City" />
    </div>
  );
};

export default Loading;

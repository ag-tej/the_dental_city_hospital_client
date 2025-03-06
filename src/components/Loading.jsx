import logo from "../assets/logo.webp";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center animate-pulse p-8">
      <img src={logo} alt="The Dental City" className="w-1/2 max-w-sm" />
    </div>
  );
};

export default Loading;

import "./textReader.css";

const TextReader = ({ content }) => {
  return (
    <div
      className="text-reader-wrapper text-gray-900 tracking-wide leading-relaxed"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default TextReader;

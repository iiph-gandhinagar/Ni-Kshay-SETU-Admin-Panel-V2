const Heading = ({ title = "", className = "" }) => {
  return (
    <h2 className={`text-xl md:text-2xl font-bold ${className}`}>
      {title}
    </h2>
  );
};

export default Heading;

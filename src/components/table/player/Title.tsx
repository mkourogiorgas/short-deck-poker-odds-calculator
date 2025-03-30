const Title = (text: string) => {
  return (
    <div
      className={`text-lg font-semibold text-gray-800 flex items-center justify-center`}
    >
      {text}
    </div>
  );
};

export default Title;

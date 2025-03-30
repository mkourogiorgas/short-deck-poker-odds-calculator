type ButtonProps = {
  handleClick: () => void;
  isDisabled: boolean;
  name: string;
};

const Button = ({ handleClick, isDisabled, name }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      aria-disabled={isDisabled}
      className="w-full bg-[#004e61] hover:bg-[#007c7b] text-white font-bold py-2 px-4 border border-[#007c7b] rounded-lg
          disabled:bg-[#004e61]/90 disabled:text-gray-500 "
    >
      {name}
    </button>
  );
};

export default Button;

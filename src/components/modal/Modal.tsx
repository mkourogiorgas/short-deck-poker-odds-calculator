import { createPortal } from "react-dom";

const Modal = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/90">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <img
          src="/img/load.gif"
          alt="loading..."
          className="mx-auto w-16 h-16"
        />
        <p className="mt-4">
          Calculations may take up to 15 seconds. Processing more than 8,000,000
          computations. To speed up the process, consider providing flop cards
          to reduce the number of possible scenarios.
        </p>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

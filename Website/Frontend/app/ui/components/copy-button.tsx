import React, { useState, useRef } from "react";
import { FaCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  // handle copy button
  const handleCopy = (text: string, e: React.MouseEvent<HTMLButtonElement>) => {
    // prevent defauly behaviour
    e.preventDefault();

    // copy text to clipboard
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <button
      className="copy hidden group-hover:flex transition duration-150 hover:bg-slate-800 p-1 text-sm rounded-lg"
      onClick={(e) => {
        handleCopy(text, e);
      }}
    >
      {copied ? (
        <span>
          <FaCheck className="dark:text-green-500 text-green-700" />
        </span>
      ) : (
        <span>
          <FaCopy className="dark:text-pink-200 text-pink-700" />
        </span>
      )}
    </button>
  );
}

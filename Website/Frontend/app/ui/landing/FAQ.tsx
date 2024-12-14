"use client"; // Ensure this component is a client-side component

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { firaSansFont } from "@/app/utils/font";

// Interface defining the structure of each FAQ item
interface FAQItem {
  question: string; // The question text
  answer: string; // The answer text
}

// Component that displays frequently asked questions (FAQ) with expandable answers
export function FAQ(): JSX.Element {
  // State to track which FAQ is currently open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Array containing FAQ data
  const faqData: FAQItem[] = [
    {
      question: "When it will be released ?",
      answer: "It will be released by this month end (Dec 2025)",
    },
    {
      question: "Will it be fee of cost ?",
      answer: "Yes, it's completely free of cost and open source",
    },
    {
      question: "Is there any limit ?",
      answer:
        "Yes there is, however more can be requestly just mail at manas@certimailer.xyz",
    },
    {
      question: "Any other doubt/problem ?",
      answer: "No worries, just mail me at: manas@certimailer.xyz",
    },
  ];

  return (
    <section
      className={`faq w-full flex h-fit items-center justify-center flex-col gap-10 ${firaSansFont.className}`}
    >
      <div className="heading-wrapper w-fit h-fit flex flex-col items-center justify-center gap-6 p-4">
        <div className="heading text-transparent bg-clip-text bg-gradient-to-br dark:from-purple-400 dark:to-neutral-100 from-purple-800 to-neutral-800 text-lg w-fit h-fit text-center">
          FAQ
        </div>
        <div className="description text-3xl dark:text-neutral-300 text-center text-neutral-700 font-bold">
          Answer to all your questions
        </div>
      </div>
      <div className="faq-wrapper w-fit h-fit flex flex-col gap-4 p-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="individual-wrapper h-fit max-w-[766px] w-full text-wrap flex flex-col border dark:border-[#3b3b41] border-[#d4d4d8] rounded-lg group dark:hover:border-purple-900 hover:border-[#d9d9f3] duration-300 items-center"
          >
            <div
              onClick={() => setOpenIndex(index === openIndex ? null : index)}
              className="question-and-button py-4 px-6 flex flex-row items-center w-full h-full transition duration-300 cursor-pointer justify-between group"
            >
              <div className="question font-semibold dark:text-neutral-200 text-neutral-600 dark:group-hover:text-purple-300 group-hover:text-purple-800 duration-300 text-base md:text-lg">
                {faq.question}
              </div>
              <div className="button-arrow group">
                <IoIosArrowDown
                  className={`text-base md:text-xl dark:group-hover:text-purple-300 group-hover:text-purple-800 duration-500 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </div>
            <div
              className={`answer px-6 overflow-hidden transition-[max-height] duration-700 w-full ease-in-out`}
              style={{ maxHeight: openIndex === index ? "1000px" : "0px" }}
            >
              <p className="dark:text-neutral-300 text-neutral-800 py-4 md:text-base text-sm">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

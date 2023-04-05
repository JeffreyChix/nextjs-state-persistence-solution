import { ChangeEvent } from "react";

export const SearchBar = ({
  onChange,
  value,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
  return (
    <div className="w-full text-center py-4">
      <input
        type="text"
        className="w-full bg-white rounded-md text-black py-3 px-3 outline-purple-400 outline-2"
        placeholder="Three keywords at least..."
        onChange={onChange}
        value={value}
      />
      <style jsx>{`
        input {
          font-family: var(--font-mono);
        }
      `}</style>
    </div>
  );
};

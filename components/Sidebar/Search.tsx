'use client';
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import React, { useState } from "react";

const Search: React.FC<{ onChange: (name: string) => void }> = ({ onChange }) => {
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    onChange(newName); // Call the callback function with the updated name
  };

  return (
    <div className="flex sticky top-0 bg-white justify-between items-center px-4 h-20 w-full border-b overflow-hidden border-gray-400 gap-2">
      <div className="flex items-start bg-gray-200 px-4 py-2 border-r-16 gap-4 rounded-lg w-full">
        <SearchIcon className="text-gray-600" />
        <input
          className="border-none outline-0 bg-gray-200 w-full"
          placeholder="Search in chats"
          type="text"
          value={name}
          onChange={handleChange}
        />
      </div>
      <FilterListIcon />
    </div>
  );
};

export default React.memo(Search);

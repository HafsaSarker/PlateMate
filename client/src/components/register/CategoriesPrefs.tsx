import React, { ChangeEvent, useState } from 'react';
import allCategories from '../../data/allCategories';

function CategoriesPrefs() {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // filter suggestions after user has typed two characters
    if (value.length > 0) {
      const newFilteredCategories = allCategories.filter((category) =>
        category.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredCategories(newFilteredCategories);
    } else {
      setFilteredCategories([]);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (!tags.includes(category)) {
      setTags([...tags, category]);
      setInput('');
      setFilteredCategories([]);
    }
    console.log(tags);
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    console.log(tags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input) {
      const matchedSuggestion = allCategories.find(
        (category) => category.toLowerCase() === input.toLowerCase(),
      );

      if (matchedSuggestion && !tags.includes(matchedSuggestion)) {
        setTags([...tags, matchedSuggestion]);
        setInput('');
        setFilteredCategories([]);
      }
    }
  };

  return (
    <div>
      <div className="pb-2 flex gap-2  justify-start flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 text-gray-700 bg-indigo-200 w-fit rounded-full py-1 text-xs"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2"
            >
              x
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="eg, Chinese"
        className="block w-full rounded-md  border-0 py-1.5 b-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        required={tags.length === 0}
      />
      {filteredCategories.length > 0 && (
        <ul className="block w-full shadow-sm  py-1.5 bg-inherit border border-gray-200 text-gray-900 sm:text-sm sm:leading-6 max-h-[200px] overflow-y-auto rounded-b-md">
          {filteredCategories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="border-0 py-1.5 px-2 on hover:bg-gray-100 cursor-pointer"
            >
              <li className="px-2 text-gray-700 bg-indigo-200 w-fit rounded-full py-1 text-sm">
                {category}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
export default CategoriesPrefs;

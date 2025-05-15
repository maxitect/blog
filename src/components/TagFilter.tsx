import React from "react";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export default function TagFilter({
  tags,
  selectedTags,
  onTagToggle,
  onClearAll,
}: TagFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors whitespace-nowrap ${
              selectedTags.includes(tag)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

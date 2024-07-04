import React, { useState } from "react";

interface Props {
  children: string;
  maxChars: number;
}

const ExpandableText: React.FC<Props> = ({ children, maxChars }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncatedText = children.slice(0, maxChars);
  const remainingText = children.slice(maxChars);

  return (
    <div>
      {isExpanded ? (
        <span>{children}</span>
      ) : (
        <span>
          {truncatedText}
          {remainingText.length > 0 && (
            <span>
              ...
              <button onClick={toggleExpand}>Read More</button>
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default ExpandableText;

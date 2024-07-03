import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  onClick: () => void;
}

function Like({ onClick }: Props) {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
    onClick();
  };

  if (like) return <FaHeart onClick={toggleLike} />;
  return <FaRegHeart onClick={toggleLike} />;
}

export default Like;

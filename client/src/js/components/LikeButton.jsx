import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton } from '@material-ui/core';

const LikeButton = () => {
  const [liked, setLiked] = React.useState(false);

  return <IconButton onClick={() => setLiked(!liked)}>{liked ? <FavoriteIcon color='secondary' /> : <FavoriteBorderIcon />}</IconButton>;
};

export default LikeButton;

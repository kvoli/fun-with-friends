import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://funwithfriends.net">
        funwithfriends.net
        </Link>{' '}
      {new Date().getFullYear()}
      {'.  '}
      <Link color="inherit" href="https://github.com/kvoli/fun-with-friends">
        GitHub
        </Link>
    </Typography>
  );
}

export default Copyright;

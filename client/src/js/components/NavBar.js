import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TypoGraphy from "@material-ui/core/Typography";
import { Home, Book, AccountBox } from "@material-ui/icons";

const NavBar = () => {

    return (
        <List component="nav">
            <ListItem component="div" >

                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        Home  <Home />
                    </TypoGraphy>
                </ListItemText>


                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        Create <Book />
                    </TypoGraphy>
                </ListItemText>

                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        Account <AccountBox />
                    </TypoGraphy>
                </ListItemText>
            </ListItem >

        </List>
    );
};

export default NavBar;

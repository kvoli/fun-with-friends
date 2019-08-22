import React from "react";
import TextField from "@material-ui/core/TextField";


const SearchBar = () => {
    return (
        <TextField
            id="standard-textarea"
            label="Filter"
            placeholder="e.g. 1984"
            margin="normal"
        />
    )
}

export default SearchBar;

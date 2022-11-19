import React from "react";
import {
  Paper,
  InputBase,
  Divider,
  SearchIcon,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

function SearchBar(props) {
  const { domains, setSearchQuery } = props;

  const searchFunction = (input) => {
    const searchData = domains?.map((domainData) => {
      return {
        searchTerm: domainData?.name,
        searchItem: domainData,
      };
    });
    const newData = searchData?.filter((data) => {
      return data.searchTerm?.match(new RegExp(input.trim(), "i"));
    });

    const searchItemData = newData?.map((data) => {
      return data?.searchItem;
    });
    setSearchQuery(searchItemData);
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          mb: "2%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Domains"
          inputProps={{ "aria-label": "search domains" }}
          onChange={(event) => {
            searchFunction(event.target.value);
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          sx={{ p: "10px", color: "rgb(229, 107, 111);" }}
          aria-label="filter"
        >
          <FilterListIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default SearchBar;

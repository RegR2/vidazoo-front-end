import React from "react";
import { Paper, InputBase, Divider, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { ExportToCsv } from "export-to-csv";

function SearchBarWithFilterAndDownload(props) {
  const { domains, setSearchQuery, displayData } = props;

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

  const exportToCSV = () => {
    const csvExporter = new ExportToCsv({
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Ads.csv",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    });

    csvExporter.generateCsv(displayData);
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
          onClick={() => {
            exportToCSV();
          }}
        >
          <DownloadOutlinedIcon sx={{ mt: "2px" }} />
        </IconButton>
      </Paper>
    </>
  );
}

export default SearchBarWithFilterAndDownload;

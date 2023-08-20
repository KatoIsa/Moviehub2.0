"use client";
import { Pagination } from "@mui/material";

const Custompagination = ({ setPage, numberofpages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "10px 0",
      }}
    >
      <Pagination
        count={numberofpages}
        onChange={(e) => handlePageChange(e.target.textContent)}
      />
    </div>
  );
};

export default Custompagination;

import React, { useEffect } from "react";
import { Pagination as MuiPagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useTracksContext } from "../contexts/TracksContext";

const Pagination = () => {
  const { totalPages, page, setPage } = useTracksContext();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    setSearchParams({
      ...currentParams,
      page,
    });
  }, [page]);

  return (
    <MuiPagination
      color="primary"
      count={totalPages}
      page={page}
      onChange={(_, value) => setPage(value)}
      sx={{
        color: "#fff",
		margin:'3rem 0',
		display:'flex',
		justifyContent:'center',
        "& .MuiButtonBase-root": {
          color: "#fff",
		  fontSize:'1.5rem'
        },
      }}
    />
  );
};

export default Pagination;

import React from "react";
import style from "./pokemon-list.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (e: React.MouseEvent, page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  return (
    <div className={style.pagination}>
      <button disabled={page <= 0} onClick={(e) => onChange(e, page - 1)}>
        Prev
      </button>
      {page + 1}
      <button
        disabled={page >= totalPages}
        onClick={(e) => onChange(e, page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

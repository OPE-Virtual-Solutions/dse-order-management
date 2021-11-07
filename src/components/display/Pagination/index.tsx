import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.css";

type Props = {
    pageCount: number;
    onPageChange: (event: any) => void;
    pageRange?: number;
}

function Pagination({
    pageCount,
    onPageChange,
    pageRange = 5
}: Props) {
    return (
        <ReactPaginate 
            breakLabel="..."
            nextLabel={<FaArrowRight />}
            previousLabel={<FaArrowLeft />}

            containerClassName={styles.container}
            pageLinkClassName={styles.link}

            pageClassName={styles.button}
            nextClassName={styles.button}
            previousClassName={styles.button}
            breakClassName={styles.button}

            onPageChange={onPageChange}
            pageRangeDisplayed={pageRange}
            pageCount={Math.ceil(pageCount / 5)}
            marginPagesDisplayed={0}
        />
    )
};

export { Pagination };
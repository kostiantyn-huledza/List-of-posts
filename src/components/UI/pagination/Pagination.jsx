import React from 'react';
import {getPagesArray} from "../../utils/pages";

const Pagination = ({page, setPage, totalPages}) => {
    const pagesArray = getPagesArray(totalPages);

    return (
        <div className= 'page_wrapper'>
            {pagesArray.map(p =>
                <span
                    onClick={() => {setPage(p)}}
                    key={p}
                    className={page === p ? 'page page_current' : 'page' }>
                        {p}
                    </span>)}
        </div>
    );
};

export default Pagination;
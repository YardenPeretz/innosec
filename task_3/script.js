"use-strict";
// Html elements
// constants
const table = document.getElementById("table");
const paginationNumbers = document.getElementById("pagination-numbers");
// vars
let tbody;
let table_rows;
let paginationLimit = 25;
let pageCount;
let currentPage;
// On page load event
window.addEventListener("load", function () {
    /**
     * @source - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
     * @returns response from api
     */

    async function getData() {
        const response = await fetch('http://localhost/innosec/task_3/api.php', {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ "data": "data" })
        })
        return response.json();
    }

    // Call getData async func, and use draw_table function.
    getData().then((data) => {
        pageCount = Math.ceil(data.length / paginationLimit);
        // Read response data, and append using draw_table() func
        draw_table(data)
        tbody = table.querySelector("tbody");
        table_rows = tbody.querySelectorAll("tr");
        // Set default page
        setCurrentPage(1, table_rows);
        activePageNum();
    })
})


/**
 * @source - https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
 * @param {obj} data - contains data from api
 * @function draw_table() - Generates table dynamiclly using api response data
 */

const draw_table = (data) => {
    const tbody = table.childNodes[3];
    console.log(pageCount)

    for (let i = 0; i <= pageCount; i++) {
        appendPaginationNums(i);
    }

    data.forEach(element => {
        const row = document.createElement("tr");
        for (let i = 0; i < element.length; i++) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(`${element[i]}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        // add the row to the end of the table body
        tbody.appendChild(row);
    });
}


/* Pagination */
// source - https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896

/**
 * @append - Button elements, csv_data.length / paginationLimit
 * @param {int} index 
 */
const appendPaginationNums = (index) => {
    if(index > 0){
        const pageNumber = document.createElement("button");
        pageNumber.innerHTML = index;
        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);
        pageNumber.classList.add("pagination-numbers");
        pageNumber.classList.add("btn");
        pageNumber.classList.add("btn-primary");
        paginationNumbers.appendChild(pageNumber);
    }
}


/**
 * @param {int} pageNum - number of button clicked
 * @param {Array} rowsList - all rows on tbody element
 * setCurrentPage -> Hide and show table data Depends on page selected.
 */
const setCurrentPage = (pageNum, rowsList) => {
    // Set curr page global var as pageNum param
    currentPage = pageNum;
    // Set active button styles
    handleActivePageNumber();
    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;
    // Hide and show depends on pagination range
    rowsList.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
            item.classList.remove("hidden");
        }
    });
};

/* execute setCurrentPage with the index clicked */
const activePageNum = () => {
    document.querySelectorAll(".pagination-numbers").forEach((button) => {
        // Get page index from btn clicked, 
        // So i can pass it to setCurrentPage(index, table_rows)
        const index = Number(button.getAttribute("page-index"));
        if (index) {
          button.addEventListener("click", () => {
            setCurrentPage(index, table_rows);
          });
        }
    });
}

/* Onclick pagination button, active class will be added. */
const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-numbers").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });
};
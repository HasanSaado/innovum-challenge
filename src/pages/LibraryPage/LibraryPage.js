// Libraries
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Components
import { Header } from '../../components/Header';

// Styles
import './LibraryPage.scss';

function LibraryPage() {

  // State
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetched, setFetched] = useState(false);

  /**
   * 
   */
  useEffect(() => {
    async function fetchBooks() {
      await fetch('http://localhost:4000/api/api/book', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            response.json().then(json => {
              setBooks(json.data);
              setIsLoading(false);
            });
          }

        })
    }
    fetchBooks();
  }, [fetched]);

  /**
   * 
   */
  async function handleReservePress(id, reserved) {
    const response = await fetch(`http://localhost:4000/api/book/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				isReserved: !reserved
			})
		})
    .then(response => {
      setIsLoading(true);
      setFetched(!fetched);
    })
  }

  console.log(books);

  const columns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'yearPublished', headerName: 'Year Published', width: 200 },
    { field: 'genre', headerName: 'Genre', width: 200 },
    {
      field: 'isReserved', headerName: 'Reserve Book', width: 200, renderCell: (params) => (
        !params.row.isReserved ?
        <i className="fa-solid fa-book" onClick={() => handleReservePress(params.row._id, params.row.isReserved)}></i> :
        <i className="fa-solid fa-rotate-left" onClick={() => handleReservePress(params.row._id, params.row.isReserved)}></i>
      )
    },
  ];

  /**
   * 
   */
  return (
    <div>
      <Header />
      {
        isLoading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      <div className="mt-5 container">
        <div className="book-table">
          <DataGrid
            rows={books}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={row => row._id}
          />
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;
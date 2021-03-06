import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './table.module.css';

const columns = [
  { id: 'name', label: 'Name', minWidth: 300 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'uploaded',
    label: 'Uploaded',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'length',
    label: 'Length',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

];

function createData(name, status, uploaded, length) {
  return { name, status, uploaded, length };
}

const rows = [
  createData('Quantum entanglement Explained', 'Not processed', "An hour ago", "30 minutes"),

];


export default function MediaTable(props) {

  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>

          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, }}
              >
                <h4>{column.label}</h4>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (row.status === "processed" ?
                // <Link to={{
                //   pathname: '/results',
                //   state: { id: row.id }
                // }} style={{ width: '100%' }}>
                //   
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} onClick={() => navigate(`/results/${row.id}`)}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  // </Link>
                :
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )

}
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { bikeJourneyData } from '../../controllers/bikeJourneyData';
import TablePagination from '@mui/material/TablePagination';
import { AlignHorizontalCenter } from '@mui/icons-material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'departure', headerName: 'Departure', width: 200 },
  { field: '_return', headerName: 'Return', width: 200 },
  { field: 'departureStationId', headerName: 'Departure Station ID', width: 130 },
  { field: 'departureStationName', headerName: 'Departure Station Name', width: 200 },
  { field: 'returnStationId', headerName: 'Return Station ID', width: 130 },
  { field: 'returnStationName', headerName: 'Return Station Name', width: 200 },
  { field: 'coveredDistance', headerName: 'Covered Distance', width: 130 },
  { field: 'duration', headerName: 'Duration', width: 130 },
];

export default function CustomTable() {

  const [rows, setRows] = useState([])
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 50,
    page: 0,
  });

  useEffect(() => {
    readData();
  }, [paginationModel])

  async function readData() {
    await bikeJourneyData(paginationModel.page, 10000)
    .catch(console.error)
    .then(response=>{
      setRows(response);
    })
  }
  
  return (
    <div style={{ height: 'auto', width: '90%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10,25,50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        {...rows}
        checkboxSelection
      />
    </div>
  );
}
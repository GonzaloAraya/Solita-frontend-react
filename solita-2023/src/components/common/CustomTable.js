import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { bikeJourneyData } from '../../controllers/Data';


/** 
 * 
 * DataGrid Table where data, pagination and display information is made.
 * Note: Page size limited by VM cloud service, Must be updated to work properly
 * 
 * @returns DataGrid table
 * 
*/

//columns defined in the imported data
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


//Datagrid from material UI
export default function CustomTable() {

  const [rows, setRows] = useState([])
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 50,
    page: 0,
  });

  //updating data only on the first render and any time paginationModel value changes
  useEffect(() => {
    readData();
  }, [paginationModel])

  //fetching data from controller, update all data information
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
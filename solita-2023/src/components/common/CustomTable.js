import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { bikeJourneyData, updateBikeJourneyData } from "../../controllers/Data";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

/**
 * DataGrid Table where data, pagination and display information is made.
 * Row information can be edited
 * @returns DataGrid table
 * */

//columns defined in the imported data
const columns = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "departure", headerName: "Departure", width: 200, editable: true },
  { field: "_return", headerName: "Return", width: 200, editable: true },
  {
    field: "departureStationId",
    headerName: "Departure Station ID",
    width: 130,
    editable: true,
  },
  {
    field: "departureStationName",
    headerName: "Departure Station Name",
    width: 200,
    editable: true,
  },
  {
    field: "returnStationId",
    headerName: "Return Station ID",
    width: 130,
    editable: true,
  },
  {
    field: "returnStationName",
    headerName: "Return Station Name",
    width: 200,
    editable: true,
  },
  {
    field: "coveredDistance",
    headerName: "Covered Distance",
    width: 130,
    editable: true,
  },
  { field: "duration", headerName: "Duration", width: 130, editable: true },
];

//Datagrid from MUI
export default function CustomTable() {
  const [rows, setRows] = useState([]);
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  //MUI pagination footer
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 50,
    page: 0,
  });

  //updating data only on the first render and any time paginationModel value changes
  useEffect(() => {
    readData();
  }, [paginationModel]);

  //fetching data from controller, update all data information
  async function readData() {
    await bikeJourneyData(paginationModel.page, 10000)
      .catch(console.error)
      .then((response) => {
        setRows(response);
      });
  }

  //edit information inside a row cell
  const processRowUpdate = React.useCallback((newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    setSnackbar({ children: "User successfully saved", severity: "success" });
    updateBikeJourneyData(newRow.id, newRow);
    console.log(newRow);
    return updatedRow;
  });

  // error handling, notification if an error occurs
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  return (
    <div style={{ height: "auto", width: "90%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        {...rows}
        checkboxSelection={false}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

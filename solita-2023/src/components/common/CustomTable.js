import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  bikeJourneyData,
  updateBikeJourneyData,
  createJourneyData,
} from "../../controllers/Data";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

const snackTimeDuration = 6000;

//Datagrid from material UI
export default function CustomTable() {
  const [rows, setRows] = useState([]);
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const [departureState, setDepartureState] = useState("");
  const [returnState, setReturnState] = useState("");
  const [departureStationIdState, setDepartureStationIdState] = useState("");
  const [departureStationNameState, setDepartureStationNameState] =
    useState("");
  const [returnStationIdState, setReturnStationIdState] = useState("");
  const [returnStationNameState, setReturnStationNameState] = useState("");
  const [coveredDistanceState, setCoveredDistanceState] = useState("");
  const [durationState, setDurationState] = useState("");

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 50,
    page: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //updating data only on the first render and any time rowsPerPage value changes
  useEffect(() => {
    setRows("");
    readData();
  }, [rowsPerPage]);

  //fetching data from controller, update all data information
  async function readData(newPage) {
    if (typeof newPage === "undefined") newPage = 0;
    await bikeJourneyData(newPage, rowsPerPage)
      .catch(console.error)
      .then((response) => {
        setRows(response);
      });
  }

  //edit information inside a row cell
  const processRowUpdate = React.useCallback((newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    updateBikeJourneyData(newRow.id, newRow)
      .then((status) => {
        if (status == 201) {
          setSnackbar({
            children: "Journey successfully saved",
            severity: "success",
          });
        }
      })
      .catch(() => {
        setSnackbar({
          children: "please login to edit data in database",
          severity: "error",
        });
      });
    return updatedRow;
  });

  // error handling, notification if an error occurs
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  // fetch and update data displaying in the table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    readData(newPage);
  };

  // update the numbers of rows displayed in the table per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // create a new row entry
  const createNewJourney = () => {
    const id = rows.length + 1;
    const newRow = {
      id: id,
      departure: departureState,
      _return: returnState,
      departureStationId: departureStationIdState,
      departureStationName: departureStationNameState,
      returnStationId: returnStationIdState,
      returnStationName: returnStationNameState,
      coveredDistance: coveredDistanceState,
      duration: durationState,
    };
    let response = createJourneyData(newRow)
      .then((status) => {
        if (status == 201) {
          setRows([...rows, newRow]);
          setSnackbar({
            children: "New Journey successfully saved",
            severity: "success",
          });
        }
      })
      .catch(() => {
        setSnackbar({
          children: "please login to edit data in database",
          severity: "error",
        });
      });
  };

  //clear data in the form
  const clearFormEntries = () => {
    setDepartureState("");
    setReturnState("");
    setDepartureStationIdState("");
    setDepartureStationNameState("");
    setReturnStationIdState("");
    setReturnStationNameState("");
    setCoveredDistanceState("");
    setDurationState("");

    handleClose();
  };

  return (
    <div style={{ height: "auto", width: "90%" }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Entry
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Journey Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>Create New Journey Data Entry</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="departure"
            label="Departure"
            type="datetime-local"
            inputProps={{
              step: 1,
            }}
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={departureState}
            onChange={(e) => {
              setDepartureState(e.target.value);
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="return"
            label="Return"
            type="datetime-local"
            inputProps={{
              step: 1,
            }}
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={returnState}
            onChange={(e) => {
              setReturnState(e.target.value);
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="departureStationId"
            label="Departure Station ID"
            type="number"
            fullWidth
            variant="outlined"
            value={departureStationIdState}
            onChange={(e) => {
              setDepartureStationIdState(e.target.value);
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="departureStationName"
            label="Departure Station Name"
            type="text"
            fullWidth
            variant="outlined"
            value={departureStationNameState}
            onChange={(e) => {
              setDepartureStationNameState(e.target.value);
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="returnStationId"
            label="Return Station ID"
            type="number"
            fullWidth
            variant="outlined"
            value={returnStationIdState}
            onChange={(e) => {
              setReturnStationIdState(e.target.value);
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="returnStationName"
            label="Return Station Name"
            type="text"
            fullWidth
            variant="outlined"
            value={returnStationNameState}
            onChange={(e) => {
              setReturnStationNameState(e.target.value);
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="coveredDistance"
            label="Covered Distance"
            type="number"
            fullWidth
            variant="outlined"
            value={coveredDistanceState}
            onChange={(e) => {
              setCoveredDistanceState(e.target.value);
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="duration"
            label="Duration"
            type="number"
            fullWidth
            variant="outlined"
            value={durationState}
            onChange={(e) => {
              setDurationState(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clearFormEntries}>Cancel</Button>
          <Button onClick={createNewJourney}>Submit</Button>
        </DialogActions>
      </Dialog>
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
        hideFooterPagination
      />

      <TablePagination
        component="div"
        count={800000}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={snackTimeDuration}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

import { apiBaseUrl } from "../../config";
import axiosInstance from "../../commonComponent/axios";
import CustomTextField from "../../commonComponent/TextField";

const columns = [
  { id: "sno", label: "S.NO", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 150 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 100 },
  { id: "createdDate", label: "Created Date", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

const PaginatedTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    status: "",
    startDate: "",
    endDate: "",
    totalTask: 0,
  });

  useEffect(() => {
    axiosInstance
      .get(`${apiBaseUrl}/api/tasks`)
      .then((response) => {
        const data = response.data.data;
        data.map((item, index) => {
          item.sno = index + 1;
          item.id = item._id;
          item.createdDate = moment(item.startDate).format("DD-MM-YYYY");
          item.name = item.taskName;
          return item;
        });
        setRows(data);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          timer: 5000,
          icon: "error",
          title: "Task Fetecg Error",
          text: error.response.data.error,
        });
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (id) => {
    console.log(id, "id");
    axiosInstance
      .get(`${apiBaseUrl}/api/tasks/${id}`, formData)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        console.log(response, "response1");
        if (response.data._id) {
          const {
            taskName,
            description,
            status,
            startDate,
            endDate,
            totalTask,
          } = response.data;
          setFormData({
            taskName,
            description,
            status,
            startDate,
            endDate,
            totalTask,
          });
          setOpen(true);
        } else {
          Swal.fire({
            timer: 500,
            icon: "error",
            title: "Task Create Failed",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          timer: 500,
          icon: "error",
          title: "Task Create Failed",
          text: error.response.data.message,
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`${apiBaseUrl}/api/tasks/${id}`)
          .then((response) => {
            if (response.data.data.length > 0) {
              Swal.fire({
                timer: 500,
                icon: "success",
                title: "Task Deleted",
                text: response.data.message,
              });
            } else {
              Swal.fire({
                timer: 500,
                icon: "error",
                title: "Task Deleted",
                text: response.data.message,
              });
            }
          });
      }
    });
  };

  const handleSaveFormData = (e) => {
    e.preventDefault();
    console.log(formData);
    axiosInstance
      .post(`${apiBaseUrl}/api/tasks/`, formData)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.data.data.length > 0) {
          Swal.fire({
            timer: 500,
            icon: "success",
            title: "Task Created",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            timer: 500,
            icon: "error",
            title: "Task Create Failed",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          timer: 500,
          icon: "error",
          title: "Task Create Failed",
          text: error.response.data.message,
        });
      });
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <CustomTextField
          type="text"
          id="quickFilter"
          variant="outlined"
          size="small"
          autoComplete="off"
          width="70%"
          placeholder="Search"
          color="white"
          sx={{ mr: 2, width: "70%" }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ width: "70%" }}
        >
          Add Task
        </Button>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.sno}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {column.id === "actions" ? (
                          <>
                            <IconButton color="primary">
                              <Edit onClick={() => handleUpdate(row.id)} />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(row.id)}
                            >
                              <Delete />
                            </IconButton>
                          </>
                        ) : (
                          row[column.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Dialog (Modal) for Task Form */}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSaveFormData}>
          <DialogTitle>Create New Task</DialogTitle>

          <DialogContent>
            <CustomTextField
              label="Task Name"
              fullWidth
              margin="dense"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              required
            />
            <CustomTextField
              label="Task Description"
              fullWidth
              multiline
              rows={3}
              margin="dense"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth margin="dense" required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <CustomTextField
              label="Start Date"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
            <CustomTextField
              label="End Date"
              type="date"
              fullWidth
              margin="dense"
              name="endDate"
              value={formData.endDate}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              required
            />
            <CustomTextField
              label="Total Task"
              type="number"
              fullWidth
              margin="dense"
              name="totalTask"
              value={formData.totalTask}
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save Task{" "}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PaginatedTable;

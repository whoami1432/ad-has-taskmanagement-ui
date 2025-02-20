import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const CustomTextField = ({ label, type, error, helperText, ...props }) => (
  <TextField
    fullWidth
    variant="outlined"
    label={label}
    type={type}
    margin="normal"
    error={error}
    helperText={helperText}
    onChange={props.onChange}
    {...props}
  />
);

CustomTextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomTextField;

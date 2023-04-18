import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Paper,
  Switch,FormControl,InputLabel,Select,MenuItem
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const types = ['Object', 'Number', 'Boolean', 'String'];

const App = () => {

const [fields, setFields] = useState(() => {
  const initialFields = [];
  for (let i = 0; i < 3; i++) {
    initialFields.push({
      name: '',
      type: types[0],
      isRequired:true,
      subfields: [{ name: '', type: types[0] }]
    });
  }
  return initialFields;
});
   

  const handleAddField = () => {
    const newField = { name: '', type: types[0] };
    setFields([...fields, newField]);
  };

  const handleDeleteField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleChangeField = (index, event) => {
    const newFields = [...fields];
    newFields[index].name = event.target.value;
    setFields(newFields);
  };

 const handleChangeType = (index, event) => {
  const newFields = [...fields];
  newFields[index].type = event.target.value;
  setFields(newFields);
};
    const handleAddSubfield = (index) => {
    const newSubfield = { name: '', type: types[0] };
    const newFields = [...fields];
    newFields[index].subfields.push(newSubfield);
    setFields(newFields);
  };

  const handleChangeSubfieldName = (fieldIndex, subfieldIndex, event) => {
    const newFields = [...fields];
    newFields[fieldIndex].subfields[subfieldIndex].name = event.target.value;
    setFields(newFields);
  };

  const handleChangeSubfieldType = (fieldIndex, subfieldIndex, event) => {
    const newFields = [...fields];
    newFields[fieldIndex].subfields[subfieldIndex].type = event.target.value;
    setFields(newFields);
  };

  const handleDeleteSubfield = (fieldIndex, subfieldIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].subfields.splice(subfieldIndex, 1);
    setFields(newFields);
  };

  const handleSave = () => {
    console.log(fields);
  };

   const handleChangeRequired = (event, index) => {
    const { name, value } = event.target;
    const newFields = [...fields];
    if (name === 'isRequired') {
      newFields[index][name] = event.target.checked;
    } else {
      newFields[index][name] = value;
    }
    setFields(newFields);
  };

  return (
    <div>
      <Paper sx={{top:'50%',left:'50%',position:'absolute',transform:'translate(-50%,-50%)',width:'50%'}}>
      <Typography variant="subtitle1" gutterBottom ml={2} mt={2}>
        Field name and type
      </Typography>
      {fields.map((field, index) => (
        <Grid container spacing={2} alignItems="center" key={index}>
          <Grid item xs={4} ml={2}>
            <TextField
              // label="Name"
              sx={{width:200,m:1}}
              size="small"
              variant="filled"
              value={field.name}
              onChange={(event) => handleChangeField(index, event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl >
  <InputLabel id="demo-simple-select-label">Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={field.type}
    label="Type"
    onChange={(event) => handleChangeType(index, event)}
  >
    <MenuItem value="Object">Object</MenuItem>
    <MenuItem value="String">String</MenuItem>
    <MenuItem value="Number">Number</MenuItem>
    <MenuItem value="Boolean">Boolean</MenuItem>
  </Select>
</FormControl>
          </Grid>
          <div sx={{display:'flex',flexDirection:'row'}}>
            <Typography variant="subtitle2" sx={{display:'inline'}}>Required</Typography>
            <Switch
              name="isRequired"
              checked={field.isRequired}
              onChange={(e) => handleChangeRequired(e, index)}
            />
            <IconButton
              color="secondary"
              aria-label="delete field"
              onClick={() => handleDeleteField(index)}
            >
              <Delete />
            </IconButton>
            {field.type === "Object" && (
              <IconButton
                color="primary"
                aria-label="add subfield"
                onClick={() => handleAddSubfield(index)}
              >
                <Add />
              </IconButton>
            )}
          
        </div>
              {field.subfields && field.subfields.map((subField, i) => (
            <Grid container spacing={2} alignItems="center" key={i}>
              <Grid item xs={4} ml={2} sx={{ marginLeft: 5 }}>
                <TextField
                  // label="Name"
                  sx={{ width: 200 ,m:2}}
                  size="small"
                  variant="filled"
                  value={subField.name}
                  onChange={(event) =>
                    handleChangeSubfieldName(index, i, event)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
              <FormControl >
  <InputLabel id="demo-simple-select-label">Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={subField.type}
    label="Type"
    onChange={(event) => handleChangeSubfieldType(index,i, event)}
  >
    <MenuItem value="Object">Object</MenuItem>
    <MenuItem value="String">String</MenuItem>
    <MenuItem value="Number">Number</MenuItem>
    <MenuItem value="Boolean">Boolean</MenuItem>
  </Select>
</FormControl>
              </Grid>
              <Grid item xs={3}>
                <IconButton
                  color="secondary"
                  aria-label="delete subfield"
                  onClick={() => handleDeleteSubfield(index, i)}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ))}
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddField}
        sx={{margin:2,}}
      >
        Add Field
      </Button>
      <Button variant="contained" color="primary" onClick={handleSave} sx={{margin:2}}>
        Save
      </Button>
      </Paper>
    </div>
  );
};

export default App;

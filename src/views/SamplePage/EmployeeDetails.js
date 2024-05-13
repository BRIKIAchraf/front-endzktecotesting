import React, { useState } from 'react';
import { Avatar, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stepper, Step, StepContent, StepLabel, TextField, Typography, Box              
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import HistoryIcon from '@mui/icons-material/History';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { blue, deepPurple, green, red, yellow } from '@mui/material/colors';
import { jsPDF } from 'jspdf';

const historySteps = [
  {
    label: 'Account Created',
    description: 'The account was created on January 1, 2022.'
  },
  {
    label: 'First Login',
    description: 'First logged in on January 5, 2022.'
  },
  {
    label: 'First Purchase',
    description: 'Made the first purchase on January 10, 2022.'
  },
  {
    label: 'Membership Upgrade',
    description: 'Upgraded to premium membership on February 1, 2022.'
  }
];

export default function EmployeeDetails() {
  const [editMode, setEditMode] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [employeeData, setEmployeeData] = useState({
    fullName: "Carol Santana",
    birthdate: "22/04/1994",
    nationality: "Brasileiro",
    userID: "Unique User Identifier",
    type: "Employee's Type",
    planningID: "Associated Planning ID",
    departmentID: "Associated Department ID",
    loginMethod: "Login Method Used",
    previousDepartments: [
      { name: 'Marketing', dateFrom: 'January 2019', dateTo: 'December 2019' },
      { name: 'Sales', dateFrom: 'January 2020', dateTo: 'December 2020' }
    ],
    previousPlannings: [
      { planName: 'Q1 Marketing Campaign', dateFrom: 'January 2019', dateTo: 'March 2019' },
      { planName: 'Sales Boost 2020', dateFrom: 'January 2020', dateTo: 'March 2020' }
    ]
  });

  const handleEditToggle = () => setEditMode(!editMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setActiveStep(prev => Math.min(prev + 1, historySteps.length - 1));
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Name: ${employeeData.fullName}`, 10, 10);
    doc.text(`Birthdate: ${employeeData.birthdate}`, 10, 20);
    doc.text(`Nationality: ${employeeData.nationality}`, 10, 30);
    doc.text(`User ID: ${employeeData.userID}`, 10, 40);
    doc.text(`Type: ${employeeData.type}`, 10, 50);
    doc.text(`Planning ID: ${employeeData.planningID}`, 10, 60);
    doc.text(`Department ID: ${employeeData.departmentID}`, 10, 70);
    doc.text(`Login Method: ${employeeData.loginMethod}`, 10, 80);
    doc.addPage();
    doc.text('Previous Departments:', 10, 10);
    employeeData.previousDepartments.forEach((dept, index) => {
      doc.text(`${dept.name} from ${dept.dateFrom} to ${dept.dateTo}`, 10, 20 + (10 * index));
    });
    doc.addPage();
    doc.text('Previous Plannings:', 10, 10);
    employeeData.previousPlannings.forEach((plan, index) => {
      doc.text(`${plan.planName} from ${plan.dateFrom} to ${plan.dateTo}`, 10, 20 + (10 * index));
    });
    doc.save('EmployeeDetails.pdf');
  };

  return (
    <Paper sx={{ maxWidth: 960, margin: 'auto', overflow: 'hidden', p: 4, bgcolor: yellow[50] }}>
      <Grid container spacing={2} sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: '3px solid',
              borderColor: deepPurple[500]
            }}
            src="avatar.jpg"
          />
          {editMode ? (
            <TextField variant="outlined" value={employeeData.fullName} onChange={handleInputChange} name="fullName" sx={{ mt: 2 }} />
          ) : (
            <Typography variant="h5" sx={{ color: deepPurple[500], mt: 2, fontWeight: 'bold' }}>
              <AccountCircleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{employeeData.fullName}
            </Typography>
          )}
          <IconButton onClick={handleEditToggle} color="primary">{editMode ? <SaveIcon /> : <EditIcon />}</IconButton>
        </Grid>

        <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: blue[50] }}>
          <Typography variant="h6" sx={{ color: blue[800], mb: 1, fontWeight: 'bold' }}>
            <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Personal Details
          </Typography>
          {editMode ? (
            <>
              <TextField
                label="Birthdate"
                variant="outlined"
                fullWidth
                name="birthdate"
                value={employeeData.birthdate}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Nationality"
                variant="outlined"
                fullWidth
                name="nationality"
                value={employeeData.nationality}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle1"><strong>Birthdate:</strong> {employeeData.birthdate}</Typography>
              <Typography variant="subtitle1"><strong>Nationality:</strong> {employeeData.nationality}</Typography>
            </>
          )}
        </Paper>

        <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: green[50] }}>
          <Typography variant="h6" sx={{ color: green[800], mb: 1, fontWeight: 'bold' }}>
            <WorkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Professional Details
          </Typography>
          {editMode ? (
            <>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                name="type"
                value={employeeData.type}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Planning ID"
                variant="outlined"
                fullWidth
                name="planningID"
                value={employeeData.planningID}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Department ID"
                variant="outlined"
                fullWidth
                name="departmentID"
                value={employeeData.departmentID}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle1"><strong>Type:</strong> {employeeData.type}</Typography>
              <Typography variant="subtitle1"><strong>Planning ID:</strong> {employeeData.planningID}</Typography>
              <Typography variant="subtitle1"><strong>Department ID:</strong> {employeeData.departmentID}</Typography>
            </>
          )}
          {editMode ? (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Login Method</InputLabel>
              <Select
                value={employeeData.loginMethod}
                onChange={handleInputChange}
                label="Login Method"
                name="loginMethod"
              >
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="Fingerprint">Fingerprint</MenuItem>
                <MenuItem value="Card and Password">Card and Password</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography sx={{ mt: 2 }}>{`Login Method: ${employeeData.loginMethod}`}</Typography>
          )}
        </Paper>

        <Stepper activeStep={activeStep} orientation="vertical">
          {historySteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={index === historySteps.length - 1}
                    >
                      Next Event
                    </Button>
                    <Button
                      disabled={index === 0}
                      variant="outlined"
                      onClick={handleBack}
                      sx={{ mt: 1 }}
                    >
                      Previous Event
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: red[50] }}>
          <Typography variant="h6" sx={{ color: red[800], mb: 1, fontWeight: 'bold' }}>
            <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Work History
          </Typography>
          <Grid container spacing={2}>
            {employeeData.previousDepartments.map((dept, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography variant="subtitle1">
                  <strong>{dept.name}:</strong> {dept.dateFrom} to {dept.dateTo}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: deepPurple[50] }}>
          <Typography variant="h6" sx={{ color: deepPurple[800], mb: 1, fontWeight: 'bold' }}>
            <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Previous Plannings
          </Typography>
          <Grid container spacing={2}>
            {employeeData.previousPlannings.map((plan, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography variant="subtitle1">
                  <strong>{plan.planName}:</strong> {plan.dateFrom} to {plan.dateTo}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleDownloadPDF}
          sx={{ mb: 2 }}
        >
          Download PDF
        </Button>
      </Grid>
    </Paper>
  );
}

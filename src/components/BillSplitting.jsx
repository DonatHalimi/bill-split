import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Button,
  IconButton,
  Paper,
  Container,
  Grid,
} from '@mui/material';
import {
  Add,
  PersonRemove,
  AttachMoney,
  People,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';

const BillSplitting = () => {
  const [totalBill, setTotalBill] = useState(() => {
    const savedBill = localStorage.getItem('totalBill');
    return savedBill ? parseFloat(savedBill) : 0;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const [people, setPeople] = useState(() => {
    const savedPeople = localStorage.getItem('people');
    return savedPeople
      ? JSON.parse(savedPeople)
      : [{ id: 1, name: 'Person 1', percentage: 100, amount: 0 }];
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#282A2C' : '#ffffff';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('totalBill', totalBill);
  }, [totalBill]);

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#282A2C' : '#ffffff';
  }, [darkMode]);

  const addPerson = () => {
    const newPerson = {
      id: people.length + 1,
      name: `Person ${people.length + 1}`,
      percentage: 0,
    };
    setPeople([...people, newPerson]);
    redistributePercentages(people.length + 1);
  };

  const removePerson = (id) => {
    if (people.length > 1) {
      const newPeople = people.filter((person) => person.id !== id);
      setPeople(newPeople);
      redistributePercentages(newPeople.length);
    }
  };

  const redistributePercentages = (count) => {
    const equalPercentage = 100 / count;
    setPeople((prevPeople) =>
      prevPeople.map((person) => ({ ...person, percentage: equalPercentage }))
    );
  };

  const handlePercentageChange = (id, newPercentage) => {
    let updatedPeople = people.map((person) =>
      person.id === id ? { ...person, percentage: newPercentage } : person
    );

    const totalPercentage = updatedPeople.reduce(
      (sum, person) => sum + person.percentage,
      0
    );

    const adjustment = totalPercentage - 100;

    if (adjustment !== 0) {
      updatedPeople = updatedPeople.map((person) => {
        if (person.id !== id) {
          const newPersonPercentage = person.percentage - (adjustment / (people.length - 1));
          return {
            ...person,
            percentage: Math.max(newPersonPercentage, 0),
          };
        }
        return person;
      });
    }

    setPeople(updatedPeople);
  };

  const handleNameChange = (id, newName) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id ? { ...person, name: newName } : person
      )
    );
  };

  const handleBillChange = (e) => {
    setTotalBill(Number(e.target.value));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        color: darkMode ? 'grey.100' : 'text.primary',
        transition: 'background-color 0.3s ease',
        bgcolor: darkMode ? '#1E1F20' : '#F5F5F5',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 3,
            bgcolor: darkMode ? '#282A2C' : '#F5F5F5',
          }}
        >
          <Box
            sx={{
              bgcolor: darkMode ? '#1E1F20' : 'primary.main',
              p: 3,
              color: 'white',
              position: 'relative',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <AttachMoney sx={{ mr: 1 }} />
              Bill Splitting App
            </Typography>
            <Typography variant="subtitle1">
              Split your bill easily and fairly
            </Typography>
            <IconButton
              sx={{ position: 'absolute', top: 16, right: 16 }}
              onClick={() => setDarkMode(!darkMode)}
              color="inherit"
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="Total Bill ($)"
              type="number"
              value={totalBill}
              onChange={handleBillChange}
              InputProps={{
                startAdornment: <AttachMoney />,
                sx: {
                  color: darkMode ? 'white' : 'black',
                  '& .Mui-focused': {
                    color: darkMode ? 'white' : 'primary.main',
                  },
                },
              }}
              InputLabelProps={{
                style: { color: darkMode ? 'white' : 'black' },
              }}
              sx={{
                mb: 3,
                bgcolor: darkMode ? '#282A2C' : '#F5F5F5',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: darkMode ? '#555' : '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: darkMode ? '#bbb' : '#888',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: darkMode ? '#aaa' : 'primary.main',
                  },
                },
              }}
            />

            {people.map((person) => (
              <Paper
                key={person.id}
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: darkMode ? '#36383a' : '#F5F5F5',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs>
                    <TextField
                      value={person.name}
                      onChange={(e) =>
                        handleNameChange(person.id, e.target.value)
                      }
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: { color: darkMode ? 'white' : 'black' },
                      }}
                      sx={{
                        bgcolor: darkMode ? '#282A2C' : 'white',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: darkMode ? '#555' : '#ccc',
                          },
                          '&:hover fieldset': {
                            borderColor: darkMode ? '#bbb' : '#888',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: darkMode ? '#aaa' : 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => removePerson(person.id)}
                      size="small"
                    >
                      <PersonRemove />
                    </IconButton>
                  </Grid>
                </Grid>
                <Slider
                  value={person.percentage}
                  onChange={(_, newValue) =>
                    handlePercentageChange(person.id, newValue)
                  }
                  aria-labelledby="input-slider"
                  sx={{
                    color: darkMode ? '#1E1F20' : 'primary.main',
                    '& .MuiSlider-thumb': {
                      color: darkMode ? '#fff' : 'primary.main',
                    },
                    '& .MuiSlider-track': {
                      bgcolor: darkMode ? '#aaa' : 'primary.main',
                    },
                  }}
                />
                <Grid container justifyContent="space-between">
                  <Typography
                    variant="body2"
                    sx={{
                      color: darkMode ? 'white' : 'black',
                    }}
                  >
                    {person.percentage.toFixed(2)}%
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: darkMode ? 'white' : 'black',
                    }}
                  >
                    ${((totalBill * person.percentage) / 100).toFixed(2)}
                  </Typography>
                </Grid>
              </Paper>
            ))}

            <Button
              variant="contained"
              fullWidth
              startIcon={<Add />}
              onClick={addPerson}
              sx={{
                mt: 2,
                bgcolor: darkMode ? '#1E1F20' : 'primary.main',
                '&:hover': {
                  bgcolor: darkMode ? '#333' : '#1976d2',
                },
                '&:focus': {
                  bgcolor: darkMode ? '#444' : '#115293',
                },
              }}
            >
              Add Person
            </Button>
          </Box>

          <Box
            sx={{
              bgcolor: darkMode ? '#333' : 'grey.50',
              color: darkMode ? 'grey.100' : 'text.primary',
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid
              container
              alignItems="center"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <People sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Total People:</Typography>
              <Typography
                variant="h7"
                color="primary"
                sx={{
                  ml: 1,
                  color: darkMode ? 'white' : 'black',
                }}
              >
                {people.length}
              </Typography>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BillSplitting;
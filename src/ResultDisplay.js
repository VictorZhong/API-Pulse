import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link, Grid } from '@mui/material';
import axios from 'axios';
import { Link as RouterLink, useParams } from 'react-router-dom';

function ResultDisplay({ result }) {
  const [details, setDetails] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/detail?id=${result?.id || id}`);
      setDetails(response.data);
    })();
  }, [result, id]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Card style={{ maxWidth: 800, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {details?.name}
        </Typography>
        <Grid container spacing={2}>
          {/* Add other fields here */}
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Type: {details?.type}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Size: {details?.size}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%', mt: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Upstream" />
              <Tab label="Downstream" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            {details?.upstreamList?.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>View Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details?.upstreamList.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>
                          <Link component={RouterLink} to={`/details/${row.id}`}>
                            View Details
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">No data</Typography>
            )}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {details?.downstreamList?.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>View Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details?.downstreamList.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>
                          <Link component={RouterLink} to={`/details/${row.id}`}>
                            View Details
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">No data</Typography>
            )}
          </TabPanel>
        </Box>
      </CardContent>
    </Card>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default ResultDisplay;

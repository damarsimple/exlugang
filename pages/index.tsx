import { Grid, Paper } from '@mui/material'
import React from 'react'

export default function Index() {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Paper>Server1</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>Server2</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

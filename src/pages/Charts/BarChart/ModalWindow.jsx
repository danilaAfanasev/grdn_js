import React from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, DialogActions, Button } from '@mui/material';

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const ModalWindow = ({ open, onClose, data, selectedDayIndex }) => {
  if (selectedDayIndex === null) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Данные за {daysOfWeek[selectedDayIndex]}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Отдел</TableCell>
                <TableCell>Продажи</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Отдел 1</TableCell>
                <TableCell>{data.department1[selectedDayIndex]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Отдел 2</TableCell>
                <TableCell>{data.department2[selectedDayIndex]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Отдел 3</TableCell>
                <TableCell>{data.department3[selectedDayIndex]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start' }}>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;

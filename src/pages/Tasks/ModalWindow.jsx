import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const modalStyle = (isDarkMode) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: isDarkMode ? '#424242' : 'white',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  color: isDarkMode ? '#fff' : '#000',
});

const ModalWindow = ({ open, onClose, task, onSave, isDarkMode }) => {
  const [editedTask, setEditedTask] = React.useState({ ...task });

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle(isDarkMode)}>
        <Typography variant="h6">Редактировать задачу</Typography>
        <TextField
          label="Название задачи"
          value={editedTask.text}
          onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
          fullWidth
          InputLabelProps={{ style: { color: isDarkMode ? '#fff' : '#000' } }}
          InputProps={{ style: { color: isDarkMode ? '#fff' : '#000' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: isDarkMode ? '#fff' : '#ccc' },
              '&:hover fieldset': { borderColor: isDarkMode ? '#fff' : '#000' },
              '&.Mui-focused fieldset': { borderColor: isDarkMode ? '#fff' : '#1976d2' },
            },
          }}
        />
        <TextField
          label="Создано"
          type="date"
          value={new Date(editedTask.createdAt).toISOString().split('T')[0]}
          onChange={(e) => setEditedTask({ ...editedTask, createdAt: new Date(e.target.value) })}
          fullWidth
          InputLabelProps={{ style: { color: isDarkMode ? '#fff' : '#000' }, shrink: true }}
          InputProps={{ style: { color: isDarkMode ? '#fff' : '#000' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: isDarkMode ? '#fff' : '#ccc' },
              '&:hover fieldset': { borderColor: isDarkMode ? '#fff' : '#000' },
              '&.Mui-focused fieldset': { borderColor: isDarkMode ? '#fff' : '#1976d2' },
            },
          }}
        />
        <TextField
          label="Дедлайн"
          type="date"
          value={new Date(editedTask.dueDate).toISOString().split('T')[0]}
          onChange={(e) => setEditedTask({ ...editedTask, dueDate: new Date(e.target.value) })}
          fullWidth
          InputLabelProps={{ style: { color: isDarkMode ? '#fff' : '#000' }, shrink: true }}
          InputProps={{ style: { color: isDarkMode ? '#fff' : '#000' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: isDarkMode ? '#fff' : '#ccc' },
              '&:hover fieldset': { borderColor: isDarkMode ? '#fff' : '#000' },
              '&.Mui-focused fieldset': { borderColor: isDarkMode ? '#fff' : '#1976d2' },
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#fff' : '#ccc' }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ bgcolor: isDarkMode ? '#1976d2' : '#1976d2', color: '#fff' }}
          >
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
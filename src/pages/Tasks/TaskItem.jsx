import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ModalWindow from './ModalWindow';

const getTaskColor = (status, isDarkMode) => {
  switch (status) {
    case 'todo':
      return isDarkMode ? '#616161' : '#fff';
    case 'inProgress':
      return isDarkMode ? '#ff9800' : '#ffb74d';
    case 'backlog':
      return isDarkMode ? '#f44336' : '#e57373';
    case 'done':
      return isDarkMode ? '#4caf50' : '#81c784';
    default:
      return isDarkMode ? '#616161' : '#fff';
  }
};

const TaskItem = ({ task, status, isDarkMode, onUpdateTask }) => {
  if (!task) return null;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
        <Box
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          data-dndkit-sortable
          sx={{
            padding: 1,
            flexGrow: 1,
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: isDragging ? (isDarkMode ? '#4a4a4a' : '#e0f7fa') : getTaskColor(status, isDarkMode),
            color: isDarkMode ? '#fff' : '#000',
            textDecoration: task.completed ? 'line-through' : 'none',
            cursor: 'grab',
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.8 : 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <Typography noWrap>{task.text}</Typography>
          <Typography variant="caption" sx={{ color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'textSecondary' }}>
            Создано: {new Date(task.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="caption" sx={{ color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'textSecondary' }}>
            Дедлайн: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={handleOpen}
          sx={{
            color: isDarkMode ? '#fff' : '#000',
            ml: 1,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: isDarkMode ? '#90caf9' : '#1976d2',
              transform: 'scale(1.2)',
            },
          }}
          disableRipple
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      <ModalWindow
        open={open}
        onClose={handleClose}
        task={task}
        onSave={onUpdateTask}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default TaskItem;
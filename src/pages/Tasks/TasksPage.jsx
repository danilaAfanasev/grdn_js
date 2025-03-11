import React, { useState } from 'react';
import { DndContext, useDroppable, closestCorners, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import TaskItem from './TaskItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ListIcon from '@mui/icons-material/List';

const getColumnTitle = (id) => {
  const titles = {
    todo: 'Нужно сделать',
    inProgress: 'В работе',
    backlog: 'Отложено',
    done: 'Выполнено',
  };
  return titles[id] || 'Колонка';
};

const getColumnIcon = (id, isDarkMode) => {
  const iconStyle = { marginLeft: 1, color: isDarkMode ? '#fff' : '#000' };
  switch (id) {
    case 'todo':
      return <ListIcon sx={iconStyle} />;
    case 'inProgress':
      return <PlayArrowIcon sx={{ ...iconStyle, color: isDarkMode ? '#ff9800' : '#ffb74d' }} />;
    case 'backlog':
      return <PauseIcon sx={{ ...iconStyle, color: isDarkMode ? '#f44336' : '#e57373' }} />;
    case 'done':
      return <CheckCircleIcon sx={{ ...iconStyle, color: isDarkMode ? '#4caf50' : '#81c784' }} />;
    default:
      return null;
  }
};

const Column = ({ id, title, tasks, isDarkMode, onUpdateTask }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        padding: 2,
        width: '25%',
        minHeight: '100px',
        backgroundColor: isOver
          ? (isDarkMode ? '#333' : '#e0f7fa')
          : (isDarkMode ? '#424242' : '#f5f5f5'),
        color: isDarkMode ? '#fff' : '#000',
        transition: 'background-color 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
        {getColumnIcon(id, isDarkMode)}
      </Box>

      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        {tasks.length === 0 ? (
          <Typography variant="body2" sx={{ color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'textSecondary' }}>
            Нет задач
          </Typography>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              status={id}
              isDarkMode={isDarkMode}
              onUpdateTask={onUpdateTask}
            />
          ))
        )}
      </SortableContext>
    </Paper>
  );
};

const TasksPage = ({ isDarkMode }) => {
  const [tasks, setTasks] = useState(() => ({
    todo: Array.from({ length: 3 }, (_, i) => ({
      id: uuidv4(),
      text: `Задача ${i + 1}`,
      createdAt: new Date(),
      dueDate: new Date(),
      completed: false,
    })),
    inProgress: Array.from({ length: 2 }, (_, i) => ({
      id: uuidv4(),
      text: `Задача ${i + 4}`,
      createdAt: new Date(),
      dueDate: new Date(),
      completed: false,
    })),
    backlog: Array.from({ length: 3 }, (_, i) => ({
      id: uuidv4(),
      text: `Задача ${i + 6}`,
      createdAt: new Date(),
      dueDate: new Date(),
      completed: false,
    })),
    done: Array.from({ length: 2 }, (_, i) => ({
      id: uuidv4(),
      text: `Задача ${i + 9}`,
      createdAt: new Date(),
      dueDate: new Date(),
      completed: true,
    })),
  }));

  const [newTask, setNewTask] = useState({
    text: '',
    createdAt: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
  });
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    const sourceKey = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === active.id)
    );
    if (sourceKey) {
      const task = tasks[sourceKey].find((t) => t.id === active.id);
      setActiveTask({ ...task, status: sourceKey });
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id || !activeTask) return;

    const sourceKey = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === active.id)
    );
    if (!sourceKey) return;

    let destinationKey = over.id;
    let destinationIndex = null;

    if (!tasks[destinationKey]) {
      const foundKey = Object.keys(tasks).find((key) =>
        tasks[key].some((task) => task.id === over.id)
      );
      if (foundKey) {
        destinationKey = foundKey;
        destinationIndex = tasks[foundKey].findIndex((task) => task.id === over.id);
      }
    }

    if (!destinationKey) return;

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      const sourceList = [...newTasks[sourceKey]];
      const taskIndex = sourceList.findIndex((task) => task.id === active.id);
      if (taskIndex === -1) return prevTasks;

      const [movedTask] = sourceList.splice(taskIndex, 1);
      movedTask.completed = destinationKey === 'done';

      if (sourceKey === destinationKey) {
        const destinationList = sourceList;
        destinationIndex = destinationIndex ?? destinationList.length;
        destinationList.splice(destinationIndex, 0, movedTask);
        newTasks[sourceKey] = destinationList;
      } else {
        newTasks[sourceKey] = sourceList;
        const destinationList = [...newTasks[destinationKey]];
        destinationIndex = destinationIndex ?? destinationList.length;
        destinationList.splice(destinationIndex, 0, movedTask);
        newTasks[destinationKey] = destinationList;
      }

      return newTasks;
    });
  };

  const handleDragEnd = (event) => {
    setActiveTask(null);
  };

  const handleAddTask = () => {
    if (newTask.text.trim() === '') return;

    const taskToAdd = {
      id: uuidv4(),
      text: newTask.text,
      createdAt: new Date(newTask.createdAt),
      dueDate: new Date(newTask.dueDate),
      completed: false,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, taskToAdd],
    }));

    setNewTask({
      text: '',
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      const columnKey = Object.keys(newTasks).find((key) =>
        newTasks[key].some((task) => task.id === updatedTask.id)
      );
      if (!columnKey) return prevTasks;

      const columnTasks = [...newTasks[columnKey]];
      const taskIndex = columnTasks.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        columnTasks[taskIndex] = { ...updatedTask };
        newTasks[columnKey] = columnTasks;
      }

      return newTasks;
    });
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            label="Название задачи"
            variant="outlined"
            value={newTask.text}
            onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
            sx={{ flexGrow: 1 }}
          />
          <TextField
            label="Создано"
            type="date"
            value={newTask.createdAt}
            onChange={(e) => setNewTask({ ...newTask, createdAt: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 150 }}
          />
          <TextField
            label="Дедлайн"
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 150 }}
          />
          <Button variant="contained" onClick={handleAddTask}>
            Добавить
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Column
              key={columnId}
              id={columnId}
              title={getColumnTitle(columnId)}
              tasks={columnTasks}
              isDarkMode={isDarkMode}
              onUpdateTask={handleUpdateTask}
            />
          ))}
        </Box>
      </Box>
      <DragOverlay>
        {activeTask ? (
          <TaskItem task={activeTask} status={activeTask.status} isDarkMode={isDarkMode} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TasksPage;
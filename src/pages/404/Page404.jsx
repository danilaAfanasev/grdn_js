import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/Page404.scss';

const GRID_SIZE = 4;
const INITIAL_TILES = 2;

const Page404 = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initializeGrid = () => {
    let newGrid = Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(0));
    for (let i = 0; i < INITIAL_TILES; i++) {
      newGrid = addRandomTile(newGrid);
    }
    return newGrid;
  };

  const addRandomTile = (grid) => {
    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newGrid = grid.map((row) => [...row]);
      newGrid[x][y] = Math.random() > 0.1 ? 2 : 4;
      return newGrid;
    }
    return grid;
  };

  const canMove = (grid) => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) return true;
        if (i < GRID_SIZE - 1 && grid[i][j] === grid[i + 1][j]) return true;
        if (j < GRID_SIZE - 1 && grid[i][j] === grid[i][j + 1]) return true;
      }
    }
    return false;
  };

  const move = (direction) => {
    setGrid((prevGrid) => {
      let newGrid = prevGrid.map((row) => [...row]);
      let moved = false;

      const slide = (arr) => {
        let result = arr.filter((val) => val !== 0);
        let points = 0;
        for (let i = 0; i < result.length - 1; i++) {
          if (result[i] === result[i + 1]) {
            result[i] *= 2;
            points += result[i];
            result.splice(i + 1, 1);
            i--;
          }
        }
        while (result.length < GRID_SIZE) {
          result.push(0);
        }
        return { newArr: result, points };
      };

      switch (direction) {
        case 'up':
          for (let j = 0; j < GRID_SIZE; j++) {
            let column = [];
            for (let i = 0; i < GRID_SIZE; i++) column.push(newGrid[i][j]);
            const { newArr, points } = slide(column);
            for (let i = 0; i < GRID_SIZE; i++) {
              if (newGrid[i][j] !== newArr[i]) moved = true;
              newGrid[i][j] = newArr[i];
            }
            if (points > 0) setScore((prevScore) => prevScore + points);
          }
          break;
        case 'down':
          for (let j = 0; j < GRID_SIZE; j++) {
            let column = [];
            for (let i = GRID_SIZE - 1; i >= 0; i--) column.push(newGrid[i][j]);
            const { newArr, points } = slide(column);
            for (let i = 0; i < GRID_SIZE; i++) {
              if (newGrid[GRID_SIZE - 1 - i][j] !== newArr[i]) moved = true;
              newGrid[GRID_SIZE - 1 - i][j] = newArr[i];
            }
            if (points > 0) setScore((prevScore) => prevScore + points);
          }
          break;
        case 'left':
          for (let i = 0; i < GRID_SIZE; i++) {
            const { newArr, points } = slide(newGrid[i]);
            if (newGrid[i].join('') !== newArr.join('')) moved = true;
            newGrid[i] = newArr;
            if (points > 0) setScore((prevScore) => prevScore + points);
          }
          break;
        case 'right':
          for (let i = 0; i < GRID_SIZE; i++) {
            const { newArr, points } = slide(newGrid[i].slice().reverse());
            const reversed = newArr.reverse();
            if (newGrid[i].join('') !== reversed.join('')) moved = true;
            newGrid[i] = reversed;
            if (points > 0) setScore((prevScore) => prevScore + points);
          }
          break;
        default:
          break;
      }

      if (moved) {
        newGrid = addRandomTile(newGrid);
        if (!canMove(newGrid)) {
          setGameOver(true);
        }
      }
      return newGrid;
    });
  };

  useEffect(() => {
    setGrid(initializeGrid());
    setScore(0);

    const handleKeyDown = (e) => {
      if (gameOver) return;
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
          move('up');
          break;
        case 'ArrowDown':
          move('down');
          break;
        case 'ArrowLeft':
          move('left');
          break;
        case 'ArrowRight':
          move('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRestart = () => {
    setGrid(initializeGrid());
    setScore(0);
    setGameOver(false);
  };

  return (
    <Box className="game-bg" sx={{ height: '100vh', overflow: 'hidden' }}>
      <Box className="neon-circle" sx={{ width: '150px', height: '150px', top: '10%', left: '20%' }} />
      <Box className="neon-circle" sx={{ width: '200px', height: '200px', top: '60%', left: '70%' }} />
      <Box className="neon-circle" sx={{ width: '100px', height: '100px', top: '40%', left: '40%' }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#fff' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 4, color: '#fff' }}>
          Страница не найдена
        </Typography>
        <Box className="game-container">
          <Box className="game-header">
            <Typography variant="h5" sx={{ color: '#eee4da' }}>
              2048
            </Typography>
            <Typography variant="body1" sx={{ color: '#eee4da' }}>
              Счёт: {score}
            </Typography>
          </Box>
          <Box className="grid">
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <Box
                  key={`${i}-${j}`}
                  className={`cell tile-${cell} ${cell !== 0 ? 'tile-appear' : ''}`}
                  sx={{
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  }}
                >
                  {cell !== 0 ? cell : ''}
                </Box>
              ))
            )}
          </Box>
          {gameOver && (
            <Box className="game-over">
              <Typography variant="h6" sx={{ color: '#d32f2f', mb: 2 }}>
                Игра окончена!
              </Typography>
              <Button variant="contained" color="primary" onClick={handleRestart} sx={{ mr: 2 }}>
                Рестарт
              </Button>
            </Box>
          )}
        </Box>
        <Typography variant="body1" sx={{ mt: 2, mb: 4, color: '#fff' }}>
          Используй стрелки на клавиатуре для управления
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ padding: '10px 20px' }}>
          Вернуться на главную
        </Button>
      </Box>
    </Box>
  );
};

export default Page404;
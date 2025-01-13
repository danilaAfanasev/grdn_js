import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRating } from "../redux/bookSlice";
import { Card, CardContent, Typography, Checkbox, Rating, IconButton, Box, Collapse, Tooltip, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BookItem = ({ book, onRemove, onToggleRead, onEdit }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleRatingChange = (event, newValue) => {
    dispatch(setRating({ id: book.id, rating: newValue }));
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mb: 2, position: "relative" }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Checkbox checked={book.read} onChange={onToggleRead} />
            <Box flexGrow={1} display="flex" alignItems="center">
              <Typography variant="h5" component="div">
                {book.title}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Rating
              name="simple-controlled"
              value={book.rating}
              onChange={handleRatingChange}
            />
            <Tooltip title="Редактировать книгу">
              <IconButton aria-label="edit" onClick={() => onEdit(book)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить книгу">
              <IconButton aria-label="delete" onClick={onRemove}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="text"
              size="small"
              onClick={handleToggleExpand}
              endIcon={<ExpandMoreIcon />}
            >
              Подробнее
            </Button>
          </Box>
        </Box>
        <Typography color="text.secondary">
          {book.author} - {book.year} - {book.genre}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{book.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BookItem;

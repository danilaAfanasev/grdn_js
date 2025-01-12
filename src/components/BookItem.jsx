import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRating } from "../redux/bookSlice";
import { Card, CardContent, Typography, Checkbox, Rating, IconButton, Box, Collapse } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BookItem = ({ book, onRemove, onToggleRead }) => {
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
      <CardContent onClick={handleToggleExpand} style={{ cursor: 'pointer' }}>
        <Box display="flex" alignItems="center">
          <Checkbox checked={book.read} onChange={onToggleRead} />
          <Box flexGrow={1} display="flex" alignItems="center">
            <Typography variant="h5" component="div">
              {book.title}
            </Typography>
          </Box>
          <Rating
            name="simple-controlled"
            value={book.rating}
            onChange={handleRatingChange}
          />
          <IconButton aria-label="delete" onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
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

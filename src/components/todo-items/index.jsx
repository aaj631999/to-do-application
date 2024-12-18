import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export default function ToDoItem({ todo, getTodoDetails }) {
  console.log(todo);
  return (
    <Card
      sx={{
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5" color={"text.secondary"}>
          {todo?.todo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => getTodoDetails(todo?.id)}
          sx={{
            backgroundColor: "black",
            color: "white",
            opacity: "1",
            ":hover": {
              backgroundColor: "black",
              color: "white",
              opacity: "0.5",
            },
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}

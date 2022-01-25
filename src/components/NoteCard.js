import { Card, CardHeader, CardContent, IconButton, Typography, makeStyles, Avatar  } from "@material-ui/core";
import { green, yellow, red } from "@material-ui/core/colors";
import { DeleteOutlined } from "@material-ui/icons";
import Notes from "../pages/Notes";

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (note) => {
            if (note.category === "todos") {
                return yellow[700];
            } else if (note.category === "money") {
                return red[700];
            } else if (note.category === "reminder") {
                return green[700];
            }
        }
    }
})

const NoteCard = ({note, handleDelete}) => {
    const classes = useStyles(note)

    return ( 
        <div>
           <Card elevation={1}>
               <CardHeader
               avatar={<Avatar className={classes.avatar}> {note.category[0].toUpperCase()} </Avatar>}
                action={
                    <IconButton onClick={() => handleDelete(note.id)}>
                        <DeleteOutlined />
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
               />
               <CardContent>
                   <Typography variant="body2" color="textSecondary">
                       {note.details}
                   </Typography>
               </CardContent>
           </Card>
        </div>
     );
}
 
export default NoteCard;
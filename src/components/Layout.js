import { Drawer, makeStyles, Typography, AppBar, Toolbar } from "@material-ui/core";
import {List, ListItem, ListItemIcon, ListItemText, Avatar} from '@material-ui/core';
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import { format } from 'date-fns';


const useStyles = makeStyles((theme) => {
   return {
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3),
    },
    drawer: {
        width: 240,
    },
    drawerPaper: {
        width: 240,
    },
    root: {
        display: `flex`
    },
    active: {
        background: '#f4f4f4',
    },
    title: {
        padding: theme.spacing(2),
    },
    appbar: {
        width: `calc(100% - ${240}px)`,
        background: 'white',
        color: 'black'
    },
    date: {
        flexGrow: 1
    },
    avatar: {
        marginLeft: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar
   }
})

const Layout = ({children}) => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create'
        },
    ];


    return ( 
        <div className={classes.root}>
            <AppBar
            className={classes.appbar}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                       Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Mario
                    </Typography>
                    <Avatar src="/mario.png" className={classes.avatar} />
                </Toolbar>
            </AppBar>

            <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper: classes.drawerPaper}}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Ninja notes
                    </Typography>
                </div>

               <List>
                   {menuItems.map(item => (
                       <ListItem 
                       key={item.text}
                       button
                       onClick={() => history.push(item.path)}
                       className={location.pathname === item.path ? classes.active : null}
                       >
                           <ListItemIcon> {item.icon} </ListItemIcon>
                           <ListItemText> {item.text}</ListItemText>
                       </ListItem>
                   ))}
               </List>

            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>  
        </div>
     );
}
 
export default Layout;
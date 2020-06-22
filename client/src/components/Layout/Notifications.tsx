import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

// Time libraries
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

// Material UI imports
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';


class Notifications extends Component {
    state = {
        anchorEl: null
    };

    // @ts-ignore
    handleOpen = (event) => {
        this.setState({
            anchorEl: event.target
        });
    };

    // @ts-ignore
    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    onMenuOpened = () => {
        // @ts-ignore
        let unreadNotificationsIds = this.props.notifications
            // @ts-ignore
            .filter(not => !not.read)
            // @ts-ignore
            .map(not => not.notificationId);

        // @ts-ignore
        this.props.markNotificationsRead([...unreadNotificationsIds]);
    };

    render() {
        // @ts-ignore
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        // ************************************************

        let notificationIcon;

        if (notifications && notifications.length > 0) {
            // @ts-ignore
            if (notifications.filter(not => not.read === false).length > 0) {
                notificationIcon =
                    <Badge
                        // @ts-ignore
                        badgeContent={notifications.filter(not => not.read === false).length}
                        color={"secondary"}
                    >
                        <NotificationsIcon />
                    </Badge>
            } else {
                notificationIcon = <NotificationsIcon />
            }
        } else {
            notificationIcon = <NotificationsIcon />
        }
        // ************************************************
        let notificationsMarkup;

        if (notifications && notifications.length > 0) {
            // @ts-ignore
            notificationsMarkup = notifications.map(not => {
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? 'primary' : 'secondary';
                const icon = not.type === 'like' ?
                    (
                        <FavoriteIcon color={iconColor} style={{marginRight: 10}} />
                    ) : (
                        <ChatIcon color={iconColor} style={{marginRight: 10}} />
                    );

                return (
                    <MenuItem
                        key={not.createdAt}
                        onClick={this.handleClose}
                    >
                        {icon}

                        <Link to={`/users/${not.recipient}/screams/${not.screamId}`}>
                            <Typography
                                color={"primary"}
                                variant={"body1"}
                            >
                                {not.sender} {verb} your scream {time}
                            </Typography>
                        </Link>
                    </MenuItem>
                )
            })
        } else {
            notificationsMarkup = (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet!
                </MenuItem>
            );
        }

        return (
            <Fragment>
                <Tooltip title={"Your notifications"} placement={"top"}>
                    <IconButton
                        aria-owns={
                            anchorEl ? 'simple-menu' : undefined
                        }
                        aria-haspopup
                        onClick={this.handleOpen}
                    >
                        {notificationIcon}
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        );
    }
}

// @ts-ignore
Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
};

// @ts-ignore
const mapStateToProps = state => ({
    notifications: state.user.notifications
});

const mapActionsToProps = {
    markNotificationsRead
};

export default connect(mapStateToProps, mapActionsToProps)(Notifications);
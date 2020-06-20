import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// @ts-ignore
export default ({ children, onClick, tip, buttonClassName = '', tipClassName = ''}) => (
    <Tooltip title={tip} className={tipClassName} placement={"top"}>
        <IconButton onClick={onClick} className={buttonClassName}>
            {
                children
            }
        </IconButton>
    </Tooltip>
);
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        margin: '10px'
    }
})

const ClientsDash = props => {

    const history = useHistory()
    const classes = useStyles()

    return (
        <div>
            <div>
                Search
            </div>
            <div>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={ () => {
                        history.push(`${history.location.pathname}/new`)
                    }}
                >New
                </Button>
            </div>
            <div>
                {/* list header */}
            </div>
            <div>
                {/* list body */}
            </div>
        </div>
    )
}

export default ClientsDash;
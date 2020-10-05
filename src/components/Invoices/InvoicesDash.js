import React, { useState } from 'react';
import { Button, makeStyles, Tab, Tabs } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    button: {
        margin: '10px'
    }
})

const InvoicesDash = props => {

    const history = useHistory()
    const [tab, setTab] = useState("all")
    const classes = useStyles()

    const tabChange = (event, newValue) => {
        setTab(newValue)
    }

    return (
        <div>
            <div>
                Search
            </div>
            <div>
                <Tabs
                    indicatorColor="primary"
                    value={tab}
                    onChange={tabChange}
                >
                    <Tab label="All" />
                    <Tab label="Outstanding" />
                    <Tab label="Paid" />
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={ () => {
                            history.push(`${history.location.pathname}/new`)
                        }}
                    >New
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                    >Send</Button>
                </Tabs>
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

export default InvoicesDash;
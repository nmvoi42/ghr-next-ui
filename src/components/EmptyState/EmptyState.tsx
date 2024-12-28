
import {
    Box,
    Stack,
    Typography,
} from '@mui/material';

import {
    ReportProblemRounded,
    NotInterestedRounded,
} from '@mui/icons-material';

type EmptyStateProps = {
    error?: boolean,
    message?: string | null,
    title?: string | null,
};

/**
 * A component to show when empty data is displayed.
 * This may be due to an error or no data for valid reasons. 
 *
 * @param {boolean} error - Whether or not this empty state represents a failure.
 * @param {string} message - The message to display with the empty state.
 * @param {string} title - The title to display at the top of the empty state.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
    error = false,
    message = null,
    title = null,
}) => {
    let icon = null;

    if ( error ) {
        // Error empty state

        icon = (
            <ReportProblemRounded sx={ (theme) => ({
                color: theme.palette.warning.light,
            })} />
        );

        if ( title !== '' ) {
            title = 'Whoops!';
        }

        if ( !message ) {
            message = 'Unable to display data.';
        }
    } else {
        // Non-error empty state

        icon = (
            <NotInterestedRounded color="primary" />
        );

        if ( title !== '' ) {
            title = 'No data';
        }

        if ( !message ) {
            message = 'No data is available.';
        }
    }

    return (
        <Stack direction="column" >
            <Typography variant="h5" sx={{ marginBottom: "0.5rem" }} >
                { title }
            </Typography>
            <Stack direction="row" >
                <Box sx={{ marginRight:"0.5rem"}} >
                    { icon }
                </Box>
                <Typography variant="body1">
                    { message }
                </Typography>
            </Stack>
        </Stack>
    );
};

export default EmptyState;
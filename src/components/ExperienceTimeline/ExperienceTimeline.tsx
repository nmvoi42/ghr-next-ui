
import {
    Container,
    Skeleton,
    Typography,
} from '@mui/material';

import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator,
} from '@mui/lab';

import EmptyState from '@/components/EmptyState';

import { timelineItemClasses } from '@mui/lab/TimelineItem';
import type { Experience } from '@/types/ProfileTypes';

import { standardDateStringToLocalizedDateString } from '@/util/util';

type ExperienceTimelineProps = {
    experience? : Experience[];
    loading? : boolean,
};

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
    experience,
    loading = false,
}) => {
    let experienceContent : JSX.Element | null = null;

    if ( loading ) {
        // If we are still loading the data, display a skeleton animation in
        // place of the chart.
        experienceContent = (
            <>
                <TimelineItem key={'loading1'} >
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Skeleton variant="text" />
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem key={'loading2'} >
                    <TimelineSeparator>
                        <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Skeleton variant="text" />
                    </TimelineContent>
                </TimelineItem>
            </>
        );
    } else if ( experience ) {
        experienceContent = (
            <>
                { experience?.map( (item, index) => {
                    const key = `${item.title} ${item.company} ${item.start} ${item.end}`;

                    let titleAndCompany = item.company ?? '';
                    if ( titleAndCompany ) {
                        titleAndCompany += ' - ';
                    }
                    titleAndCompany += item.title ?? '';

                    let startAndEnd = standardDateStringToLocalizedDateString( item.start );
                    if ( startAndEnd ) {
                        startAndEnd += " - ";
                    }
                    if ( !item.end ) {
                        startAndEnd += "Present";
                    } else {
                        startAndEnd += standardDateStringToLocalizedDateString( item.end );
                    }

                    return (
                        <TimelineItem key={key} >
                            <TimelineSeparator>
                                <TimelineDot />
                                {
                                ( index !== experience.length-1 ) ? (
                                    <TimelineConnector />
                                ) : null
                                }
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography component='h4' variant='h6' sx={ (theme) => ( {
                                    color: theme.palette.primary.main,
                                } ) } >
                                    {titleAndCompany}
                                </Typography>
                                <Typography>
                                    {startAndEnd}
                                </Typography>
                            </TimelineContent>
                            {
                            ( item.description ) ? (
                                <TimelineContent>
                                    <Typography variant="body1" >
                                        { item.description }
                                    </Typography>
                                </TimelineContent>
                            ) : null
                            }
                        </TimelineItem>
                    );
                } ) }
            </>
        );
    } else {
        // No data to display, show an empty state.
        experienceContent = (
            <EmptyState
                error
                message="Unable to display data."
            />
        );
    }

    return (
        <Container disableGutters={true} maxWidth={'xl'} >
            <Typography
                component='h3'
                variant='h5'
                sx={{ marginLeft: "1rem" }} >
                Experience
            </Typography>
            <Container disableGutters={true} maxWidth={'lg'} >
                <Timeline sx={{
                    [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, },
                }} >
                    { experienceContent }
            </Timeline>
            </Container>
        </Container>
    );
};

export default ExperienceTimeline;
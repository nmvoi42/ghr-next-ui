
import {
    Container,
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

import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Experience } from '@/types/ProfileTypes';

import { standardDateStringToLocalizedDateString } from '@/util/util';

type ExperienceTimelineProps = {
    experience? : Experience[];
};

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
    experience,
}) => {

    return (
        <Container disableGutters={true} maxWidth={'xl'} >
            <Typography variant='h5' sx={{ marginLeft: "1rem" }} >
                Experience
            </Typography>
            <Container disableGutters={true} maxWidth={'lg'} >
                <Timeline sx={{
                    [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, },
                }} >
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
                                    <Typography>
                                        {titleAndCompany}
                                    </Typography>
                                    <Typography>
                                        {startAndEnd}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        );
                    } ) }
            </Timeline>
            </Container>
        </Container>
    );
};

export default ExperienceTimeline;
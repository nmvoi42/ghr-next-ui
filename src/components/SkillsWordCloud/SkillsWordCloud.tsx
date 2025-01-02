'use client'

import {
    Container,
    Skeleton,
    Typography,
} from '@mui/material';
import { WordCloudChart } from '@carbon/charts-react'

import type { Skill } from '@/types/ProfileTypes';
import EmptyState from '../EmptyState';

type SkillsWordCloudProps = {
    loading?: boolean,
    skills: Array< Skill >,
};

/**
 * A component to display the provided skills list as a word cloud chart.
 *
 * @para {boolean} loading - Whether the component's data is still loading.
 * @param {Array<Skill>} skills - The list of skill information for display.
 */
const SkillsWordCloud : React.FC<SkillsWordCloudProps> = ({
    loading = false,
    skills,
}) => {

    let skillsContent: JSX.Element | null = null;

    if ( loading ) {

        // If we are still loading the data, display a skeleton animation in
        // place of the chart.
        skillsContent = (
            <Skeleton variant="rounded" height={400} />
        );

    } else {

        // If we have finished loading, convert the skills data
        // into the chart format and display it.
        const wordCloudData = skills.map( (skill) => (
            {
                word: skill.skill,
                value: skill.level,
                group: skill.side
            }
        ));

        if ( wordCloudData ) {

            // Display the skills data in a word cloud chart.
            skillsContent = (
                <>
                    <WordCloudChart
                        data={ wordCloudData }
                        options={{
                            title: 'Technologies',
                            resizable: true,
                            color: {
                                pairing: {
                                    option: 3
                                },
                            },
                            tooltip: {
                                wordLabel: 'Skill',
                                valueLabel: 'Level',
                            },
                            height: '400px',
                            theme: 'g100',
                        }}
                    />
                </>
            );

        } else {

            // No data to display, show an empty state.
            skillsContent = (
                <EmptyState
                    error
                    message="Unable to display data."
                />
            );

        }
    }

    // Render the content in a fixed size container.
    return (
        <Container disableGutters={true} maxWidth={'xl'} >
            <Typography variant='h5' sx={{ marginLeft: "1rem" }} >
                Skills
            </Typography>
            <Container disableGutters={true} maxWidth={'lg'} >
                { skillsContent }
            </Container>
        </Container>
    );
}

export default SkillsWordCloud;
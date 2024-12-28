'use client'

import {
    Container,
    Skeleton,
} from '@mui/material';
import { WordCloudChart } from '@carbon/charts-react'

import type { Skill } from '@/types/ProfileTypes';

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

    if ( !loading ) {
        const wordCloudData = skills.map( (skill) => (
            {
                word: skill.skill,
                value: skill.level,
                group: skill.side
            }
        ));

        return (
            <Container disableGutters={true} maxWidth={'lg'} >
                <WordCloudChart
                    data={ wordCloudData }
                    options={{
                        title: 'Skills',
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
                >
                </WordCloudChart>
            </Container>
        );
    } else {
        // If we are loading, display a skeleton animation in
        // place of the chart.
        return (
            <Container disableGutters={true} maxWidth={'lg'} >
                <Skeleton variant="rounded" />
            </Container>
        );
    }
}

export default SkillsWordCloud;
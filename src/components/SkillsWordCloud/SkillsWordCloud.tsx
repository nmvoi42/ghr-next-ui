'use client'

import {
    Container,
} from '@mui/material';
import { WordCloudChart } from '@carbon/charts-react'

import type { Skill } from '@/types/ProfileTypes';

type SkillsWordCloudProps = {
    skills: Array< Skill >,
};

/**
 * A component to display the provided skills list as a word cloud chart.
 *
 * @param {Array<Skill>} skills - The list of skill information for display.
 */
const SkillsWordCloud : React.FC<SkillsWordCloudProps> = ({
    skills,
}) => {

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
}

export default SkillsWordCloud;
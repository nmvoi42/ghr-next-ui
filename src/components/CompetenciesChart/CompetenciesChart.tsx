
import { useTheme } from '@mui/material';
import { RadarChart } from "@carbon/charts-react";

import type { Competency } from '@/types/ProfileTypes';

import styles from './CompetenciesChart.module.scss';
import React from 'react';

type CompetenciesChartProperties = {
    color?: 'primary' | 'secondary',
    competencies?: Competency[],
    loading?: boolean,
};

/**
 * 
 * @param {Competency[]} competencies - A list of competency data.
 * @param {boolean} loading - Whether the data for the chart is loading.
 * @returns 
 */
const CompetenciesChart: React.FC<CompetenciesChartProperties> = ({
    color,
    competencies,
    loading,
}) => {
    const theme = useTheme();
    let data: {group:string,angle:string,value:number}[] = [];

    if ( !loading && competencies ) {
        data = competencies.flatMap( (competency) => (
            [
                {
                    group: '1',
                    angle: competency.competency,
                    value: competency.value,
                },
                {
                    group: '0',
                    angle: competency.competency,
                    value: 100,
                },
            ]
        ) );
    }

    /*

    */

    return (
        <div className={ styles.competenciesChart } >
            <RadarChart
                data={data}
                options={{
                    title: '',
                    radar: {
                        axes: {
                            angle: 'angle',
                            value: 'value'
                        }
                    },
                    color: {
                        scale: {
                            "1": ( color==='secondary' ) ? theme.palette.secondary.main : theme.palette.primary.main,
                        },
                    },
                    legend: { enabled: false },
                    tooltip: { enabled: false },
                    toolbar: { enabled: false },
                    height: '200px',
                    width: '400px',
                    theme: 'g100',
                }}
            >
            </RadarChart>
        </div>
    );
};

export default CompetenciesChart;
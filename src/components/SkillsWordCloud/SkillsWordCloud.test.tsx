import { act, render, screen } from '@testing-library/react';

import type { Skill } from '@/types/ProfileTypes';

import SkillsWordCloud from '.';

window.ResizeObserver =
    window.ResizeObserver ??
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

describe('SkillsWordCloud component test', () => {
    beforeAll( () => {
        console.log("SkillsWordCloud test");
    } );

    it( 'should display all provided skills', async () => {
        const testSkills: Array<Skill> = [
            { skill: "PostgreSQL", level: 4, type: "Language", side: "Backend"},
            { skill: "MongoDB", level: 2, type: "Language", side: "Backend"},
            { skill: "GraphQL", level: 4, type: "Framework", side: "Backend"},
            { skill: "PHP", level: 4, type: "Language", side: "Backend"},
            { skill: "Bootstrap UI", level: 3, type: "Framework", side: "Frontend"},
            { skill: "Material UI", level: 2, type: "Framework", side: "Frontend"},
            { skill: "Laravel", level: 1, type: "Framework", side: "Backend"},
        ];

        await act(async () => {
            return render(
                ( 
                    <div data-testid="skillswordcloud"
                        style={{width:400,height:400}}
                    >
                        <SkillsWordCloud
                            skills = { testSkills }
                        />
                    </div>
                )
            );
        });

        expect( await screen.findByLabelText("Skills") ).toBeInTheDocument();
        expect( await screen.findByText("Frontend") ).toBeInTheDocument();
        expect( await screen.findByText("Backend") ).toBeInTheDocument();

        expect( await screen.findByText("PHP",{},{timeout:5000}) ).toBeInTheDocument();
    }, 6000);
});

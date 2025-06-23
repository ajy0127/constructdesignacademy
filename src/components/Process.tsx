import styled from 'styled-components';

const phases = [
  {
    title: 'Brand Refresh',
    desc: 'Color, typography, tone, and logo refinement — visual alignment with brand values.'
  },
  {
    title: 'UX Modernization', 
    desc: 'Navigation, flow, mobile UX, and clarity — improved hierarchy and responsiveness.'
  },
  {
    title: 'Intelligent Integration',
    desc: 'CRM, scheduling, booking tools — integrated for operational impact.'
  }
];

const ProcessSection = styled.section`
  padding: 6rem 1rem;
  background-color: #121212;
  color: #F6F5F0;
`;

const Title = styled.h2`
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.025em;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PhaseCard = styled.div`
  border: 1px solid #002366;
  padding: 2rem;
  border-radius: 0.375rem;
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: #F6C700;
  }
`;

const PhaseTitle = styled.h3`
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #F6C700;
`;

const PhaseDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(246, 245, 240, 0.8);
  font-family: Inter, "Space Grotesk", sans-serif;
`;

const Process = () => (
  <ProcessSection id="process">
    <Container>
      <Title>Three-Phase Revamp</Title>
      <Grid>
        {phases.map(phase => (
          <PhaseCard key={phase.title}>
            <PhaseTitle>{phase.title}</PhaseTitle>
            <PhaseDescription>{phase.desc}</PhaseDescription>
          </PhaseCard>
        ))}
      </Grid>
    </Container>
  </ProcessSection>
);

export default Process;
import styled from 'styled-components';

const points = [
  { title: 'Boutique Attention', desc: 'Direct access to senior talent and white-glove project management.' },
  { title: 'Enterprise Discipline', desc: 'Structured processes with luxury attention to detail.' },
  { title: 'Architectural Aesthetic', desc: 'Design principles rooted in timeless, minimalist elegance.' },
  { title: 'AWS-Native Technical Stack', desc: 'Performance-optimized, scalable, SEO-friendly infrastructure.' },
];

const WhySection = styled.section`
  padding: 6rem 1rem;
  background-color: #002366;
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
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Point = styled.div`
  text-align: center;
  padding: 1rem;
`;

const PointTitle = styled.h3`
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #F6C700;
`;

const PointDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(246, 245, 240, 0.8);
  font-family: Inter, "Space Grotesk", sans-serif;
`;

const Quote = styled.blockquote`
  max-width: 48rem;
  margin: 0 auto;
  text-align: center;
  font-style: italic;
  font-size: 1.125rem;
  color: rgba(246, 245, 240, 0.8);
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
`;

const WhyUs = () => (
  <WhySection id="why">
    <Container>
      <Title>Why Work With Us</Title>
      <Grid>
        {points.map(point => (
          <Point key={point.title}>
            <PointTitle>{point.title}</PointTitle>
            <PointDescription>{point.desc}</PointDescription>
          </Point>
        ))}
      </Grid>
      <Quote>
        "You're not just getting a website — you're getting an experience."
      </Quote>
    </Container>
  </WhySection>
);

export default WhyUs;
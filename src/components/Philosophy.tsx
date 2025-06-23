import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 6rem 1rem;
  text-align: center;
  background-color: #F6F5F0;
  color: #121212;
`;

const Title = styled.h2`
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  letter-spacing: -0.025em;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const MainTagline = styled.p`
  font-size: 1.5rem;
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  margin-bottom: 2rem;
  color: #014421;
  
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.75;
  max-width: 48rem;
  margin: 0 auto;
  font-family: Inter, "Space Grotesk", sans-serif;
`;

const Philosophy = () => (
  <AboutSection id="philosophy">
    <Title>About Construct</Title>
    <Container>
      <MainTagline>
        Construct is the brand that builds brands.
      </MainTagline>
      <Description>
        We believe in design that speaks without screaming — where every pixel, color, and font is intentional. 
        Luxury isn't just aesthetic — it's attention to detail, precision, and architectural intelligence. 
        At Construct, we combine utility with elevated elegance, creating digital experiences that convey depth and confidence.
      </Description>
    </Container>
  </AboutSection>
);

export default Philosophy;
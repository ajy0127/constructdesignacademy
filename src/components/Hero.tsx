import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #014421;
  color: #F6F5F0;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  font-size: 4rem;
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;
  
  @media (min-width: 768px) {
    font-size: 6rem;
  }
`;

const TitleBold = styled.span`
  font-weight: 700;
`;

const TitleLight = styled.span`
  font-weight: 300;
`;

const Tagline = styled.h2`
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  color: #F6F5F0;
  
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const Description = styled.p`
  max-width: 36rem;
  font-size: 1.125rem;
  color: rgba(246, 245, 240, 0.8);
  margin-bottom: 3rem;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 1rem 2.5rem;
  border: 2px solid #F6C700;
  color: #F6C700;
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  letter-spacing: 0.1em;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F6C700;
    color: #014421;
  }
`;

const Hero = () => (
  <HeroSection id="hero">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title>
        <TitleBold>CON</TitleBold><TitleLight>STRUCT</TitleLight>
      </Title>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Tagline>Built to be felt.</Tagline>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Description>Design & Digital for the Discerning</Description>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <CTAButton href="#contact">Let's Build Together</CTAButton>
    </motion.div>
  </HeroSection>
);

export default Hero;

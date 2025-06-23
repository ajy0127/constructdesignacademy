import { useState } from 'react';
import styled from 'styled-components';

const ContactSection = styled.section`
  padding: 6rem 1rem;
  background-color: #4A0000;
  color: #F6F5F0;
`;

const Title = styled.h2`
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Container = styled.div`
  max-width: 36rem;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  background-color: rgba(246, 245, 240, 0.1);
  border: 1px solid rgba(246, 245, 240, 0.3);
  color: #F6F5F0;
  font-family: Inter, "Space Grotesk", sans-serif;
  
  &::placeholder {
    color: rgba(246, 245, 240, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: #F6C700;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  background-color: rgba(246, 245, 240, 0.1);
  border: 1px solid rgba(246, 245, 240, 0.3);
  color: #F6F5F0;
  font-family: Inter, "Space Grotesk", sans-serif;
  
  &:focus {
    outline: none;
    border-color: #F6C700;
  }
  
  option {
    background-color: #4A0000;
    color: #F6F5F0;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  background-color: rgba(246, 245, 240, 0.1);
  border: 1px solid rgba(246, 245, 240, 0.3);
  color: #F6F5F0;
  font-family: Inter, "Space Grotesk", sans-serif;
  resize: vertical;
  
  &::placeholder {
    color: rgba(246, 245, 240, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: #F6C700;
  }
`;

const SubmitButton = styled.button`
  align-self: center;
  padding: 0.75rem 2rem;
  border: 2px solid #F6C700;
  background: transparent;
  color: #F6C700;
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F6C700;
    color: #4A0000;
  }
`;

const SuccessMessage = styled.p`
  text-align: center;
  color: #F6C700;
  font-size: 1.125rem;
  font-family: "Söhne", "Neue Haas Grotesk", sans-serif;
`;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <ContactSection id="contact">
      <Container>
        <Title>Let's Build Something That Lasts</Title>
        {submitted ? (
          <SuccessMessage>Thanks — we'll be in touch soon.</SuccessMessage>
        ) : (
          <Form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            onSubmit={() => setSubmitted(true)}
          >
            <InputRow>
              <Input name="name" placeholder="Name" required />
              <Input name="email" type="email" placeholder="Email" required />
            </InputRow>
            <Input name="company" placeholder="Company (optional)" />
            <Select name="project">
              <option>What are you building?</option>
              <option>Website</option>
              <option>Brand</option>
              <option>Platform</option>
              <option>Not sure</option>
            </Select>
            <TextArea name="message" rows={6} placeholder="Message" required />
            <SubmitButton type="submit">Start the Conversation</SubmitButton>
          </Form>
        )}
      </Container>
    </ContactSection>
  );
};

export default Contact;
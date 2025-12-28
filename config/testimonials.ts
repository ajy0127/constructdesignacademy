export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Alright we're back, green light for corp tax. Huge shoutout for the Figma Make prototype of entity management. That was critical to getting senior tax leaders onboard.",
    author: "AG",
    role: "Tax Product Manager",
    company: "Product and Innovation"
  },
  {
    quote: "Shoutout to J! Huge kudos for the speed and quality of your recent design work. The way you pulled together a design & dev call to gather engineering input, then turned around a completely revamped mockup within hours that hit the mark, truly impressive. Your input as a designer is showing: thoughtful collaboration, sharp execution, and hustle to get key assets out the door and keep the team's momentum strong. You're raising the bar, and it's making a real impact.",
    author: "BK",
    role: "Senior Software Engineer",
    company: "Product and Innovation"
  },
  {
    quote: "J has done an impressive job triangulating input from multiple stakeholders to develop wireframes that bring clarity to tax leaders and the team. I want to recognize his hustle lately to create designs for a variety of new features that provide a solid foundation for critical engineering efforts ahead of our big user onboarding push. He continues to work across engineering, product and design teams to push for solutions that balance user needs and technical realities. Thanks J!",
    author: "AG",
    role: "Tax Product Manager",
    company: "Product and Innovation"
  },
  {
    quote: "I really like your thought process on keeping it simple and removing unnecessary steps.",
    author: "AG",
    role: "Tax Product Manager",
    company: "Product and Innovation"
  },
  {
    quote: "Thank you for being such a wonderful coworker. Working together to consolidate the designs between AA and TMS has been not only exciting but also incredibly valuable. I truly appreciate your willingness to meet with me, work through problems collaboratively, and jump on calls at a moment's notice. Your support has really made a difference on our project and in fostering a positive team environment.",
    author: "KS",
    role: "Audit UI Designer",
    company: "Product and Innovation"
  }
];

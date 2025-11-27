import Hero from "@/components/ui/animated-shader-hero";

// Demo Component showing how to use the Hero
const LandingPage = () => {
  const handlePrimaryClick = () => {
    console.log('Get Started clicked!');
    // Add your logic here
  };

  const handleSecondaryClick = () => {
    console.log('Explore Features clicked!');
    // Add your logic here
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <Hero
        trustBadge={{
          text: "Join the beta version now (Limited to 50 people)",
          icons: ["✨"]
        }}
        headline={{
          line1: "Stop Scrolling",
          line2: "Start Getting Notified"
        }}
        subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless."
        buttons={{
          primary: {
            text: "Get Started for Free",
            onClick: handlePrimaryClick
          },
          secondary: {
            text: "Explore Features",
            onClick: handleSecondaryClick
          }
        }}
      />
    </div>
  );
};

export default LandingPage;
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
          text: "Join the beta version now (Only 50 slots remaining)",
          icons: ["✨"]
        }}
        headline={{
          line1: "Stop Scrolling",
          line2: "Start Getting Notified"
        }}
        subtitle={
          <>
            Precision job alerts. Zero noise. Zero delay.
            <br />
            LinkedIn tells you after everyone else. We tell you before anyone else.
            <br />
            Instant, hyper-targeted job alerts for the exact roles and companies you choose.
          </>
        }
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
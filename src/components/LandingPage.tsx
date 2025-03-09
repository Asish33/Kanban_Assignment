import Aurora from "./ui/Arora";

<Aurora
  colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]}
  blend={0.5}
  amplitude={2.0}
  speed={2}
/>;

export function LandingPage() {
  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <Aurora></Aurora>
      <div className="bg-red-200 min-h-screen">hi there</div>
    </div>
  );
}


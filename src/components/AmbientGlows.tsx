"use client";

export default function AmbientGlows() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
      
      {/* Top Left Edge Glow */}
      <div 
        className="absolute top-[5%] left-0 w-[600px] md:w-[900px] h-[800px] md:h-[1000px] pointer-events-none mix-blend-screen -translate-x-[30%]"
        style={{
          background: "radial-gradient(circle at left, rgba(255, 0, 120, 0.3), transparent 70%)",
          filter: "blur(48px)" // Moderate blur, allows the glow to be clearly visible
        }}
      />

      {/* Mid Right Edge Glow */}
      <div 
        className="absolute top-[40%] right-0 w-[600px] md:w-[900px] h-[800px] md:h-[1000px] pointer-events-none mix-blend-screen translate-x-[30%]"
        style={{
          background: "radial-gradient(circle at right, rgba(255, 0, 120, 0.28), transparent 70%)",
          filter: "blur(48px)"
        }}
      />

      {/* Bottom Left Edge Glow */}
      <div 
        className="absolute bottom-[5%] left-0 w-[600px] md:w-[900px] h-[800px] md:h-[1000px] pointer-events-none mix-blend-screen -translate-x-[30%]"
        style={{
          background: "radial-gradient(circle at left, rgba(255, 0, 120, 0.3), transparent 70%)",
          filter: "blur(48px)"
        }}
      />
      
    </div>
  );
}

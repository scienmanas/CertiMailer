"use client";

export function TopLoader(): JSX.Element {
  return (
    <section className="top-load-bar absolute w-full z-50">
      <div className="load-bar">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </section>
  );
}

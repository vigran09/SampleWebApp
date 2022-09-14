import React from "react";
import Head from "next/head";

function Header({ title }) {
  return <h1>{title}</h1>;
}

export default function HomePage() {
  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
    </div>
  );
}
import Select, { type Choice } from "./components/Select";

export default function App() {
  const choices: Choice[] = [
    { title: "education", value: "education", emoji: "🎓" },
    { title: "science", value: "science", emoji: "🛸" },
    { title: "art", value: "art", emoji: "🎭" },
    { title: "sport", value: "sport", emoji: "⚽" },
    { title: "games", value: "games", emoji: "🎮" },
    { title: "health", value: "health", emoji: "🏥" },
    { title: "engineering", value: "engineering", emoji: "⚙️" },
  ];

  return (
    <div className="container">
      <Select fieldName="field" choices={choices} />
    </div>
  );
}

import Filters from "@/components/Filters";
import SpaceshipsTable from "@/components/SpaceshipsTable";
import { Title } from "@/styles/styles";
import useSpaceships from "@/hooks/useSpaceships";

function Home() {
  const { spaceships, filters, setColors, setPulseLaser, setAverageSpeed } = useSpaceships();

  return (
    <main>
      <Title>Mr Little Z's Spaceships 🚀</Title>
      <Filters
        filters={filters}
        setColors={setColors}
        setPulseLaser={setPulseLaser}
        setAverageSpeed={setAverageSpeed}
      />
      <SpaceshipsTable rows={spaceships} />
    </main>
  );
}

export default Home;

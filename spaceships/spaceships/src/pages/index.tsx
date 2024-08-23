import { Title } from "@/styles/styles";
import useSpaceships from "@/hooks/useSpaceships";
import SpaceshipsTable from "@/components/SpaceshipsTable";
import { SearchFilters } from "@/components/SearchFilters";

function Home() {
  const { spaceships, filters, setColors, setPulseLaser, setAverageSpeed } = useSpaceships();

  return (
    <main>
      <Title>Mr Little Z's Spaceships 🚀</Title>
      <SearchFilters
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

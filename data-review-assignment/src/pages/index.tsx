// pages/index.tsx

import DataReviewTable from "../components/DataReviewTable";

export default function Home() {
  return (
    <>
      <script
        type="module"
        src="node_modules/@material-tailwind/html@latest/scripts/tooltip.js"
      ></script>
      <div>
        <DataReviewTable />
      </div>
    </>
  );
}

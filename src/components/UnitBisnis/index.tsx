import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import UnitBisnisData from "./UnitBisnisData";

const UnitBisnis = () => {
  return (
    <>
      <section id="UnitBisnis" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Unit Bisnis"
            paragraph="Melalui berbagai unit bisnis, Bosowa Bandar terus memperkuat perannya sebagai penggerak utama sektor logistik dan pelabuhan di kawasan timur Indonesia."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {UnitBisnisData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UnitBisnis;

import React from "react";

const Osa = ({ nimi, tehtavia }) => {
  return (
    <tr>
      <td>
        {nimi} {tehtavia}
      </td>
    </tr>
  );
};

const Yhteensa = ({ osat }) => {
  const yhteensa = osat.reduce((summa, osa) => summa + osa.tehtavia, 0);
  return (
    <tr>
      <td>
        yhteensa {yhteensa} tehtavaa
      </td>
    </tr>
  );
};

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <h2>{kurssi.nimi}</h2>
      <table>
        <tbody>
          {kurssi.osat.map(osa => (
            <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />
          ))}

          <Yhteensa osat={kurssi.osat} />
        </tbody>
      </table>
    </div>
  );
};

export default Kurssi;
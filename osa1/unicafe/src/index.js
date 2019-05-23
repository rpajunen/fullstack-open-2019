import React, { useState } from 'react'
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
};

const Statistics = ({ hyva, neutraali, huono }) => {
  const keskiarvo = (hyva, neutraali, huono) =>
    (hyva + huono * -1) / (hyva + neutraali + huono);

  const positiivisia = (hyva, neutraali, huono) => {
    const yhteensa = hyva + neutraali + huono;
    return hyva / yhteensa;
  };

  if (hyva || neutraali || huono > 0) {
    return (
      <div>
        <h3> Statistiikkaa </h3>
        <table>
          <tbody>
            <Statistic text="hyva" value={hyva} />
            <Statistic text="neutraali" value={neutraali} />
            <Statistic text="huono" value={huono} />
            <Statistic
              text="keskiarvo"
              value={keskiarvo(hyva, neutraali, huono)}
            />
            <Statistic
              text="positiivisia"
              value={positiivisia(hyva, neutraali, huono)}
            />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h3> Statistiikkaa </h3>
        Yhtaan palautetta ei ole annettu
        </div>
    );
  }
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Anna palautetta</h2>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="hyva" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutraali" />
        <Button handleClick={() => setBad(bad + 1)} text="huono" />
      </div>
      <div>
        <Statistics
          hyva={good}
          neutraali={neutral}
          huono={bad}
        />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
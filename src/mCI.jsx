import { useState } from "react";
import "./App.css";

 function Mci() {
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState("");
  const [ktv, setKtv] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function calculateMCI(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    const ageValue = Number(age);
    const ktvValue = Number(ktv);
    const creatinineValue = Number(creatinine);
    if (
      age.trim() === "" ||
      ktv.trim() === "" ||
      creatinine.trim() === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (
      !Number.isFinite(ageValue) ||
      !Number.isFinite(ktvValue) ||
      !Number.isFinite(creatinineValue) ||
      ageValue < 18 ||
      ageValue > 120 ||
      ktvValue <= 0 ||
      creatinineValue <= 0
    ) {
      setError("Please enter valid clinical values.");
      return;
    }

    const sexValue = sex === "male" ? 1 : 0;

    const mci =
      16.21 +
      1.12 * sexValue -
      0.06 * ageValue -
      0.08 * ktvValue +
      0.009 * creatinineValue;

    setResult(mci);
  }

  function resetCalculator() {
    setSex("male");
    setAge("");
    setKtv("");
    setCreatinine("");
    setResult(null);
    setError("");
  }

  return (
    <main className="page">
      <section className="calculator">
        <p className="eyebrow">Dr.TAMILARUVI'S MCI CALCULATOR</p>
        <h1>Modified Creatinine Index</h1>
        <p className="subtitle">
          Calculate mCI for adult hemodialysis patients.
        </p>

        <form onSubmit={calculateMCI}>
          <label htmlFor="sex">Sex</label>
          <select
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            min="18"
            max="120"
            step="1"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label htmlFor="ktv">Single-pool Kt/V (spKt/V)</label>
          <input
            id="ktv"
            type="number"
            min="0.01"
            step="any"
            placeholder="Enter spKt/V"
            value={ktv}
            onChange={(e) => setKtv(e.target.value)}
          />

          <label htmlFor="creatinine">
            Pre-dialysis serum creatinine (µmol/L)
          </label>
          <input
            id="creatinine"
            type="number"
            min="0.01"
            step="any"
            placeholder="Enter creatinine"
            value={creatinine}
            onChange={(e) => setCreatinine(e.target.value)}
          />

          {error && <p className="error" role="alert">{error}</p>}

          <button type="submit">Calculate mCI</button>
          <button
            type="button"
            className="reset"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </form>

        {result !== null && (
          <section className="result" aria-live="polite">
            <p>Calculated mCI</p>
            <h2>{result.toFixed(2)}</h2>
            <span>mg/kg/day</span>
            <h2>{result.toFixed(2) * 88.0}</h2>
            <span>µmol/L</span>
            
          </section>
        )}

        <p className="disclaimer">
          For clinical reference only. Verify inputs, units, and results
          with the treating clinician.
        </p>
      </section>
    </main>
  );
}

export default Mci;
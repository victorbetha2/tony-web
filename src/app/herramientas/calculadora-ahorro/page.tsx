"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Moon, Sun } from "lucide-react";

export default function CalculadoraAhorro() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlySave, setMonthlySave] = useState(2000);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);
  const [contribMoment, setContribMoment] = useState("end");
  const [currency, setCurrency] = useState("HNL");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [results, setResults] = useState<{
    finalVal: number;
    contribVal: number;
    interestVal: number;
    avgVal: number;
    annualRows: Array<{
      year: number;
      yearStart: number;
      contribYear: number;
      interestYear: number;
      endBal: number;
      totalContrib: number;
      totalInterest: number;
      yieldPct: number;
    }>;
    monthlyRate: number;
    tea: number;
  } | null>(null);

  const moneyFmt = (n: number) => {
    if (!isFinite(n)) return "-";
    const loc = currency === "USD" ? "en-US" : "es-HN";
    return new Intl.NumberFormat(loc, { style: "currency", currency: currency, maximumFractionDigits: 2 }).format(n);
  };

  const pctFmt = (n: number) => {
    return isFinite(n) ? (n * 100).toFixed(2) + "%" : "-";
  };

  const calcProjection = useCallback(() => {
    const P0 = parseFloat(initialAmount.toString() || "0");
    const PM = parseFloat(monthlySave.toString() || "0");
    const aRate = parseFloat(annualRate.toString() || "0") / 100;
    const yrs = parseInt(years.toString() || "0", 10);
    const mRate = aRate / 12;
    const begin = contribMoment === "begin";

    if (P0 < 0 || PM < 0 || yrs <= 0) {
      alert("Revisa los datos: tiempo debe ser mayor que 0 y montos no negativos.");
      return;
    }

    const tea = Math.pow(1 + mRate, 12) - 1;

    let balance = P0;
    let totalContrib = P0;
    let totalInterest = 0;
    const annualRows = [];

    for (let y = 1; y <= yrs; y++) {
      const yearStart = balance;
      let contribYear = 0;
      let interestYear = 0;

      for (let m = 1; m <= 12; m++) {
        if (begin && PM > 0) {
          balance += PM;
          contribYear += PM;
          totalContrib += PM;
        }
        const interest = balance * mRate;
        balance += interest;
        interestYear += interest;
        totalInterest += interest;
        if (!begin && PM > 0) {
          balance += PM;
          contribYear += PM;
          totalContrib += PM;
        }
      }

      annualRows.push({
        year: y,
        yearStart: yearStart,
        contribYear: contribYear,
        interestYear: interestYear,
        endBal: balance,
        totalContrib: totalContrib,
        totalInterest: totalInterest,
        yieldPct: totalContrib > 0 ? totalInterest / totalContrib : 0
      });
    }

    setResults({
      finalVal: balance,
      contribVal: totalContrib,
      interestVal: totalInterest,
      avgVal: balance / yrs,
      annualRows,
      monthlyRate: mRate,
      tea: tea
    });
  }, [initialAmount, monthlySave, annualRate, years, contribMoment]);

  const clearAll = () => {
    setInitialAmount(10000);
    setMonthlySave(2000);
    setAnnualRate(8);
    setYears(10);
    setContribMoment("end");
    setCurrency("HNL");
    setResults(null);
  };

  const downloadCSV = () => {
    if (!results) return;
    const headers = ["Año", "Saldo inicial", "Aportes del año", "Interés del año", "Saldo final", "Aporte acumulado", "Interés acumulado", "Rendimiento vs aporte"];
    const lines = [headers.join(",")];
    results.annualRows.forEach(r => {
      const row = [r.year, r.yearStart.toFixed(2), r.contribYear.toFixed(2), r.interestYear.toFixed(2), r.endBal.toFixed(2), r.totalContrib.toFixed(2), r.totalInterest.toFixed(2), (r.yieldPct * 100).toFixed(2) + "%"];
      lines.push(row.join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "proyeccion_ahorro_anual.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    calcProjection();
  }, [calcProjection]); // Fixed missing dependency

  return (
    <>
      <Navbar />
      <main className={`flex-1 pt-32 pb-24 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f8fafc]'}`}>
        <style dangerouslySetInnerHTML={{
          __html: `
                    .t2b-calc-ahorro {
                      --blue: ${isDarkMode ? '#3b82f6' : '#2563eb'};
                      --dark: ${isDarkMode ? '#ffffff' : '#0f172a'};
                      --teal: ${isDarkMode ? '#0ea5e9' : '#0891b2'};
                      --bg: transparent;
                      --line: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'};
                      --muted: ${isDarkMode ? '#94a3b8' : '#64748b'};
                      --card: ${isDarkMode ? '#1c1c1c' : '#ffffff'};
                      --soft: ${isDarkMode ? '#262626' : '#f1f5f9'};
                      box-sizing: border-box;
                      font-family: inherit;
                      color: var(--dark);
                    }

                    .t2b-calc-ahorro * {
                      box-sizing: border-box;
                    }

                    .t2b-calc-ahorro .wrap {
                      max-width: 1100px;
                      margin: 0 auto;
                      padding: 26px 16px 32px;
                    }

                    .t2b-calc-ahorro .hero {
                      background: ${isDarkMode ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, var(--teal), var(--blue))'};
                      color: #fff;
                      border-radius: 20px;
                      padding: 32px;
                      box-shadow: ${isDarkMode ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 10px 24px rgba(2, 6, 23, 0.12)'};
                      margin-bottom: 32px;
                      border: 1px solid var(--line);
                      position: relative;
                      overflow: hidden;
                    }

                    .t2b-calc-ahorro .hero::after {
                      content: "";
                      position: absolute;
                      top: -50%;
                      right: -10%;
                      width: 300px;
                      height: 300px;
                      background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
                      pointer-events: none;
                      display: ${isDarkMode ? 'block' : 'none'};
                    }

                    .t2b-calc-ahorro .hero h1 {
                      margin: 0;
                      font-size: 32px;
                      color: white;
                      font-weight: 800;
                      letter-spacing: -0.025em;
                    }

                    .t2b-calc-ahorro .hero p {
                      margin: 12px 0 0;
                      color: ${isDarkMode ? 'var(--muted)' : 'rgba(255, 255, 255, 0.92)'};
                      font-size: 16px;
                    }

                    .t2b-calc-ahorro .grid {
                      display: grid;
                      grid-template-columns: 1.05fr 0.95fr;
                      gap: 24px;
                    }

                    @media (max-width: 900px) {
                      .t2b-calc-ahorro .grid {
                        grid-template-columns: 1fr;
                      }
                    }

                    .t2b-calc-ahorro .card {
                      background: var(--card);
                      border: 1px solid var(--line);
                      border-radius: 20px;
                      box-shadow: ${isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : '0 8px 22px rgba(2, 6, 23, 0.05)'};
                      overflow: hidden;
                    }

                    .t2b-calc-ahorro .head {
                      padding: 20px 24px;
                      border-bottom: 1px solid var(--line);
                      background: ${isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'linear-gradient(0deg, var(--soft), #fff)'};
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      gap: 8px;
                    }

                    .t2b-calc-ahorro .head h2 {
                      margin: 0;
                      font-size: 18px;
                      color: ${isDarkMode ? 'white' : 'var(--dark)'};
                      font-weight: 700;
                    }

                    .t2b-calc-ahorro .body {
                      padding: 24px;
                    }

                    .t2b-calc-ahorro .form {
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      gap: 20px;
                    }

                    @media (max-width: 680px) {
                      .t2b-calc-ahorro .form {
                        grid-template-columns: 1fr;
                      }
                    }

                    .t2b-calc-ahorro label {
                      display: block;
                      font-size: 13px;
                      font-weight: 600;
                      margin-bottom: 8px;
                      color: ${isDarkMode ? '#cbd5e1' : 'var(--dark)'};
                    }

                    .t2b-calc-ahorro input,
                    .t2b-calc-ahorro select {
                      width: 100%;
                      padding: 12px 16px;
                      border: 1px solid var(--line);
                      border-radius: 12px;
                      font-size: 15px;
                      background: ${isDarkMode ? '#0f172a' : '#fff'};
                      color: ${isDarkMode ? 'white' : 'var(--dark)'};
                      transition: all 0.2s;
                    }

                    .t2b-calc-ahorro input:focus,
                    .t2b-calc-ahorro select:focus {
                      outline: none;
                      border-color: var(--teal);
                      box-shadow: ${isDarkMode ? '0 0 0 4px rgba(14, 165, 233, 0.1)' : '0 0 0 4px rgba(37, 99, 235, 0.12)'};
                    }

                    .t2b-calc-ahorro .row {
                      grid-column: 1 / -1;
                    }

                    .t2b-calc-ahorro .hint {
                      font-size: 12px;
                      color: var(--muted);
                      margin-top: 8px;
                      line-height: 1.5;
                    }

                    .t2b-calc-ahorro .btns {
                      display: flex;
                      gap: 12px;
                      flex-wrap: wrap;
                      margin-top: 24px;
                    }

                    .t2b-calc-ahorro .btn {
                      padding: 12px 20px;
                      border-radius: 12px;
                      border: 1px solid var(--line);
                      background: ${isDarkMode ? 'var(--soft)' : '#fff'};
                      color: ${isDarkMode ? 'white' : 'var(--dark)'};
                      font-weight: 600;
                      cursor: pointer;
                      font-size: 14px;
                      transition: all 0.2s;
                    }

                    .t2b-calc-ahorro .btn:hover {
                      background: ${isDarkMode ? '#333' : '#f8fafc'};
                    }

                    .t2b-calc-ahorro .btn.primary {
                      background: ${isDarkMode ? 'white' : 'var(--dark)'};
                      color: ${isDarkMode ? '#0f172a' : '#fff'};
                      border-color: ${isDarkMode ? 'white' : 'var(--dark)'};
                    }
                    
                    .t2b-calc-ahorro .btn.primary:hover {
                      background: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
                    }

                    .t2b-calc-ahorro .btn.teal {
                      background: var(--teal);
                      color: white;
                      border-color: var(--teal);
                    }
                    
                    .t2b-calc-ahorro .btn.teal:hover {
                      filter: brightness(1.1);
                    }

                    .t2b-calc-ahorro .btn:disabled {
                      opacity: 0.4;
                      cursor: not-allowed;
                    }

                    .t2b-calc-ahorro .pill {
                      font-size: 12px;
                      font-weight: 700;
                      padding: 6px 12px;
                      border-radius: 999px;
                      border: 1px solid var(--line);
                      color: ${isDarkMode ? 'var(--teal)' : 'var(--muted)'};
                      background: ${isDarkMode ? 'rgba(14, 165, 233, 0.1)' : '#fff'};
                      white-space: nowrap;
                    }

                    .t2b-calc-ahorro .kpis {
                      display: grid;
                      gap: 12px;
                    }

                    .t2b-calc-ahorro .kpi {
                      border: 1px solid var(--line);
                      border-radius: 16px;
                      padding: 20px;
                      background: ${isDarkMode ? 'rgba(255, 255, 255, 0.02)' : ' #fff'};
                      transition: transform 0.2s;
                    }
                    
                    .t2b-calc-ahorro .kpi:hover {
                      transform: translateY(-2px);
                      background: ${isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#fff'};
                    }

                    .t2b-calc-ahorro .kpi .name {
                      font-size: 11px;
                      color: var(--muted);
                      font-weight: 700;
                      text-transform: uppercase;
                      letter-spacing: 0.1em;
                    }

                    .t2b-calc-ahorro .kpi .val {
                      font-size: 26px;
                      font-weight: 800;
                      margin-top: 8px;
                      color: ${isDarkMode ? 'white' : 'var(--dark)'};
                    }

                    .t2b-calc-ahorro .kpi .sub {
                      font-size: 12px;
                      color: var(--muted);
                      margin-top: 6px;
                    }

                    .t2b-calc-ahorro .note {
                      margin-top: 16px;
                      padding: 16px;
                      border-radius: 12px;
                      border: 1px dashed var(--line);
                      font-size: 13px;
                      color: var(--muted);
                      line-height: 1.6;
                      background: rgba(255, 255, 255, 0.01);
                    }

                    .t2b-calc-ahorro .table-wrap {
                      overflow: auto;
                      border: 1px solid var(--line);
                      border-radius: 16px;
                      background: ${isDarkMode ? 'transparent' : '#fff'};
                    }

                    .t2b-calc-ahorro table {
                      border-collapse: collapse;
                      width: 100%;
                      min-width: 920px;
                      font-size: 14px;
                    }

                    .t2b-calc-ahorro th,
                    .t2b-calc-ahorro td {
                      padding: 14px;
                      border-bottom: 1px solid var(--line);
                      text-align: right;
                      white-space: nowrap;
                      color: ${isDarkMode ? '#e2e8f0' : 'var(--dark)'};
                    }

                    .t2b-calc-ahorro th {
                      background: ${isDarkMode ? '#0f172a' : 'var(--dark)'};
                      color: white;
                      position: sticky;
                      top: 0;
                      font-size: 12px;
                      text-transform: uppercase;
                      letter-spacing: 0.05em;
                      font-weight: 700;
                    }

                    .t2b-calc-ahorro th:first-child,
                    .t2b-calc-ahorro td:first-child {
                      text-align: center;
                    }

                    .t2b-calc-ahorro tr:hover td {
                      background: rgba(255, 255, 255, 0.02);
                    }

                    .t2b-calc-ahorro tr:nth-child(even) td {
                      background: ${isDarkMode ? 'transparent' : '#fbfdff'};
                    }

                    .t2b-calc-ahorro .footer-calc {
                      margin-top: 32px;
                      text-align: center;
                      font-size: 13px;
                      color: var(--muted);
                    }
                    
                    .t2b-theme-toggle {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: rgba(255,255,255,0.1);
                        border: 1px solid rgba(255,255,255,0.2);
                        padding: 8px;
                        border-radius: 10px;
                        cursor: pointer;
                        color: white;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 12px;
                        font-weight: 600;
                        transition: all 0.2s;
                        z-index: 10;
                    }
                    
                    .t2b-theme-toggle:hover {
                        background: rgba(255,255,255,0.2);
                    }

                    @media print {
                      .t2b-calc-ahorro {
                        --bg: #fff;
                        --dark: #000;
                        --line: #ddd;
                        --card: #fff;
                        color: #000;
                      }
                      .t2b-calc-ahorro input, .t2b-calc-ahorro select, .t2b-calc-ahorro .btn, .t2b-theme-toggle {
                        display: none;
                      }
                      .Navbar, header, footer {
                        display: none !important;
                      }
                    }
                ` }} />

        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedSection>
            <div className="t2b-calc-ahorro">
              <div className="wrap">
                <div className="hero">
                  <button
                    className="t2b-theme-toggle"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
                  </button>
                  <h1>Calculadora de crecimiento de ahorros</h1>
                  <p>Proyección con monto inicial + ahorro mensual + tasa anual. Incluye tabla anual del avance.</p>
                </div>

                <div className="grid">
                  <div className="card">
                    <div className="head">
                      <h2>Datos del ahorro</h2>
                      <span className="pill">Tasa mensual: {results ? pctFmt(results.monthlyRate) : "-"}</span>
                    </div>
                    <div className="body">
                      <div className="form">
                        <div>
                          <label>Monto inicial ({currency === "USD" ? "$" : "L"})</label>
                          <input
                            type="number"
                            value={initialAmount}
                            onChange={(e) => setInitialAmount(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <label>Ahorro mensual ({currency === "USD" ? "$" : "L"})</label>
                          <input
                            type="number"
                            value={monthlySave}
                            onChange={(e) => setMonthlySave(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <label>Tasa anual (%)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={annualRate}
                            onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                          />
                          <div className="hint">Ejemplo: cuenta de ahorro, depósito, cooperativa, etc.</div>
                        </div>
                        <div>
                          <label>Tiempo (años)</label>
                          <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <label>¿Cuándo agregas el ahorro mensual?</label>
                          <select
                            value={contribMoment}
                            onChange={(e) => setContribMoment(e.target.value)}
                          >
                            <option value="end">Al final de cada mes</option>
                            <option value="begin">Al inicio de cada mes</option>
                          </select>
                        </div>
                        <div>
                          <label>Moneda visual</label>
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                          >
                            <option value="HNL">Lempiras (HNL)</option>
                            <option value="USD">Dólares (USD)</option>
                          </select>
                        </div>
                        <div className="row">
                          <div className="hint">La proyección usa capitalización mensual (interés compuesto mensual) para una proyección más realista.</div>
                        </div>
                      </div>
                      <div className="btns">
                        <button className="btn" onClick={clearAll}>Limpiar</button>
                        <button className="btn primary" onClick={calcProjection}>Calcular</button>
                        <button className="btn teal" onClick={downloadCSV} disabled={!results}>Descargar tabla (CSV)</button>
                        <button className="btn" onClick={() => window.print()} disabled={!results}>Imprimir / PDF</button>
                      </div>
                      <div className="note"><b>Tip para tu taller:</b> Úsala para enseñar el impacto de <b>aportar más</b> vs. <b>esperar más tiempo</b> y el efecto del interés compuesto.</div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="head">
                      <h2>Resultados</h2>
                      <span className="pill">TEA: {results ? pctFmt(results.tea) : "-"}</span>
                    </div>
                    <div className="body">
                      <div className="kpis">
                        <div className="kpi">
                          <div className="name">Valor final estimado</div>
                          <div className="val">{results ? moneyFmt(results.finalVal) : "-"}</div>
                          <div className="sub">Saldo acumulado al final del periodo.</div>
                        </div>
                        <div className="kpi">
                          <div className="name">Total aportado</div>
                          <div className="val">{results ? moneyFmt(results.contribVal) : "-"}</div>
                          <div className="sub">Monto inicial + aportes mensuales.</div>
                        </div>
                        <div className="kpi">
                          <div className="name">Interés ganado</div>
                          <div className="val">{results ? moneyFmt(results.interestVal) : "-"}</div>
                          <div className="sub">Valor final menos aportes.</div>
                        </div>
                        <div className="kpi">
                          <div className="name">Promedio anual</div>
                          <div className="val">{results ? moneyFmt(results.avgVal) : "-"}</div>
                          <div className="sub">Referencia: valor final / años.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ gridColumn: "1 / -1", marginTop: "16px" }}>
                    <div className="head">
                      <h2>Tabla anual de avance del ahorro</h2>
                      <span className="pill">
                        {results ? `${years} años - ${moneyFmt(initialAmount)} inicial - ${moneyFmt(monthlySave)}/mes - ${pctFmt(annualRate / 100)} anual` : "-"}
                      </span>
                    </div>
                    <div className="body">
                      <div className="table-wrap">
                        <table>
                          <thead>
                            <tr>
                              <th>Año</th>
                              <th>Saldo inicial del año</th>
                              <th>Aportes del año</th>
                              <th>Interés del año</th>
                              <th>Saldo final del año</th>
                              <th>Aporte acumulado</th>
                              <th>Interés acumulado</th>
                              <th>Rendimiento vs aporte</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results?.annualRows.map((r, idx) => (
                              <tr key={idx}>
                                <td>{r.year}</td>
                                <td>{moneyFmt(r.yearStart)}</td>
                                <td>{moneyFmt(r.contribYear)}</td>
                                <td>{moneyFmt(r.interestYear)}</td>
                                <td>{moneyFmt(r.endBal)}</td>
                                <td>{moneyFmt(r.totalContrib)}</td>
                                <td>{moneyFmt(r.totalInterest)}</td>
                                <td>{pctFmt(r.yieldPct)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="note">La tabla se muestra anual, pero el cálculo se hace por mes (interés compuesto mensual).</div>
                    </div>
                  </div>
                </div>

                <div className="footer-calc">© T2B Team | Calculadora de ahorro</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  );
}

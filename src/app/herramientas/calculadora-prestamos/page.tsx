"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Moon, Sun } from "lucide-react";

const fmtHNL = (n: number, currency: string = "HNL") => {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat('es-HN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2
  }).format(n);
};

const fmtPct = (n: number) => {
  if (!isFinite(n)) return "—";
  return (n * 100).toFixed(4) + "%";
};

// PMT formula for fixed-rate amortization
function pmt(rate: number, nper: number, pv: number) {
  if (rate === 0) return pv / nper;
  const r = rate;
  return (r * pv) / (1 - Math.pow(1 + r, -nper));
}

function addMonths(date: Date, m: number) {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + m);
  if (d.getDate() < day) d.setDate(0);
  return d;
}

function toISODate(d: Date) {
  const pad = (x: number) => String(x).padStart(2, '0');
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

function toDisplayDate(d: Date) {
  const pad = (x: number) => String(x).padStart(2, '0');
  return pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + d.getFullYear();
}

export default function CalculadoraPrestamos() {
  const [loanType, setLoanType] = useState("Préstamo Personal");
  const [annualRate, setAnnualRate] = useState(19);
  const [amount, setAmount] = useState(100000);
  const [months, setMonths] = useState(36);
  const [startDate, setStartDate] = useState(toISODate(new Date()));
  const [showSchedule, setShowSchedule] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [results, setResults] = useState<{
    payment: number;
    totalPaid: number;
    totalInt: number;
    tea: number;
    monthlyRate: number;
    rows: Array<{
      num: number;
      date: string;
      start: number;
      pay: number;
      interest: number;
      principal: number;
      end: number;
      notes: string;
    }>;
  } | null>(null);

  const calc = useCallback(() => {
    const principal = parseFloat(amount.toString() || "0");
    const n = parseInt(months.toString() || "0", 10);
    const ar = parseFloat(annualRate.toString() || "0") / 100;
    const mr = ar / 12;

    if (!(principal > 0) || !(n > 0) || !(ar >= 0)) {
      alert("Revisa los datos: monto y plazo deben ser mayores que 0.");
      return;
    }

    const tea = Math.pow(1 + mr, 12) - 1;
    const payment = pmt(mr, n, principal);
    const totalPaid = payment * n;
    const totalInt = totalPaid - principal;

    const baseDate = startDate ? new Date(startDate + "T00:00:00") : new Date();
    let balance = principal;
    const rows = [];
    for (let i = 1; i <= n; i++) {
      const dt = addMonths(baseDate, i - 1);
      const interest = balance * mr;
      let principalPay = payment - interest;
      if (principalPay > balance) principalPay = balance;
      const endBal = Math.max(0, balance - principalPay);
      rows.push({
        num: i,
        date: toDisplayDate(dt),
        start: balance,
        pay: payment,
        interest: interest,
        principal: principalPay,
        end: endBal,
        notes: ""
      });
      balance = endBal;
    }

    setResults({
      payment,
      totalPaid,
      totalInt,
      tea,
      monthlyRate: mr,
      rows
    });
  }, [amount, months, annualRate, startDate, loanType]);

  const clearAll = () => {
    setLoanType("Préstamo Personal");
    setAnnualRate(19);
    setAmount(100000);
    setMonths(36);
    setStartDate(toISODate(new Date()));
    setResults(null);
    setShowSchedule(false);
  };

  const downloadCSV = () => {
    if (!results) return;
    const header = ["#", "Fecha", "Saldo inicial", "Cuota", "Interés", "Capital", "Saldo final", "Notas"];
    const lines = [header.join(",")];
    results.rows.forEach(r => {
      const line = [
        r.num,
        `"${r.date}"`,
        r.start.toFixed(2),
        r.pay.toFixed(2),
        r.interest.toFixed(2),
        r.principal.toFixed(2),
        r.end.toFixed(2),
        `"${(r.notes || "").replace(/"/g, '""')}"`
      ].join(",");
      lines.push(line);
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = "calendario_amortizacion_" + loanType.replace(/[^\w]+/g, "_").toLowerCase() + ".csv";
    a.download = safeName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    calc();
  }, [calc]);

  return (
    <>
      <Navbar />
      <main className={`flex-1 pt-32 pb-24 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f8fafc]'}`}>
        <style dangerouslySetInnerHTML={{
          __html: `
                    .t2b-calc-prestamo {
                      --blue: ${isDarkMode ? '#3b82f6' : '#1d4ed8'};
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

                    .t2b-calc-prestamo * {
                      box-sizing: border-box;
                    }

                    .t2b-calc-prestamo .wrap {
                      max-width: 1100px;
                      margin: 0 auto;
                      padding: 26px 16px 32px;
                    }

                    .t2b-calc-prestamo .hero {
                      background: ${isDarkMode ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, var(--blue), #2563eb)'};
                      color: #fff;
                      border-radius: 20px;
                      padding: 32px;
                      box-shadow: ${isDarkMode ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 12px 28px rgba(2,6,23,.12)'};
                      margin-bottom: 32px;
                      border: 1px solid var(--line);
                      position: relative;
                      overflow: hidden;
                    }

                    .t2b-calc-prestamo .hero::after {
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

                    .t2b-calc-prestamo .hero h1 {
                      margin: 0;
                      font-size: 32px;
                      color: white;
                      font-weight: 800;
                      letter-spacing: -0.025em;
                    }

                    .t2b-calc-prestamo .hero p {
                      margin: 12px 0 0;
                      color: ${isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
                      font-size: 16px;
                    }

                    .t2b-calc-prestamo .grid {
                      display: grid;
                      grid-template-columns: 1.05fr 0.95fr;
                      gap: 24px;
                    }

                    @media (max-width: 900px) {
                      .t2b-calc-prestamo .grid {
                        grid-template-columns: 1fr;
                      }
                    }

                    .t2b-calc-prestamo .card {
                      background: var(--card);
                      border: 1px solid var(--line);
                      border-radius: 20px;
                      box-shadow: ${isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : '0 8px 22px rgba(2,6,23,.06)'};
                      overflow: hidden;
                    }

                    .t2b-calc-prestamo .head {
                      padding: 20px 24px;
                      border-bottom: 1px solid var(--line);
                      background: ${isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'linear-gradient(0deg, var(--soft), #fff)'};
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      gap: 8px;
                    }

                    .t2b-calc-prestamo .head h2 {
                      margin: 0;
                      font-size: 18px;
                      color: ${isDarkMode ? 'white' : 'var(--dark)'};
                      font-weight: 700;
                    }

                    .t2b-calc-prestamo .body {
                      padding: 24px;
                    }

                    .t2b-calc-prestamo .form {
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      gap: 20px;
                    }

                    @media (max-width: 680px) {
                      .t2b-calc-prestamo .form {
                        grid-template-columns: 1fr;
                      }
                    }

                    .t2b-calc-prestamo label {
                      display: block;
                      font-size: 13px;
                      font-weight: 600;
                      margin-bottom: 8px;
                      color: ${isDarkMode ? '#cbd5e1' : 'var(--dark)'};
                    }

                    .t2b-calc-prestamo input,
                    .t2b-calc-prestamo select {
                      width: 100%;
                      padding: 12px 16px;
                      border: 1px solid var(--line);
                      border-radius: 12px;
                      font-size: 15px;
                      background: ${isDarkMode ? '#0f172a' : '#fff'};
                      color: ${isDarkMode ? 'white' : 'var(--dark)'};
                      transition: all 0.2s;
                    }

                    .t2b-calc-prestamo input:focus,
                    .t2b-calc-prestamo select:focus {
                      outline: none;
                      border-color: var(--blue);
                      box-shadow: ${isDarkMode ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : '0 0 0 4px rgba(29,78,216,.12)'};
                    }

                    .t2b-calc-prestamo .row {
                      grid-column: 1 / -1;
                    }

                    .t2b-calc-prestamo .hint {
                      font-size: 12px;
                      color: var(--muted);
                      margin-top: 8px;
                      line-height: 1.5;
                    }

                    .t2b-calc-prestamo .btns {
                      display: flex;
                      gap: 12px;
                      flex-wrap: wrap;
                      margin-top: 24px;
                    }

                    .t2b-calc-prestamo .btn {
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

                    .t2b-calc-prestamo .btn:hover {
                      background: ${isDarkMode ? '#333' : '#f8fafc'};
                    }

                    .t2b-calc-prestamo .btn.primary {
                      background: ${isDarkMode ? 'white' : 'var(--dark)'};
                      color: ${isDarkMode ? '#0f172a' : '#fff'};
                      border-color: ${isDarkMode ? 'white' : 'rgba(15,23,42,.9)'};
                    }
                    
                    .t2b-calc-prestamo .btn.primary:hover {
                      background: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
                    }

                    .t2b-calc-prestamo .btn.teal {
                      background: var(--teal);
                      color: white;
                      border-color: var(--teal);
                    }
                    
                    .t2b-calc-prestamo .btn.teal:hover {
                      filter: brightness(1.1);
                    }

                    .t2b-calc-prestamo .btn:disabled {
                      opacity: 0.4;
                      cursor: not-allowed;
                    }

                    .t2b-calc-prestamo .pill {
                      font-size: 12px;
                      font-weight: 700;
                      padding: 6px 12px;
                      border-radius: 999px;
                      border: 1px solid var(--line);
                      color: ${isDarkMode ? 'var(--blue)' : 'var(--muted)'};
                      background: ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : '#fff'};
                      white-space: nowrap;
                    }

                    .t2b-calc-prestamo .kpis {
                      display: grid;
                      gap: 12px;
                    }

                    .t2b-calc-prestamo .kpi {
                      border: 1px solid var(--line);
                      border-radius: 16px;
                      padding: 20px;
                      background: ${isDarkMode ? 'rgba(255, 255, 255, 0.02)' : ' #fff'};
                      transition: transform 0.2s;
                    }
                    
                    .t2b-calc-prestamo .kpi:hover {
                      transform: translateY(-2px);
                      background: ${isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#fff'};
                    }

                    .t2b-calc-prestamo .kpi .name {
                      font-size: 11px;
                      color: var(--muted);
                      font-weight: 700;
                      text-transform: uppercase;
                      letter-spacing: 0.1em;
                    }

                    .t2b-calc-prestamo .kpi .val {
                      font-size: 26px;
                      font-weight: 800;
                      margin-top: 8px;
                      color: ${isDarkMode ? 'white' : 'var(--dark)'};
                    }

                    .t2b-calc-prestamo .kpi .sub {
                      font-size: 12px;
                      color: var(--muted);
                      margin-top: 6px;
                    }

                    .t2b-calc-prestamo .note {
                      margin-top: 16px;
                      padding: 16px;
                      border-radius: 12px;
                      border: 1px dashed var(--line);
                      font-size: 13px;
                      color: var(--muted);
                      line-height: 1.6;
                      background: rgba(255, 255, 255, 0.01);
                    }

                    .t2b-calc-prestamo .table-wrap {
                      overflow: auto;
                      border: 1px solid var(--line);
                      border-radius: 16px;
                      background: ${isDarkMode ? 'transparent' : '#fff'};
                    }

                    .t2b-calc-prestamo table {
                      border-collapse: collapse;
                      width: 100%;
                      min-width: 920px;
                      font-size: 14px;
                    }

                    .t2b-calc-prestamo th,
                    .t2b-calc-prestamo td {
                      padding: 14px;
                      border-bottom: 1px solid var(--line);
                      text-align: right;
                      white-space: nowrap;
                      color: ${isDarkMode ? '#e2e8f0' : 'var(--dark)'};
                    }

                    .t2b-calc-prestamo th {
                      background: ${isDarkMode ? '#0f172a' : 'var(--dark)'};
                      color: white;
                      position: sticky;
                      top: 0;
                      font-size: 12px;
                      text-transform: uppercase;
                      letter-spacing: 0.05em;
                      font-weight: 700;
                    }

                    .t2b-calc-prestamo th:first-child,
                    .t2b-calc-prestamo td:first-child {
                      text-align: center;
                    }

                    .t2b-calc-prestamo tr:hover td {
                      background: rgba(255, 255, 255, 0.02);
                    }
                    
                    .t2b-calc-prestamo tr:nth-child(even) td {
                        background: ${isDarkMode ? 'transparent' : '#fbfdff'};
                    }

                    .t2b-calc-prestamo .footer-calc {
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
                      .t2b-calc-prestamo {
                        --bg: #fff;
                        --dark: #000;
                        --line: #ddd;
                        --card: #fff;
                        color: #000;
                      }
                      .t2b-calc-prestamo input, .t2b-calc-prestamo select, .t2b-calc-prestamo .btn, .t2b-theme-toggle {
                        display: none;
                      }
                    }
                ` }} />

        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedSection>
            <div className="t2b-calc-prestamo">
              <div className="wrap">
                <div className="hero">
                  <button
                    className="t2b-theme-toggle"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
                  </button>
                  <h1>Calcula la cuota de tu préstamo</h1>
                  <p>Herramienta diseñada para estimar cuotas fijas y calendario de amortización.</p>
                </div>

                <div className="grid">
                  <div className="card">
                    <div className="head">
                      <h2>Datos del préstamo</h2>
                      <span className="pill">Tasa mensual: {results ? fmtPct(results.monthlyRate) : "—"}</span>
                    </div>
                    <div className="body">
                      <div className="form">
                        <div className="row">
                          <label>Tipo de préstamo</label>
                          <select value={loanType} onChange={(e) => setLoanType(e.target.value)}>
                            <option>Préstamo Personal</option>
                            <option>Préstamo Comercial</option>
                            <option>Préstamo Hipotecario</option>
                            <option>Préstamo Automotriz</option>
                            <option>Tarjeta de Crédito (saldo financiado)</option>
                            <option>Cooperativa - Consumo</option>
                            <option>Gobierno - RAP / BANHPROVI (Vivienda)</option>
                          </select>
                        </div>
                        <div>
                          <label>Monto solicitado (L)</label>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
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
                        </div>
                        <div>
                          <label>Plazo (meses)</label>
                          <input
                            type="number"
                            value={months}
                            onChange={(e) => setMonths(parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <label>Fecha de inicio</label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="btns">
                        <button className="btn" onClick={clearAll}>Limpiar</button>
                        <button className="btn primary" onClick={calc}>Calcular</button>
                        <button className="btn teal" onClick={() => setShowSchedule(!showSchedule)}>
                          {showSchedule ? "Ocultar calendario" : "Ver calendario"}
                        </button>
                      </div>

                      <div className="note">
                        <b>Nota:</b> Esta calculadora usa amortización estándar (cuota fija). En tasa variable, la cuota o el interés cambian cuando cambie la tasa.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="head">
                      <h2>Resultados</h2>
                      <span className="pill">TEA aprox: {results ? (results.tea * 100).toFixed(2) + "%" : "—"}</span>
                    </div>
                    <div className="body">
                      <div className="kpis">
                        <div className="kpi">
                          <div className="name">Cuota mensual estimada</div>
                          <div className="val">{results ? fmtHNL(results.payment) : "—"}</div>
                          <div className="sub">Pago mensual (cuota fija).</div>
                        </div>
                        <div className="kpi">
                          <div className="name">Total pagado</div>
                          <div className="val">{results ? fmtHNL(results.totalPaid) : "—"}</div>
                          <div className="sub">Cuota × meses.</div>
                        </div>
                        <div className="kpi">
                          <div className="name">Total intereses</div>
                          <div className="val">{results ? fmtHNL(results.totalInt) : "—"}</div>
                          <div className="sub">Total pagado − monto.</div>
                        </div>
                      </div>

                      <div className="btns">
                        <button className="btn" onClick={downloadCSV} disabled={!results}>Descargar CSV</button>
                        <button className="btn" onClick={() => window.print()} disabled={!results}>Imprimir / PDF</button>
                      </div>
                    </div>
                  </div>

                  {showSchedule && results && (
                    <div className="card" style={{ gridColumn: "1 / -1", marginTop: "24px" }}>
                      <div className="head">
                        <h2>Calendario de amortización</h2>
                        <span className="pill">{loanType} · {months} meses · {fmtHNL(amount)}</span>
                      </div>
                      <div className="body">
                        <div className="table-wrap">
                          <table>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Saldo inicial</th>
                                <th>Cuota</th>
                                <th>Interés</th>
                                <th>Capital</th>
                                <th>Saldo final</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.rows.map((r, idx) => (
                                <tr key={idx}>
                                  <td>{r.num}</td>
                                  <td>{r.date}</td>
                                  <td>{fmtHNL(r.start)}</td>
                                  <td>{fmtHNL(r.pay)}</td>
                                  <td>{fmtHNL(r.interest)}</td>
                                  <td>{fmtHNL(r.principal)}</td>
                                  <td>{fmtHNL(r.end)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="footer-calc">© T2B Team | Calculadora de préstamos</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  );
}

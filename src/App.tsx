import { useMemo, useState } from "react";
import { Search, MapPin, Clapperboard, Ticket, CalendarDays, ArrowUpRight, Radar } from "lucide-react";

type Showtime = {
  id: number; title: string; genre: string; rating: string; network: string;
  cinema: string; city: string; times: string[]; palette: string; url: string;
};

// Dane poniżej są demonstracyjne — nie są prawdziwym repertuarem.
const demo: Showtime[] = [
  { id: 1, title: "Ostatni horyzont", genre: "Sci-fi · Przygodowy", rating: "7,8", network: "Cinema City", cinema: "Cinema City", city: "Warszawa", times: ["16:20", "18:45", "21:10"], palette: "blue", url: "https://www.cinema-city.pl/" },
  { id: 2, title: "Między nami", genre: "Dramat · Romans", rating: "7,2", network: "Multikino", cinema: "Multikino", city: "Kraków", times: ["15:30", "18:00", "20:30"], palette: "rose", url: "https://www.multikino.pl/" },
  { id: 3, title: "Leśna tajemnica", genre: "Thriller · Kryminał", rating: "7,5", network: "Helios", cinema: "Helios", city: "Katowice", times: ["17:15", "19:40", "22:00"], palette: "green", url: "https://helios.pl/" },
  { id: 4, title: "Ostatni horyzont", genre: "Sci-fi · Przygodowy", rating: "7,8", network: "Helios", cinema: "Helios", city: "Bielsko-Biała", times: ["16:00", "19:15"], palette: "blue", url: "https://helios.pl/" },
  { id: 5, title: "Między nami", genre: "Dramat · Romans", rating: "7,2", network: "Cinema City", cinema: "Cinema City", city: "Wrocław", times: ["14:50", "18:20"], palette: "rose", url: "https://www.cinema-city.pl/" },
  { id: 6, title: "Leśna tajemnica", genre: "Thriller · Kryminał", rating: "7,5", network: "Multikino", cinema: "Multikino", city: "Gdańsk", times: ["17:00", "20:10"], palette: "green", url: "https://www.multikino.pl/" }
];
const networks = ["Wszystkie kina", "Cinema City", "Multikino", "Helios"];
const cities = ["Cała Polska", "Warszawa", "Kraków", "Katowice", "Bielsko-Biała", "Wrocław", "Gdańsk", "Poznań", "Łódź"];

export default function App() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Cała Polska");
  const [day, setDay] = useState("Dziś");
  const [network, setNetwork] = useState("Wszystkie kina");
  const [selected, setSelected] = useState<string | null>(null);
  const results = useMemo(() => demo.filter(item => {
    const text = (item.title + " " + item.genre + " " + item.network + " " + item.city).toLocaleLowerCase("pl");
    return text.includes(query.trim().toLocaleLowerCase("pl")) &&
      (city === "Cała Polska" || item.city === city) &&
      (network === "Wszystkie kina" || item.network === network);
  }), [query, city, network]);

  return <main className="shell">
    <header className="topbar">
      <a className="brand" href="#" aria-label="KinoRadar — strona główna"><span className="logo"><Radar size={25} /></span><span>KinoRadar<small>Całe kino. Jeden adres.</small></span></a>
      <a className="toplink" href="#jak-dziala">Jak to działa?</a>
    </header>
    <section className="hero">
      <div><p className="eyebrow">Twój plan na wieczór</p><h1>Znajdź seans.<br/><em>Nie trać czasu.</em></h1><p className="intro">Repertuary kin w jednym miejscu. Porównaj godziny, wybierz kino i przejdź do oficjalnego zakupu biletu.</p></div>
      <div className="hero-art"><Clapperboard size={58} strokeWidth={1.4}/><strong>Wielki ekran.<br/>Dobry plan.</strong><span>Jeden wyszukiwacz, wiele kin.</span></div>
    </section>
    <section className="search-panel" aria-label="Wyszukiwarka repertuaru">
      <label className="search-field"><span>FILM LUB TYTUŁ</span><div><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Np. komedia, thriller..." /></div></label>
      <label className="search-field"><span>MIASTO</span><div><MapPin size={18}/><select value={city} onChange={e => setCity(e.target.value)}>{cities.map(c => <option key={c}>{c}</option>)}</select></div></label>
      <label className="search-field"><span>KIEDY?</span><div><CalendarDays size={18}/><select value={day} onChange={e => setDay(e.target.value)}><option>Dziś</option><option>Jutro</option><option>Weekend</option></select></div></label>
    </section>
    <section className="results-section">
      <div className="section-title"><div><h2>{city === "Cała Polska" ? "Seanse do odkrycia" : "Seanse — " + city}</h2><p>Termin: {day} · {results.length} wyników demonstracyjnych</p></div><span className="demo-badge">TRYB DEMO</span></div>
      <div className="filters">{networks.map(n => <button key={n} className={network === n ? "filter active" : "filter"} onClick={() => setNetwork(n)}>{n}</button>)}</div>
      <div className="movie-grid">
        {results.map(m => <article className="movie-card" key={m.id}>
          <div className={"poster " + m.palette}><span>{m.title}</span><small>PLAKAT DEMONSTRACYJNY</small></div>
          <div className="movie-info"><div className="meta">{m.genre} <b>★ {m.rating}</b></div><h3>{m.title}</h3>
            <div className="times">{m.times.map(time => <button key={time} className={selected === m.id + "-" + time ? "time selected" : "time"} onClick={() => setSelected(m.id + "-" + time)}>{time}</button>)}</div>
            <div className="cinema-row"><div><strong>{m.cinema}</strong><small>{m.city} · {day}</small></div><a className="buy" href={m.url} target="_blank" rel="noreferrer">Kup bilet <ArrowUpRight size={15}/></a></div>
            {selected && selected.startsWith(m.id + "-") && <p className="selection"><Ticket size={14}/> Wybrano przykładową godzinę {selected.substring(selected.indexOf("-") + 1)}. Link prowadzi do strony sieci, nie do konkretnego seansu.</p>}
          </div>
        </article>)}
        {results.length === 0 && <div className="empty">Nie znaleziono przykładowych wyników. Zmień wyszukiwanie lub filtry.</div>}
      </div>
      <p className="notice"><b>Ważne:</b> repertuary i godziny są demonstracyjne. Przed publikacją podłączymy zweryfikowane źródła danych oraz linki do konkretnych seansów.</p>
    </section>
    <section id="jak-dziala" className="how"><div className="section-title"><div><h2>Kino bez komplikacji</h2><p>Od wyszukania filmu do zakupu w kilku krokach.</p></div></div>
      <div className="feature-grid"><div className="feature"><Search/><b>Jedno wyszukiwanie</b><p>Szukaj po filmie, mieście lub nazwie kina.</p></div><div className="feature"><CalendarDays/><b>Porównuj godziny</b><p>Sprawdź seanse w różnych sieciach i wybierz dogodną godzinę.</p></div><div className="feature"><Ticket/><b>Kupuj u źródła</b><p>Zakup finalizujesz na oficjalnej stronie operatora kina.</p></div></div>
    </section>
    <footer>© 2026 KinoRadar · Prototyp MVP · Repertuary demonstracyjne</footer>
  </main>;
}
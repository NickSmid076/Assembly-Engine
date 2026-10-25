import { auditCta } from "../cta";

export default `
<p>Achter betalingen aan gaan is werk waar bijna niemand zin in heeft. Dus blijft het liggen tot het maandeinde, of tot iemand op kantoor er een middag voor vrijmaakt. Ondertussen staat het geld uit. Een vast herinneringsschema, met een betaallink en in uw eigen toon, lost het grootste deel daarvan op. Vaak kan dat met de software die u al heeft.</p>

<h2>Hoe groot het probleem is</h2>
<p>De MKB Barometer 2025 van Exact (897 ondervraagde ondernemers) geeft een helder beeld (<a href="https://files.exact.com/static/web/pdf/mkb-barometer/2025/NL_All-mkb-barometer-2025.pdf">Exact MKB Barometer 2025</a>):</p>
<ul>
<li>90% van het mkb heeft te maken met late betalingen;</li>
<li>gemiddeld wordt 14,2% van de facturen te laat betaald, en 2,4% helemaal niet;</li>
<li>de gemiddelde afgesproken betaaltermijn is 27,7 dagen;</li>
<li>18% loopt daardoor jaarlijks €20.000 of meer mis;</li>
<li>klanten op tijd laten betalen is de grootste uitdaging in de financiële administratie, genoemd door 34%.</li>
</ul>
<p>Een kanttekening: elders in hetzelfde rapport staat "bijna 3%" voor facturen die nooit worden betaald. Wij houden de 2,4% aan.</p>

<h2>Welke betaaltermijn u mag afspreken</h2>
<p>Sinds 1 juli 2023 moeten grote bedrijven hun mkb-leveranciers binnen 30 dagen betalen. Voor andere zakelijke relaties blijft een maximum van 60 dagen gelden (<a href="https://factua.nl/blogs/betalingstermijn-grootbedrijf-van-60-30-dagen-van-kracht">Factua</a>). <mark>[CHECK: status of the EU Late Payment Regulation, which may change these terms]</mark></p>
<p>De termijn die u op de factuur zet, is ook het startpunt van uw herinneringsschema. Hoe korter en duidelijker de termijn, hoe eerder u weet dat er iets moet gebeuren.</p>

<h2>Een herinneringsschema: eerste herinnering, tweede herinnering, aanmaning</h2>
<p>Hieronder een voorbeeldschema voor zakelijke klanten. Het is een uitgangspunt dat u aan uw eigen klanten aanpast; de wet schrijft deze dagen niet voor.</p>
<figure class="wp-block-table"><table><thead><tr><th>Moment (voorbeeld)</th><th>Bericht</th><th>Toon</th></tr></thead><tbody>
<tr><td>3 dagen voor de vervaldatum</td><td>Vriendelijk seintje dat de factuur binnenkort vervalt, met betaallink</td><td>Service</td></tr>
<tr><td>7 dagen na de vervaldatum</td><td>Eerste herinnering, met de factuur en de betaallink</td><td>Vriendelijk, gaat uit van een vergissing</td></tr>
<tr><td>21 dagen na de vervaldatum</td><td>Tweede herinnering, met een nieuwe termijn</td><td>Zakelijk en duidelijk</td></tr>
<tr><td>35 dagen na de vervaldatum</td><td>Taak voor een collega om te bellen</td><td>Persoonlijk</td></tr>
<tr><td>Daarna</td><td>Aanmaning, eventueel met incassokosten</td><td>Formeel</td></tr>
</tbody></table></figure>
<p>Het belangrijkste is dat het schema vast is. Elke factuur volgt dezelfde route, ongeacht hoe druk het die week is. Dat voelt voor klanten ook eerlijker: niemand krijgt een strenge mail omdat iemand op kantoor toevallig een slechte dag had.</p>
<p>Over incassokosten bij zakelijke klanten moet u voorzichtig zijn. Wat u mag rekenen, hangt af van wat u heeft afgesproken en van de wet. <mark>[CHECK: whether the statutory WIK scale applies to B2B by default, whether €40 is the minimum commercial collection fee (art. 6:96 BW), and the current WIK cap; use Rijksoverheid or Ondernemersplein, not Stripe]</mark> We geven hier dus geen juridisch advies over de bedragen; laat dat zo nodig toetsen.</p>

<h2>Wat er in elke herinnering hoort</h2>
<ul>
<li>het factuurnummer, het bedrag en de oorspronkelijke vervaldatum;</li>
<li>de factuur zelf als bijlage, zodat de klant niet hoeft te zoeken;</li>
<li>de betaallink;</li>
<li>de naam en het telefoonnummer van iemand die vragen kan beantwoorden;</li>
<li>bij de tweede herinnering: een nieuwe, concrete datum.</li>
</ul>
<p>Laat dreigende taal weg in de eerste twee berichten. Wij denken dat een klant die het gewoon vergeten was, sneller betaalt na een vriendelijke mail dan na een boze. Onderzoek daarnaar hebben we niet gevonden, dus zie het als onze inschatting.</p>
<h3>Als de klant de factuur betwist</h3>
<p>Een herinneringsschema moet kunnen stoppen. Als een klant laat weten dat er iets niet klopt, moet een collega de herinneringen voor die factuur met één klik kunnen pauzeren. Anders krijgt een klant die net heeft gebeld nog een automatische aanmaning, en zo raakt een goede relatie beschadigd.</p>

<h2>Bij particulieren: de veertiendagenbrief</h2>
<p>Factureert u aan consumenten, dan gelden andere regels. Voordat u incassokosten mag rekenen, moet u een veertiendagenbrief sturen: een laatste aanmaning waarin de klant nog veertien dagen krijgt om te betalen zonder extra kosten (<a href="https://stripe.com/nl/resources/more/dutch-debt-collection-costs-act">Stripe</a>). <mark>[CHECK: veertiendagenbrief requirements against Rijksoverheid or Ondernemersplein]</mark></p>
<p>In een automatisch schema betekent dat: een aparte route voor particuliere klanten, waarin de veertiendagenbrief een vaste stap is, met de juiste tekst en datum erin. Dan kan die stap niet per ongeluk worden overgeslagen.</p>

<h2>Een betaallink, en afletteren dat vanzelf gaat</h2>
<p>Een herinnering werkt beter als betalen direct kan. Zet in elke factuur en elke herinnering een betaallink, bijvoorbeeld via Mollie of de betaalfunctie van uw boekhoudpakket. De klant klikt, betaalt, en hoeft geen IBAN of factuurnummer over te typen. <mark>[CHECK: how Mollie payment links behave (expiry, partial payments, methods)]</mark> <mark>[CHECK: the iDEAL to Wero transition timeline, if a payment method is named]</mark></p>
<p>Het tweede voordeel zit aan uw kant. Als de betaling via de link binnenkomt, kan die automatisch aan de juiste factuur worden gekoppeld. Moneybird doet dat bijvoorbeeld voor de betaalmethoden die het zelf aanbiedt (<a href="https://www.adyen.com/nl_NL/knowledge-hub/moneybird-en-adyen-een-geintegreerde-betaalrekening-voor-automatische-boekhouding">Adyen over Moneybird</a>). Dan stopt het herinneringsschema zodra er betaald is, en krijgt niemand een herinnering voor een factuur die gisteren al is voldaan.</p>
<p>Veel boekhoudpakketten hebben zelf al een herinneringsfunctie. <mark>[CHECK: the built-in reminder features in Moneybird, Exact Online and Twinfield]</mark> Vaak is het genoeg om die goed in te stellen. Wij bouwen er alleen iets omheen als u meer nodig heeft, bijvoorbeeld een belactie voor de collega, of herinneringen die rekening houden met afspraken uit uw CRM.</p>

<h2>Houd het menselijk, en weet wanneer u moet bellen</h2>
<p>Automatisch betekent hier: op tijd en elke keer. Het hoeft niet te klinken als een machine. Schrijf de teksten zelf, in de toon waarop u ook met de klant praat. Zet de naam van een echte collega onder het bericht, met een telefoonnummer.</p>
<p>Een voorbeeld van een eerste herinnering (fictief):</p>
<blockquote><p>Beste Peter, onze factuur 2026-118 van €1.240 stond op 14 oktober open. Waarschijnlijk is hij tussen de andere post beland. U kunt hier direct betalen: [betaallink]. Klopt er iets niet aan de factuur? Bel me gerust. Groet, Sanne</p><cite>Voorbeeldtekst, fictieve klant en bedragen</cite></blockquote>
<p>Ook bestuurders zien weinig in een chatbot voor dit gesprek: maar 22% denkt dat klanten liever met AI praten over een late betaling (<a href="https://www.intrum.com/press/press-releases/press-release-article/?id=40724231-127d-4c21-9211-7d598dc5f407">Intrum European Payment Report 2025</a>). Daarom zit er in het voorbeeldschema hierboven een moment waarop een mens belt. Bij een vaste klant met een goede reden voor de vertraging lost een telefoontje meer op dan de derde mail.</p>
<p>Ook met een vast schema blijven er klanten die laat betalen. Wat verandert, is dat u geen factuur meer vergeet.</p>

<h3>Uitzonderingen voor vaste klanten</h3>
<p>Sommige klanten horen in een ander schema. Een grote opdrachtgever met vaste betaalrondes, een klant met wie u een betalingsregeling heeft, of een klant die op projectbasis in termijnen betaalt. Leg die afspraken vast in uw boekhoudpakket of CRM, zodat het schema er rekening mee houdt. Dan krijgt een klant met een betalingsregeling geen herinnering voor een termijn die nog niet vervallen is.</p>

<h2>Meet zelf of het werkt</h2>
<p>We beloven geen percentage minder openstaande facturen. U kunt het wel zelf meten. Noteer voordat u begint hoeveel facturen er gemiddeld te laat zijn, en hoeveel dagen het gemiddeld duurt voordat er betaald wordt. Kijk na drie maanden opnieuw. Dan weet u wat het oplevert, gemeten bij uw eigen klanten.</p>

<h2>Is het de moeite waard voor u?</h2>
<p>Daar is geen onderzoek naar dat wij kunnen aanhalen. Onze eigen vuistregel, en meer is het niet: als iemand op uw kantoor elke maand meer dan een uur bezig is met het nalopen van openstaande facturen, of als u regelmatig merkt dat een factuur weken is blijven liggen zonder herinnering, dan loont het om het schema in te stellen.</p>
<p>Een rekenvoorbeeld met verzonnen getallen: een bedrijf verstuurt 80 facturen per maand. Als 14% daarvan te laat wordt betaald, zoals het gemiddelde uit de MKB Barometer, zijn dat ongeveer 11 facturen per maand die iemand moet nalopen. Kost dat per factuur een kwartier aan opzoeken, mailen en noteren, dan gaat het om bijna drie uur per maand. Voor de meeste bedrijven is dat genoeg reden om op zijn minst de ingebouwde herinneringen van het boekhoudpakket aan te zetten.</p>
<p>Begin met wat uw boekhoudpakket al kan. Werkt dat niet goed genoeg, dan kijken we samen wat er ontbreekt. Hoe we zo'n som maken, leest u in <a href="/nl/blog/what-a-free-automation-audit-looks-at">wat een gratis automatiseringsanalyse bekijkt</a>.</p>
` + auditCta("nl");

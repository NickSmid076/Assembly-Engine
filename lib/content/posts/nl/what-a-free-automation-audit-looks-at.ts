import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p>Een gratis analyse klinkt al snel als een verkoopgesprek met een andere naam. Dat begrijpen we. Daarom staat hieronder wat we in dat gesprek doen, welke vragen we stellen en wat u er daarna aan overhoudt. Ook als u besluit niet met ons verder te gaan.</p>


<!--block:call-->
<h2>Waarom we met een analyse beginnen</h2>
<p>Bijna elke ondernemer wil meer automatiseren. In de MKB Barometer van Exact zegt 94% dat het eigen bedrijf onvoldoende geautomatiseerd is. De twee belangrijkste redenen om ermee aan de slag te gaan zijn kostenbesparing (52%) en tijdwinst (46%) (<a href="https://files.exact.com/static/web/pdf/mkb-barometer/2025/NL_All-mkb-barometer-2025.pdf">Exact MKB Barometer 2025</a>).</p>
<p>Wie twijfelt, twijfelt meestal om andere redenen dan de techniek. Van de bedrijven die AI wel overwogen maar niet gebruiken, noemt 73% gebrek aan ervaring, 49% privacy en 42% onduidelijke juridische gevolgen (<a href="https://www.cbs.nl/nl-nl/nieuws/2025/50/bedrijven-gebruiken-ai-vaakst-voor-marketing-of-verkoop">CBS, december 2025</a>). Die zorgen komen in de analyse allemaal aan bod.</p>
<p>Een voorstel schrijven voordat we uw werk kennen, zou neerkomen op gokken. Dus kijken we eerst, en praten we pas daarna over wat we zouden bouwen.</p>

<h2>Wat u al betaalt: uw software op een rij</h2>
<p>We beginnen met de software die u nu gebruikt. Uw boekhoudpakket, bijvoorbeeld Exact Online, Moneybird of Twinfield. Uw mail en agenda in Microsoft 365 of Google Workspace. Een CRM zoals HubSpot, als u dat heeft. Uw betaalprovider, en de gedeelde mappen waarin de dossiers staan.</p>
<p>Per pakket stellen we een paar vragen. Wie gebruikt het, en waarvoor? Welke gegevens staan erin die ook ergens anders nodig zijn? En wat typt iemand nu met de hand over van het ene systeem naar het andere?</p>
<p>Die laatste vraag levert meestal het meeste op. De pakketten zelf doen vaak prima wat ze moeten doen. Het werk zit in het overtypen, kopiëren en nabellen tussen de pakketten in. U hoeft hiervoor niets voor te bereiden, al scheelt het tijd als u een lijstje van uw abonnementen bij de hand heeft.</p>

<h2>Drie tot vijf terugkerende klussen in kaart</h2>
<p>Daarna kiezen we samen drie tot vijf werkprocessen die elke week of elke maand terugkomen. Een nieuwe klant aannemen. Stukken opvragen voor de aangifte. Facturen versturen en achter betalingen aan gaan. De maandcijfers klaarzetten voor een klant of voor uzelf.</p>
<p>Voor elk proces lopen we de stappen door zoals ze nu gaan, met de omwegen erbij. Wie begint? Waar wacht iemand op een ander? Waar gaat het weleens mis, en wie merkt dat dan? We schrijven op wat er op een gewone dinsdag gebeurt. Het nette procesplaatje uit het kwaliteitshandboek laten we liggen.</p>
<p>Een voorbeeld van hoe dat eruitziet, bij een denkbeeldig kantoor als Van Dijk Accountancy. Een klant mailt zijn bankafschriften. Een medewerker slaat ze op in de klantmap, zet een vinkje in een Excel-lijst en mailt terug dat ze binnen zijn. Vier handelingen in drie programma's. Ontbreekt er iets, dan gaat er een herinnering uit, als iemand eraan denkt. Zo'n beschrijving van een paar regels is genoeg om te zien waar een systeem het kan overnemen.</p>

<h2>De rekensom: tijd, frequentie en uurtarief</h2>
<p>Per proces maken we een eenvoudige som. Hoe lang duurt de klus? Hoe vaak komt hij voor? Wat kost een uur van degene die hem doet? Hieronder een voorbeeld met verzonnen getallen.</p>

<!--block:sum-->

<p>Bij u kan dat hoger of lager uitvallen. Soms is de uitkomst zo klein dat automatiseren de moeite niet waard is, en dat is ook een bruikbare uitkomst. Daarom rekenen we het uit.</p>
<p>U kunt deze som ook zelf maken voordat u ons belt. Kies een klus waar uw team over klaagt. Schat hoe lang hij duurt, met de onderbrekingen erbij. Tel een week lang hoe vaak hij voorkomt, en vermenigvuldig met de uurkosten. Het getal is ruw. Het geeft wel een ondergrens voor wat een oplossing per jaar mag kosten.</p>
<p>Tijd is ook niet de enige post. Bij herinneringen gaat het ook om geld dat later binnenkomt: in het mkb wordt gemiddeld 14,2% van de facturen te laat betaald (<a href="https://files.exact.com/static/web/pdf/mkb-barometer/2025/NL_All-mkb-barometer-2025.pdf">Exact MKB Barometer 2025</a>). En in een onderzoek uit 2022 bij 20 teams schatten onderzoekers dat mensen bijna vier uur per week kwijt zijn aan het weer op gang komen na het wisselen tussen apps (<a href="https://hbr.org/2022/08/how-much-time-and-energy-do-we-waste-toggling-between-applications">Harvard Business Review, 2022</a>).</p>


<!--block:prepare-->
<h2>Waar uw klantgegevens naartoe gaan</h2>
<p>Bij elk proces kijken we ook waar de gegevens heen gaan. Welke pakketten verwerken persoonsgegevens van uw klanten? Staan die gegevens in de EU of daarbuiten? Heeft u met elke partij een verwerkersovereenkomst?</p>
<p>Voor een accountants- of advocatenkantoor is dat een wezenlijk onderdeel van het advies. Als een koppeling klantgegevens doorstuurt naar een extra dienst, wordt die dienst ook een verwerker, met alle afspraken die daarbij horen. Dat zetten we op papier voordat er iets gebouwd wordt, zodat u niet achteraf ontdekt waar uw gegevens terecht zijn gekomen.</p>

<h2>Wat u daarna in handen heeft</h2>
<p>Na het gesprek krijgt u een kort overzicht op schrift. <mark>[CHECK: confirm the format and timing of what Nick sends after the audit]</mark> Daarin staan drie dingen:</p>
<ul>
<li>de snelle winst: klussen die met uw bestaande software te automatiseren zijn, zonder nieuw pakket;</li>
<li>de grotere projecten, met wat daarvoor nodig is en welke systemen eraan te pas komen;</li>
<li>per onderdeel een inschatting van wat het kost om te bouwen en wat het oplevert, gebaseerd op de som hierboven.</li>
</ul>
<!--block:overview-->

<p>Dat overzicht is van u. U kunt het zelf uitvoeren, aan uw eigen IT-partij geven of met ons verder gaan. We noemen pas een terugverdientijd als we uw processen hebben gezien, en we beloven vooraf geen besparing.</p>

<h2>Wanneer we u afraden om te automatiseren</h2>
<p>Soms is het eerlijke antwoord: laat dit zoals het is. Bijvoorbeeld als een klus zo zelden voorkomt dat bouwen en onderhouden meer kost dan het oplevert. Of als er een oordeel nodig is, zoals een risico-inschatting of een lastig gesprek met een klant. Dat zeggen we dan ook. Een automatisering die niemand vertrouwt, wordt na een paar weken stilletjes weer met de hand gedaan.</p>
<p>Ook als uw software het werk al kan, zeggen we dat. Soms zit de oplossing in een instelling van uw boekhoudpakket die nooit is aangezet. Dan valt er weinig te bouwen, en helpen we u die instelling te vinden.</p>
<p>Over die grens schreven we een apart artikel: <a href="/nl/blog/what-not-to-automate">wat u beter níet automatiseert</a>. En als u wilt weten waarom we bijna altijd bouwen op wat u al heeft, leest u <a href="/nl/blog/build-on-the-software-you-already-use">waarom we bouwen op de software die u al gebruikt</a>.</p>
` + auditCta("nl", true);

export const cover = { alt: "Lijntekening: een week vol terugkerende klussen, waarvan er drie oplichten en samenkomen in één punt." };

export const blocks: PostBlocks = {
  "call": {
    "acf_fc_layout": "timeline",
    "title": "Wat er in het gesprek gebeurt",
    "items": [
      {
        "date": "Deel 1",
        "title": "Uw software op een rij",
        "text": "Wat u al betaalt, wie het gebruikt en wat er tussen pakketten wordt overgetypt.",
        "expected": false
      },
      {
        "date": "Deel 2",
        "title": "Drie tot vijf terugkerende klussen",
        "text": "Stap voor stap doorgelopen, zoals ze op een gewone dinsdag gaan.",
        "expected": false
      },
      {
        "date": "Deel 3",
        "title": "De rekensom",
        "text": "Tijd per keer, hoe vaak het gebeurt en de uurkosten van wie het doet.",
        "expected": false
      },
      {
        "date": "Deel 4",
        "title": "Waar klantgegevens naartoe gaan",
        "text": "Welke pakketten persoonsgegevens verwerken, waar die staan en welke afspraken er zijn.",
        "expected": false
      },
      {
        "date": "Daarna",
        "title": "Een kort schriftelijk overzicht",
        "text": "Snelle winst, grotere projecten en per onderdeel een schatting van kosten en besparing.",
        "expected": false
      }
    ],
    "caption": null
  },
  "sum": {
    "acf_fc_layout": "diagram",
    "src": "/blog/what-a-free-automation-audit-looks-at/the-sum.nl.svg",
    "alt": "Voorbeeldsom voor een fictief kantoor: herinneringen sturen voor openstaande facturen kost 20 minuten, 3 keer per week, tegen uurkosten van €45. Over 46 werkweken is dat 46 uur, ofwel ongeveer €2.070 per jaar.",
    "caption": "Verzonnen getallen. Uw eigen som kan hoger of lager uitvallen.",
    "source": null
  },
  "prepare": {
    "acf_fc_layout": "checklist",
    "id": "audit-prepare",
    "title": "Niet verplicht: wat helpt om klaar te hebben",
    "items": [
      {
        "id": "i1",
        "text": "Een lijst van de softwareabonnementen die u betaalt"
      },
      {
        "id": "i2",
        "text": "Drie tot vijf klussen waar uw team over klaagt"
      },
      {
        "id": "i3",
        "text": "Per klus: ongeveer hoe lang die duurt, onderbrekingen meegerekend"
      },
      {
        "id": "i4",
        "text": "Hoe vaak elke klus voorkomt (een turflijst van één week is genoeg)"
      },
      {
        "id": "i5",
        "text": "De uurkosten van degene die het doet"
      },
      {
        "id": "i6",
        "text": "Welke pakketten persoonsgegevens van uw klanten bevatten"
      }
    ]
  },
  "overview": {
    "acf_fc_layout": "mock_ui",
    "window": "Schriftelijk overzicht",
    "caption": "Voorbeeldopmaak, fictief kantoor. De vorm van het echte overzicht moet nog worden bevestigd.",
    "mock": {
      "kind": "document",
      "title": "Automatiseringsanalyse: samenvatting",
      "meta": [
        "Van Dijk Accountancy (fictief)",
        "3 workflows"
      ],
      "sections": [
        {
          "heading": "Snelle winst, met de software die u heeft",
          "lines": [
            "Herinneringen voor openstaande facturen: de herinneringsfunctie in het boekhoudpakket aanzetten.",
            "Bespaart ongeveer 46 uur per jaar in de voorbeeldsom."
          ]
        },
        {
          "heading": "Grotere projecten",
          "lines": [
            "Stukken opvragen voor de aangifte: één lijst per klant, herinneringen, één overzicht.",
            "Betrokken systemen: e-mail, klantmappen, de Excel-lijst."
          ]
        },
        {
          "heading": "Waar klantgegevens naartoe gaan",
          "lines": [
            "Twee pakketten verwerken persoonsgegevens. Eén verwerkersovereenkomst ontbreekt nog."
          ]
        }
      ]
    }
  }
};

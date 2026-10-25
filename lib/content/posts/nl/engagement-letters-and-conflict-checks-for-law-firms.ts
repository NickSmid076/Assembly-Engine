import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p>Als de intake rond is, komen er twee vaste stappen: de conflictcheck en de opdrachtbevestiging. Op veel kantoren gaat dat nog met de hand. Iemand zoekt in het systeem op de naam van de wederpartij, en iemand anders kopieert de vorige opdrachtbevestiging en past de gegevens aan. Dat werkt, tot er een oude naam in blijft staan of een zoekopdracht net de verkeerde schrijfwijze mist.</p>
<p>Dit artikel volgt op <a href="/nl/blog/client-intake-for-law-firms">cliëntintake voor advocatenkantoren</a>. Het gaat over wat er daarna moet gebeuren, en welk deel daarvan software kan voorbereiden.</p>

<h2>Wat de Verordening op de advocatuur schriftelijk vraagt</h2>
<p>Sinds 1 januari 2025 geldt een gewijzigd artikel 7.5 van de Verordening op de advocatuur (Voda). Volgens de toelichting moeten belangrijke afspraken met de cliënt schriftelijk worden vastgelegd, "zoals de opdrachtbevestiging", en daar horen ook de afspraken over het honorarium bij (<a href="https://www.advocatenorde.nl/voor-advocaten/wet-en-regelgeving/recente-wijzigingsbesluiten/verordening-op-de-advocatuur-0">NOvA, wijzigingsbesluit Voda</a>).</p>
<p>Daarnaast vraagt gedragsregel 17 dat er bij het aanvaarden van de opdracht duidelijke afspraken zijn gemaakt over uw honorarium, de doorbelasting van kosten en de wijze van declareren. Gedragsregel 16 vraagt u de cliënt goed te informeren (<a href="https://www.advocatenorde.nl/voor-advocaten/wet-en-regelgeving/gedragsregels/gedragsregels-advocatuur/de-advocaat-de-verhouding">NOvA, Gedragsregels advocatuur</a>).</p>
<p>Voor elke nieuwe zaak betekent dat: een opdrachtbevestiging op papier, met de afspraken over omvang en honorarium erin. Dat is precies het soort document dat elke keer grotendeels hetzelfde is, en op een paar plekken net anders.</p>

<h2>Een conflictcheck over het hele kantoor</h2>
<p>Gedragsregel 15 verbiedt een advocaat om op te treden voor partijen met tegenstrijdige belangen, of tegen een huidige of vroegere cliënt, behalve onder strikte voorwaarden. Lid 6 bepaalt dat "advocaat" hier het hele samenwerkingsverband omvat (<a href="https://www.inview.nl/openCitation/idb0ea7b9fd1644b0d98c8afd51b37f4d1/gedragsregels-advocatuur-2018-artikel-15">Gedragsregels advocatuur 2018, artikel 15</a>).</p>
<p>Voor de praktijk is dat lid 6 het belangrijkst. U moet dus verder kijken dan uw eigen dossiers: de check loopt over alle cliënten en wederpartijen van het hele kantoor, ook uit afgesloten zaken.</p>
<p>Daar kan software helpen. Een zoekopdracht die bij elke nieuwe zaak automatisch draait, over alle namen van cliënten, wederpartijen en betrokkenen, met varianten in schrijfwijze en KvK-nummers erbij. De uitkomst is een lijst met mogelijke treffers, die in het dossier wordt vastgelegd.</p>
<p>Wat de software niet doet: beslissen of een treffer een conflict is. Of een eerdere zaak tegen dezelfde partij een probleem is, en of de uitzonderingen uit lid 3 en 4 van toepassing zijn, beoordeelt de advocaat. De software vindt de overeenkomsten; de advocaat weegt ze.</p>
<p>Een voorbeeld (fictief): een nieuwe cliënt, Bakkerij Smit B.V., wil procederen tegen een leverancier. De zoekopdracht vindt drie treffers. De leverancier was vier jaar geleden wederpartij in een andere zaak. Een bestuurder van de bakkerij komt voor als betrokkene in een lopend dossier. En er is een bedrijf met een bijna gelijke naam dat cliënt van het kantoor is. De software zet die drie treffers in het dossier. De advocaat bekijkt ze, stelt vast dat het derde bedrijf een ander bedrijf is, en legt per treffer vast waarom er wel of geen conflict is.</p>
<p>Veel praktijkmanagementsystemen hebben al een zoekfunctie. Vaak zit de winst in het automatisch laten draaien ervan, en in het vastleggen van de uitkomst, zodat het niet afhangt van iemand die eraan denkt.</p>


<!--block:firm-->
<h2>De opdrachtbevestiging genereren uit het intakeformulier</h2>
<p>Bij de intake heeft de cliënt al ingevuld wie hij is, waar de zaak over gaat en wie de wederpartij is. Die gegevens kunnen direct in een sjabloon voor de opdrachtbevestiging. Een voorbeeld van wat er dan automatisch in komt:</p>
<ul>
<li>naam, adres en KvK-nummer van de cliënt;</li>
<li>een omschrijving van de opdracht, zoals de advocaat die bij de intake heeft vastgesteld;</li>
<li>de afspraken over het honorarium: uurtarief, vaste prijs of een combinatie, en eventueel het voorschot;</li>
<li>de algemene voorwaarden van het kantoor;</li>
<li>als u AI gebruikt: een passage waarin u dat aan de cliënt meldt.</li>
</ul>
<!--block:template-->

<p>Dat laatste punt komt van de NOvA, die voorstelt om cliënten te informeren over het gebruik van AI, bijvoorbeeld in de opdrachtbevestiging (<a href="https://www.advocatenorde.nl/nieuws/aanbevelingen-ai-de-praktijk">NOvA, aanbevelingen AI</a>).</p>
<p>De advocaat leest het concept, past waar nodig de omschrijving aan en keurt het goed. Het knippen en plakken verdwijnt, en daarmee ook het risico dat er nog een naam of tarief uit een vorige zaak in staat.</p>
<p>Een sjabloon heeft wel onderhoud nodig. Als uw algemene voorwaarden of tarieven veranderen, past één persoon het sjabloon aan, en vanaf dat moment gebruikt iedereen de nieuwe versie. Bij het kopiëren van de vorige brief blijven oude tarieven soms nog maanden rondgaan.</p>


<!--block:compare-->
<h2>Laten tekenen en opslaan zonder handmatige herinneringen</h2>
<p>Na goedkeuring gaat de opdrachtbevestiging naar de cliënt, met een link om digitaal te tekenen. Als er na een paar dagen niet is getekend, gaat er een herinnering uit. Na de tweede herinnering komt er een taak bij de secretaresse of de advocaat om te bellen.</p>
<p>Het getekende document komt vanzelf in het dossier, met de datum van ondertekening. Dan kunt u later altijd laten zien wanneer de afspraken zijn vastgelegd.</p>
<p>Dat helpt ook als de deken langskomt. Elk dossier heeft dan dezelfde onderdelen op dezelfde plek: de uitkomst van de conflictcheck met de afweging van de advocaat, de getekende opdrachtbevestiging en de datum van ondertekening. Niemand hoeft die nog bij elkaar te zoeken.</p>
<p>Dezelfde regel als bij de intake geldt hier: automatische berichten moeten per zaak uit te zetten zijn, bijvoorbeeld als er een melding aan de FIU is gedaan. Dat staat uitgelegd in het <a href="/nl/blog/client-intake-for-law-firms">artikel over de intake</a>.</p>

<h2>Als een bestaande cliënt een nieuwe zaak brengt</h2>
<p>Bij een vaste cliënt is de verleiding groot om de intake over te slaan. Maar volgens de dekens moet het risicoprofiel worden bijgewerkt als een bestaande Wwft-cliënt met een nieuwe zaak komt (<a href="https://www.toezichtadvocatuur.nl/cms/public/files/communicatie/20250311-advocatenblad-maart.pdf?dc96f3e2af=">Dekenberaad, maart 2025</a>).</p>
<p>Een systeem kan dat moment herkennen. Als er een nieuwe zaak wordt geopend voor een cliënt die al bekend is, krijgt de advocaat een taak: bekijk het risicoprofiel opnieuw. Ook de conflictcheck draait dan opnieuw, want de wederpartij is waarschijnlijk een andere.</p>

<h2>Derdengelden: de schriftelijke bevestiging</h2>
<p>Ook bij derdengelden komt een vaste schriftelijke stap terug. Een declaratie mag alleen uit derdengelden worden voldaan als de rechthebbende daar vooraf schriftelijk mee heeft ingestemd en de declaratie niet tijdig heeft betwist. Daarna moet de advocaat de betaling schriftelijk bevestigen (<a href="https://www.advocatenorde.nl/voor-advocaten/wet-en-regelgeving/recente-wijzigingsbesluiten/verordening-op-de-advocatuur/vo-03">NOvA, Vo-03</a>).</p>
<p>Die bevestiging is een standaardbrief. Hij kan klaarstaan zodra de verrekening is gedaan, met de juiste bedragen en datum. De advocaat controleert en verstuurt. De beslissing om te verrekenen, en de controle of aan de voorwaarden is voldaan, blijven bij het kantoor.</p>

<h2>Termijnen en opvolging met de software die u al heeft</h2>
<p>Termijnbewaking is op elk advocatenkantoor een onderwerp. We schrijven daar bewust geen regels voor het berekenen van termijnen; dat is vakwerk, en hoort bij de advocaat en uw procesafspraken.</p>
<p>Wel kunnen we helpen met de opvolging eromheen. Een termijn die in het dossier staat, kan automatisch in de agenda van de juiste mensen komen, met een herinnering vooraf. En als er een stap uit de intake of opdrachtbevestiging openstaat, komt dat op een lijst die iemand elke week bekijkt. Dat kan meestal met wat u al heeft, zoals uw praktijkmanagementsysteem en uw agenda in Microsoft 365 of Google Workspace.</p>

<h2>De beslissingen die bij de advocaat blijven</h2>
<p>Op een rij, voor wie snel wil lezen:</p>
<ul>
<li>of een treffer in de conflictcheck een belangenconflict is;</li>
<li>de omschrijving van de opdracht en de afspraken over het honorarium;</li>
<li>of de Wwft van toepassing is, en het risicoprofiel van de cliënt;</li>
<li>of verrekening met derdengelden mag;</li>
<li>de berekening van termijnen.</li>
</ul>
<p>Alles daaromheen kan worden voorbereid, verstuurd, herinnerd en vastgelegd. Zo gaat de tijd van de advocaat naar de beslissingen, en hoeft niemand meer gegevens over te typen die al in het systeem staan.</p>
<p>Geen van de hulpmiddelen in dit artikel is door de NOvA goedgekeurd of aanbevolen. Welke software u kiest, blijft uw eigen afweging. Hoe wij daarover denken, leest u in <a href="/nl/blog/build-on-the-software-you-already-use">waarom we bouwen op de software die u al gebruikt</a>.</p>
` + auditCta("nl");

export const cover = { alt: "Lijntekening: een briefsjabloon met gemarkeerde invulvelden links, een vergrootglas over rijen dossiers rechts." };

export const blocks: PostBlocks = {
  "firm": {
    "acf_fc_layout": "diagram",
    "src": "/blog/engagement-letters-and-conflict-checks-for-law-firms/whole-firm.nl.svg",
    "alt": "Gedragsregel 15 lid 6: ‘advocaat’ omvat het hele kantoor, dus de conflictcheck zoekt in uw eigen dossiers, in lopende zaken van collega’s en in gesloten zaken. Voorbeeld met de nieuwe cliënt Bakkerij Smit B.V. (fictief), drie treffers: de leverancier was vier jaar geleden wederpartij in een gesloten zaak; een bestuurder komt voor in een lopend dossier van een collega; een cliënt heeft een bijna gelijke naam maar is een ander bedrijf.",
    "caption": "De software vindt de treffers. De advocaat weegt ze.",
    "source": {
      "title": "Gedragsregels advocatuur 2018, artikel 15",
      "url": "https://www.inview.nl/openCitation/idb0ea7b9fd1644b0d98c8afd51b37f4d1/gedragsregels-advocatuur-2018-artikel-15",
      "target": "_blank"
    }
  },
  "template": {
    "acf_fc_layout": "mock_ui",
    "window": "Sjabloon opdrachtbevestiging",
    "caption": "Voorbeeldsjabloon. De blauwe velden komen uit het intakeformulier.",
    "mock": {
      "kind": "document",
      "title": "Opdrachtbevestiging",
      "meta": [
        "Sjabloon",
        "Door één persoon bijgehouden, door iedereen gebruikt"
      ],
      "sections": [
        {
          "heading": "Cliënt",
          "lines": [
            "{{naam_client}}, {{adres}}",
            "KvK {{kvk_nummer}}"
          ]
        },
        {
          "heading": "De opdracht",
          "lines": [
            "{{omschrijving_opdracht}}"
          ]
        },
        {
          "heading": "Honorarium",
          "lines": [
            "{{honorariumafspraak}}: {{tarief}}",
            "Voorschot: {{voorschot}}"
          ]
        },
        {
          "heading": "Voorwaarden",
          "lines": [
            "De algemene voorwaarden van {{naam_kantoor}} zijn van toepassing.",
            "Voor een deel van het voorbereidende werk gebruiken wij AI-hulpmiddelen. Een advocaat controleert alles voordat het u bereikt."
          ]
        }
      ]
    }
  },
  "compare": {
    "acf_fc_layout": "before_after",
    "variant": "process",
    "title": "Knippen en plakken of een sjabloon",
    "before": [
      "De vorige opdrachtbevestiging kopiëren",
      "Naam, adres en tarieven met de hand aanpassen",
      "Soms blijft een oude naam of een oud tarief staan"
    ],
    "after": [
      "De intakegegevens vullen het sjabloon",
      "Tarieven en algemene voorwaarden komen uit één onderhouden sjabloon",
      "De advocaat leest, past aan en keurt het concept goed"
    ],
    "human": "De omschrijving van de opdracht en de honorariumafspraken."
  }
};

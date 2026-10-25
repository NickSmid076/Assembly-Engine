import { auditCta } from "../cta";

export default `
<p><em>Laatst bijgewerkt: 25 oktober 2026. Prijzen en abonnementen van deze diensten veranderen vaak; controleer ze altijd op de site van de leverancier.</em></p>
<p>Eerst iets wat u moet weten om dit artikel te kunnen wegen: wij bouwen onze automatiseringen in n8n. We hebben dus een voorkeur. Hieronder leggen we uit waarom, en ook wanneer we een kantoor iets anders zouden aanraden.</p>
<p><mark>[CHECK: every pricing, plan and data-region claim in this article against the official Zapier, Make and n8n sites; the comparison figures come from one hosting vendor that favours n8n]</mark></p>

<h2>Waarom een kantoor met klantgegevens andere vragen stelt</h2>
<p>De meeste vergelijkingen van n8n, Make en Zapier zijn geschreven voor webshops en marketingteams. Die willen vooral weten hoeveel koppelingen er zijn en hoe snel je iets in elkaar klikt.</p>
<p>Een accountants- of advocatenkantoor heeft andere zorgen. U werkt met jaarcijfers, BSN's, processtukken en informatie onder geheimhouding. Dan zijn drie vragen belangrijker dan het aantal koppelingen: waar staan de gegevens, hoe betaalt u, en wie onderhoudt het als er iets stukgaat?</p>
<p>Die zorg is breed. Van de Nederlandse bedrijven die AI hebben overwogen maar niet gebruiken, noemt 49% privacy als reden (<a href="https://www.cbs.nl/nl-nl/nieuws/2025/50/bedrijven-gebruiken-ai-vaakst-voor-marketing-of-verkoop">CBS, december 2025</a>). Voor automatisering zonder AI speelt dezelfde vraag: elke stap in een workflow is een plek waar klantgegevens langskomen.</p>

<h2>Waar de gegevens staan: de VS, de EU of uw eigen server</h2>
<p>Volgens een vergelijking van hostingbedrijf Virtua.Cloud zit het zo (<a href="https://www.virtua.cloud/learn/nl/concepts/n8n-vs-zapier-vs-make-kosten-privacy">Virtua.Cloud</a>):</p>
<ul>
<li>Zapier slaat gegevens standaard op in de Verenigde Staten. Opslag in de EU vraagt om het Enterprise-abonnement.</li>
<li>Make laat u bij het aanmaken van een account kiezen voor de EU, op elk abonnement.</li>
<li>n8n Cloud draait op Azure in Frankfurt. U kunt n8n ook zelf hosten, op een server die u kiest.</li>
</ul>
<figure class="wp-block-table"><table><thead><tr><th></th><th>Zapier</th><th>Make</th><th>n8n</th></tr></thead><tbody>
<tr><td>Opslag in de EU</td><td>Met Enterprise</td><td>Te kiezen, elk abonnement</td><td>Cloud in Frankfurt, of eigen server</td></tr>
<tr><td>Afrekenen per</td><td>Taak (elke stap)</td><td>Credit</td><td>Uitvoering (hele workflow)</td></tr>
<tr><td>Zelf hosten</td><td>Nee</td><td>Nee</td><td>Ja</td></tr>
</tbody></table><figcaption>Samenvatting op basis van Virtua.Cloud. Nog te controleren bij de leveranciers zelf.</figcaption></figure>
<p>Virtua.Cloud verkoopt zelf hosting voor n8n. Lees het lijstje dus als startpunt, en controleer elk punt bij de leverancier zelf.</p>
<p>Gegevens in de VS zijn niet automatisch verboden. Voor doorgifte naar de VS is er het EU-US Data Privacy Framework. <mark>[CHECK: the status of the EU-US Data Privacy Framework in 2026]</mark> Maar voor een kantoor dat aan cliënten moet kunnen uitleggen waar hun gegevens staan, is "in de EU" of "op onze eigen server" een eenvoudiger antwoord.</p>

<h2>Hoe u betaalt: taken, credits of uitvoeringen</h2>
<p>De drie diensten rekenen op een andere manier af, en dat maakt een groot verschil zodra een workflow vaak draait.</p>
<ul>
<li>Zapier rekent per <em>taak</em>: elke stap die iets doet, telt.</li>
<li>Make rekende per <em>operation</em> en is overgestapt op <em>credits</em>. <mark>[CHECK: Make's August 2025 rename from operations to credits, and how credits are counted now]</mark></li>
<li>n8n rekent per <em>uitvoering</em>: één keer de hele workflow doorlopen telt als één, ongeacht het aantal stappen.</li>
</ul>
<p>Een rekenvoorbeeld van Virtua.Cloud: een workflow van vijf stappen die honderd keer per dag draait, is per maand ongeveer 3.000 uitvoeringen in n8n, en ongeveer 15.000 taken in Zapier (<a href="https://www.virtua.cloud/learn/nl/concepts/n8n-vs-zapier-vs-make-kosten-privacy">Virtua.Cloud</a>).</p>
<p>Denk aan een concreet voorbeeld, verzonnen maar herkenbaar. Elke inkomende mail met een bijlage wordt gecontroleerd (1), de bijlage wordt opgeslagen in het klantdossier (2), de klant wordt opgezocht in het CRM (3), het document wordt afgevinkt op de lijst met ontbrekende stukken (4), en de medewerker krijgt een melding (5). Honderd mails per dag is voor een druk kantoor in het aangifteseizoen niet vreemd. Bij Zapier tellen dan alle vijf stappen mee, bij n8n de workflow als geheel.</p>
<p>Wat dat in euro's betekent, hangt af van de actuele prijzen. Die noemen we hier bewust niet, omdat ze te vaak veranderen.</p>

<h2>Zelf hosten is niet gratis</h2>
<p>De open versie van n8n kunt u zelf draaien. Gratis is het daarmee nog niet. Volgens Virtua.Cloud kost een virtuele server daarvoor ongeveer 12 tot 29 euro per maand, plus een tot twee uur onderhoud per maand (<a href="https://www.virtua.cloud/learn/nl/concepts/n8n-vs-zapier-vs-make-kosten-privacy">Virtua.Cloud</a>).</p>
<p>Dat onderhoud is het deel dat vaak wordt vergeten. Iemand moet updates installeren, back-ups controleren, de server beveiligen en opletten als er een workflow vastloopt. Als niemand op uw kantoor dat wil of kan, betaalt u iemand om het te doen, of kiest u voor de cloudversie.</p>
<p>En zelf hosten maakt een kantoor niet vanzelf AVG-proof. U bepaalt waar de server staat, maar u bent ook verantwoordelijk voor de beveiliging ervan.</p>

<h2>Wie het onderhoudt als er iets stukgaat</h2>
<p>Elke workflow loopt een keer vast. Een leverancier wijzigt zijn API, een wachtwoord verloopt, een klant stuurt een bijlage in een vreemd formaat. De vraag is wie dat merkt, en wie het oplost.</p>
<p>Op een kantoor met klantgegevens weegt dat zwaarder dan bij een webshop. Een mislukte stap kan betekenen dat een document niet in het dossier komt, of dat een herinnering niet uitgaat terwijl iedereen denkt van wel. Daarom bouwen we in elke workflow een melding voor als een stap mislukt, en houden we een overzicht bij van welke workflows er draaien en wat ze doen. Vraag dat ook aan elke andere bouwer: wat gebeurt er als het misgaat, en hoe hoor ik dat?</p>
<p>Dat geldt voor alle drie de diensten. Zapier en Make nemen u het serverbeheer uit handen, maar een workflow die vastloopt omdat een ander pakket iets heeft veranderd, moet ook daar iemand repareren.</p>

<h2>De papieren die belangrijker zijn dan het hulpmiddel</h2>
<p>Geen van deze drie diensten is op zichzelf "AVG-compliant". Of u de AVG naleeft, hangt af van hoe u ze gebruikt: welke gegevens erdoorheen gaan, met wie u afspraken heeft, en wat u vastlegt.</p>
<p>Twee dingen zijn in elk geval nodig:</p>
<ol>
<li>Een verwerkersovereenkomst met elke dienst die persoonsgegevens van uw klanten verwerkt. Dat geldt voor de automatiseringsdienst, en ook voor elke dienst die in een workflow gegevens ontvangt. <mark>[CHECK: cite GDPR art. 28 or the Autoriteit Persoonsgegevens directly for the verwerkersovereenkomst requirement]</mark></li>
<li>Een verwerkingsregister waarin staat welke gegevens u waarvoor verwerkt, en via welke diensten.</li>
</ol>
<p>De NOvA geeft advocaten een bruikbare checklist voor contracten met leveranciers: kijk wie zeggenschap heeft over de data, hoe de aansprakelijkheid is geregeld en hoe u er weer uit komt, en voorkom dat u vast komt te zitten aan één leverancier (<a href="https://www.advocatenorde.nl/nieuws/aanbevelingen-ai-de-praktijk">NOvA, aanbevelingen AI</a>). Die aanbevelingen gaan over AI, maar de vragen passen net zo goed bij een automatiseringsdienst.</p>

<h2>Vragen voor elke aanbieder</h2>
<p>Welke dienst u ook kiest, en wie het ook voor u bouwt, deze vragen moet u beantwoord kunnen krijgen:</p>
<ul>
<li>Waar staan mijn gegevens, en kan ik dat zwart op wit krijgen?</li>
<li>Welke subverwerkers gebruikt u?</li>
<li>Hoe wordt er afgerekend, en wat kost het als mijn gebruik verdubbelt?</li>
<li>Kan ik mijn workflows exporteren als ik wil overstappen?</li>
<li>Wie lost het op als een workflow stopt, en hoe snel?</li>
</ul>
<p>Krijgt u op een van deze vragen geen duidelijk antwoord, dan weet u genoeg.</p>
<p>De vierde vraag wordt vaak vergeten. Bij alle drie de diensten draaien uw workflows op dat platform. Wilt u naar een ander platform, dan bouwt u ze daar opnieuw. n8n slaat workflows op als bestanden die u kunt exporteren en elders weer kunt inladen, ook op een eigen server. Dat is voor ons een van de redenen om ermee te werken.</p>

<h2>Ons advies per soort kantoor</h2>
<p>Dit is onze inschatting. Uw situatie kan anders zijn.</p>
<ul>
<li>Heeft u een klein kantoor met een paar eenvoudige koppelingen en weinig gevoelige gegevens? Dan is Zapier of Make prima, als de gegevens in de EU staan en er een verwerkersovereenkomst ligt. U kunt het vaak zelf instellen.</li>
<li>Heeft u veel workflows die vaak draaien? Kijk dan goed naar de manier van afrekenen. Het verschil tussen per stap en per uitvoering kan groot worden.</li>
<li>Werkt u met vertrouwelijke dossiers, zoals op een advocatenkantoor? Kies dan voor opslag in de EU of op een eigen server, en zorg dat iemand verantwoordelijk is voor het onderhoud.</li>
</ul>

<h2>Waarom wij n8n gebruiken, en wanneer we iets anders zouden kiezen</h2>
<p>Wij bouwen op n8n om drie redenen. U kunt kiezen waar het draait, ook op een server in Nederland of de EU. Het rekent per uitvoering, wat bij drukke workflows overzichtelijker is. En de workflows zijn van u: als u ooit met iemand anders verder wilt, kan die ze overnemen.</p>
<p>We zouden iets anders aanraden als u het zelf wilt beheren zonder technische kennis. Make en Zapier zijn voor een beginner toegankelijker. Of als u één simpele koppeling nodig heeft die Zapier kant-en-klaar aanbiedt; dan is een eigen n8n-installatie te veel gedoe.</p>
<p>Het hulpmiddel is ook maar de helft. Wie "n8n" intypt op een freelanceplatform, vindt talloze aanbieders (<a href="https://nl.fiverr.com/n8n_lurd">Fiverr</a>). Bouwen kan iedereen. Wat telt voor een kantoor met klantgegevens: wie is aanspreekbaar als het misgaat, wie spreekt uw taal, en wie weet wat een verwerkersovereenkomst is. Daar willen wij op beoordeeld worden.</p>
<p>Meer over waarom we koppelen in plaats van vervangen leest u in <a href="/nl/blog/build-on-the-software-you-already-use">waarom we bouwen op de software die u al gebruikt</a>.</p>
` + auditCta("nl");

import { auditCta } from "../cta";

export default `
<p><mark>[CHECK: confirm every step below is one Nick performs in the audit, and cut any he doesn't]</mark></p>
<p>A free audit can sound like a sales call with a different name. We understand that. So here is what we do in that call, the questions we ask, and what you keep afterwards. That holds even if you decide not to work with us.</p>

<h2>Why we start with an audit</h2>
<p>Almost every owner wants to automate more. In Exact's SMB Barometer, 94% of Dutch SMB owners say their business is not automated enough. The two main reasons to start are cost savings (52%) and time savings (46%) (<a href="https://files.exact.com/static/web/pdf/mkb-barometer/2025/NL_All-mkb-barometer-2025.pdf">Exact MKB Barometer 2025</a>).</p>
<p>Owners who hesitate usually hesitate for reasons other than the technology. Of the Dutch firms that considered AI but don't use it, 73% cite a lack of experience, 49% privacy and 42% unclear legal consequences (<a href="https://www.cbs.nl/nl-nl/nieuws/2025/50/bedrijven-gebruiken-ai-vaakst-voor-marketing-of-verkoop">CBS, December 2025</a>). Each of those worries comes up in the audit.</p>
<p>Writing a proposal before we know your work would mean guessing. So we look first, and only then talk about what we would build.</p>

<h2>What you already pay for: your software, listed</h2>
<p>We start with the software you use today. Your accounting package, for example Exact Online, Moneybird or Twinfield. Your email and calendar in Microsoft 365 or Google Workspace. A CRM such as HubSpot, if you have one. Your payment provider, and the shared folders where client files live.</p>
<p>For each package we ask a few questions. Who uses it, and for what? Which data in it is also needed somewhere else? And what does someone currently retype by hand from one system into another?</p>
<p>That last question usually turns up the most. The packages themselves often do their job well. The work sits in the retyping, copying and chasing between them. You don't need to prepare anything, though it saves time if you have a list of your subscriptions to hand.</p>

<h2>Three to five recurring jobs, mapped</h2>
<p>Next we pick three to five workflows together that come back every week or every month. Taking on a new client. Collecting documents for tax returns. Sending invoices and chasing payments. Preparing the monthly figures for a client or for yourself.</p>
<p>For each workflow we walk through the steps as they happen now, detours included. Who starts it? Where does someone wait on someone else? Where does it sometimes go wrong, and who notices? We write down what happens on an ordinary Tuesday. The tidy process chart in the quality manual can stay in the drawer.</p>
<p>Here is an example of what that looks like, at an imaginary firm such as Van Dijk Accountancy. A client emails their bank statements. A staff member saves them in the client folder, ticks a box in an Excel list and emails back to say they've arrived. Four actions in three programs. If something is missing, a reminder goes out, as long as someone remembers. A description of a few lines like that is enough to see where a system could take over.</p>

<h2>The sum: time, frequency and hourly cost</h2>
<p>For each workflow we do a simple sum. How long does the job take? How often does it happen? What does an hour of the person doing it cost? Below is an example with made-up numbers.</p>
<figure class="wp-block-table"><table><thead><tr><th>Example (fictional firm)</th><th>Value</th></tr></thead><tbody>
<tr><td>Sending reminders for unpaid invoices</td><td>20 minutes each time</td></tr>
<tr><td>How often</td><td>3 times a week</td></tr>
<tr><td>Hourly cost of the staff member</td><td>€45</td></tr>
<tr><td>Time per year (46 working weeks)</td><td>46 hours</td></tr>
<tr><td>Cost per year</td><td>about €2,070</td></tr>
</tbody></table></figure>
<p>Your numbers may come out higher or lower. Sometimes the result is so small that automating isn't worth it, and that is a useful result too. That's why we do the sum.</p>
<p>You can also do this sum yourself before you call us. Pick a job your team complains about. Estimate how long it takes, interruptions included. Count for a week how often it happens, and multiply by the hourly cost. The figure is rough. It does give you a floor for what a solution may cost per year.</p>
<p>Time isn't the only cost either. With reminders, there's also money that arrives later: on average, Dutch SMBs are paid late on 14.2% of their invoices (<a href="https://files.exact.com/static/web/pdf/mkb-barometer/2025/NL_All-mkb-barometer-2025.pdf">Exact MKB Barometer 2025</a>). And people who switch between programs all day lose close to four hours a week doing it, according to Harvard Business Review research from 2022 (via <a href="https://www.toriihq.com/saas-statistics">Torii</a>). <mark>[CHECK: verify the 4 hours a week in the original HBR 2022 study; we only saw it via Torii]</mark></p>

<h2>Where your client data goes</h2>
<p>For each workflow we also look at where the data goes. Which packages process your clients' personal data? Is that data stored in the EU or outside it? Do you have a data processing agreement (verwerkersovereenkomst) with every party?</p>
<p>For an accounting or law firm, this is a substantial part of the advice. If a connection sends client data on to an extra service, that service becomes a processor too, with all the agreements that come with it. We put that on paper before anything is built, so you don't find out afterwards where your data ended up.</p>

<h2>What you have afterwards</h2>
<p>After the call you get a short written overview. <mark>[CHECK: confirm the format and timing of what Nick sends after the audit]</mark> It covers three things:</p>
<ul>
<li>the quick wins: jobs that can be automated with the software you already have, without a new package;</li>
<li>the larger projects, with what they need and which systems are involved;</li>
<li>for each part, an estimate of what it costs to build and what it saves, based on the sum above.</li>
</ul>
<p>That overview is yours. You can carry it out yourself, hand it to your own IT partner or continue with us. We only name a payback period once we've seen your processes, and we don't promise savings in advance.</p>

<h2>When we advise you not to automate</h2>
<p>Sometimes the honest answer is: leave this as it is. For example when a job happens so rarely that building and maintaining an automation costs more than it saves. Or when it needs judgement, such as a risk assessment or a difficult conversation with a client. Then we say so. An automation nobody trusts is quietly done by hand again within a few weeks.</p>
<p>Even when your software can already do the job, we tell you. Sometimes the fix is a setting in your accounting package that was never switched on. Then there's little to build, and we help you find that setting.</p>
<p>We wrote a separate article about where that line sits: <a href="/en/blog/what-not-to-automate">what not to automate</a>. And if you want to know why we almost always build on what you already have, read <a href="/en/blog/build-on-the-software-you-already-use">why we build on the software you already use</a>.</p>
` + auditCta("en", true);

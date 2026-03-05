import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterProvider } from "@/components/newsletter-modal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Beyond Code Collective",
  description:
    "Beyond Code Collective Privacy Policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <NewsletterProvider>
      <Nav />
      <main className="bg-off-white px-6 pt-32 pb-24 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-16">
            <p
              className="font-mono text-xs tracking-[0.2em] text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [ LEGAL ]
            </p>
            <h1
              className="mt-4 text-5xl leading-[0.9] tracking-tight text-true-black sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              PRIVACY POLICY
            </h1>
            <p className="mt-4 text-sm text-grey-3">Last updated: November 17, 2025</p>
          </header>

          <div className="legal-content space-y-8 text-base leading-relaxed text-charcoal">
            <p>
              Beyond Code Collective, Inc. (&quot;Beyond Code Collective,&quot; &quot;BCC,&quot;
              &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) commits to respecting privacy and
              protecting personal information from students, parents/guardians, educators,
              volunteers, donors, alumni, and community members. This Privacy Policy explains what
              personal information is collected, how it&apos;s used and shared, available choices,
              and contact information for questions. It includes a TCPA &amp; Mobile Messaging Notice
              governing SMS/text communications.
            </p>

            <div className="rounded-sm border border-grey-2 bg-grey-1 p-6">
              <p className="text-sm font-semibold text-true-black">Snapshot Summary</p>
              <p className="mt-2 text-sm text-charcoal">
                BCC collects information provided directly (workshop registration, donations,
                volunteering), limited automatic information (device data, analytics), and
                information from service providers. Data supports educational programs, community
                services, communications, fundraising, legal compliance, and safety. Users control
                communication methods, including opting out of marketing emails and text messages
                anytime (reply STOP to cancel texts). See Sections IV &amp; VIII.
              </p>
            </div>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                SCOPE OF THIS POLICY
              </h2>
              <p>
                This Privacy Policy applies to BCC-operated websites and online services including
                our main website at{" "}
                <a href="https://wearebcc.org" className="text-cobalt underline">
                  wearebcc.org
                </a>{" "}
                and the BCC Learning Platform.
              </p>
              <p className="mt-4">
                This Privacy Policy does not cover offline data practices (paper sign-in sheets at
                in-person events) except when those data are entered into digital systems. By
                accessing sites linking to this Privacy Policy, you acknowledge reading and
                understanding its terms. This Privacy Policy is not a contract and creates no legal
                rights beyond those required by law; it describes good-faith practices and available
                choices.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                I. PERSONAL INFORMATION WE COLLECT
              </h2>
              <p>
                &quot;Personal Information&quot; means information identifying, relating to,
                describing, or reasonably associated with an identifiable individual. Categories
                collected depend on your interaction with BCC (student, parent/guardian, educator,
                volunteer, donor, etc.).
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                A. Information You Provide Directly
              </h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Name (first, last, preferred name)</li>
                <li>Date of birth / age range / school grade level</li>
                <li>Parent or legal guardian name(s) for minors</li>
                <li>Email address(es)</li>
                <li>Telephone and/or mobile phone number (including SMS opt-in status)</li>
                <li>Mailing address / shipping address / region</li>
                <li>
                  Program registration details (event selections, waitlists, dietary or accessibility
                  notes)
                </li>
                <li>
                  Demographic information to measure impact (race/ethnicity, gender identity,
                  pronouns) — optional
                </li>
                <li>
                  Donation and fundraising information (pledge amounts, dedication info; payment card
                  data processed directly by payment processor, not stored by BCC)
                </li>
                <li>
                  Account credentials for portals (username, hashed password or SSO token — raw
                  passwords not visible if SSO used)
                </li>
                <li>
                  Photos, videos, written submissions, code projects, survey responses, and other
                  uploaded content
                </li>
                <li>Communication preferences (email, SMS/text, phone, postal mail)</li>
              </ul>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                B. Information Collected Automatically
              </h3>
              <p>
                When interacting with Sites, we and third-party analytics providers automatically
                collect limited Usage Information:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Browser type and settings</li>
                <li>
                  Device type, operating system, Device Identifier (IP address; sometimes mobile
                  advertising ID)
                </li>
                <li>Referring/exit pages and Site navigation paths</li>
                <li>Date/time stamps and pages viewed</li>
                <li>General location derived from IP address (city/region level; not precise GPS)</li>
              </ul>
              <p className="mt-4">
                BCC currently uses Google Analytics (standard implementation) to understand aggregate
                Site usage and improve content. Google Analytics uses cookies and similar
                technologies; see Section I.D for cookie controls.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                C. Information From Other Sources
              </h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Event registration partners or learning management tools used for BCC program
                  signup
                </li>
                <li>
                  Payment / donation processors (transaction confirmation, donation amount, limited
                  billing details)
                </li>
                <li>
                  Email / SMS communications platforms capturing communication preferences or
                  engagement data
                </li>
                <li>
                  Social media platforms when interacting with official accounts or using social
                  log-in
                </li>
                <li>
                  Publicly available sources (school or district websites listing educators
                  coordinating BCC programming)
                </li>
              </ul>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                D. Cookies, Pixels &amp; Similar Technologies
              </h3>
              <p>
                BCC and service providers use first-party and third-party technologies for Site
                operation, login maintenance, preference storage, traffic measurement, and content
                usefulness assessment.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Cookies:</strong> Small text files enabling core functionality (session
                  management) and analytics. Browsers typically allow refusing or removing cookies;
                  some Site features may not work without them.
                </li>
                <li>
                  <strong>Tracking pixels / web beacons:</strong> Small code snippets loading when
                  pages or emails open; measure engagement or campaign effectiveness.
                </li>
                <li>
                  <strong>Local storage &amp; similar:</strong> Other browser storage mechanisms
                  remembering settings.
                </li>
                <li>
                  <strong>Mobile identifiers / SDKs:</strong> Currently limited; mobile app additions
                  will update this section.
                </li>
                <li>
                  <strong>Do Not Track:</strong> Sites currently don&apos;t respond to browser
                  &quot;Do Not Track&quot; signals. Use controls described above (and Section IV) for
                  cookie and communication management.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                II. HOW WE USE PERSONAL INFORMATION
              </h2>
              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong>Program delivery:</strong> Register you or your child for workshops, camps,
                  events, online programs; manage waitlists; verify eligibility; communicate
                  logistical details.
                </li>
                <li>
                  <strong>Education content &amp; community engagement:</strong> Enable access to
                  learning modules, project submissions, collaborative forums, alumni networks,
                  mentorship features.
                </li>
                <li>
                  <strong>Parent/guardian communications:</strong> Provide required notices, consent
                  requests, program updates, safety information for minors.
                </li>
                <li>
                  <strong>Donor &amp; supporter relations:</strong> Process and acknowledge
                  donations; send stewardship updates; invite fundraising participation.
                </li>
                <li>
                  <strong>Marketing &amp; outreach (opt-in):</strong> Send newsletters, program
                  announcements, event invitations, fundraising appeals you elect to receive.
                </li>
                <li>
                  <strong>Surveys &amp; impact measurement:</strong> Solicit feedback evaluating
                  educational and community impact; compile anonymized/aggregated statistics for grant
                  reporting.
                </li>
                <li>
                  <strong>Site operations &amp; security:</strong> Diagnose technical issues, detect
                  fraud or abuse, maintain platform integrity, secure accounts.
                </li>
                <li>
                  <strong>Legal &amp; compliance:</strong> Meet obligations under applicable laws,
                  respond to lawful requests, enforce Terms, protect rights, safety, and property.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                III. HOW WE SHARE PERSONAL INFORMATION
              </h2>
              <p className="mb-4 font-semibold">BCC does not sell Personal Information.</p>

              <h3 className="mt-4 mb-3 text-sm font-bold text-true-black">
                A. Service Providers (Processors)
              </h3>
              <p>
                BCC works with trusted vendors performing services: website hosting, registration and
                ticketing, learning management systems, payment processing, email &amp; SMS delivery,
                analytics, customer relationship management, cloud storage, IT/security support.
                Service providers are contractually required to safeguard Personal Information and use
                it only for contracted services.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                B. Program and Community Partners
              </h3>
              <p>
                BCC occasionally collaborates with schools, community organizations, sponsors, or
                corporate partners delivering programming. Where appropriate and permitted, limited
                participant information may be shared for joint event operation, attendance
                confirmation, or grant reporting compliance. Personal contact information is not
                shared with partners for independent marketing without explicit agreement.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                C. Legal, Safety &amp; Organizational Transfers
              </h3>
              <p>
                Personal Information may be disclosed when believed necessary in good faith to: (i)
                comply with applicable law or legal process; (ii) respond to lawful public authority
                requests; (iii) enforce Terms, policies, or agreements; (iv) protect rights, privacy,
                safety, or property of BCC, participants, or others; or (v) in connection with
                organizational transactions consistent with nonprofit mission.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                IV. YOUR PRIVACY CHOICES &amp; ACCESS REQUESTS
              </h2>
              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong>Marketing email opt-out:</strong> Click the unsubscribe link in any BCC
                  marketing email or email{" "}
                  <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                    info@wearebcc.org
                  </a>{" "}
                  with subject line &quot;Unsubscribe.&quot;
                </li>
                <li>
                  <strong>SMS/text opt-out:</strong> Reply STOP to any BCC text message, or see
                  additional options in Section VIII.
                </li>
                <li>
                  <strong>Access, correction &amp; deletion requests:</strong> Request access to,
                  correct, or delete Personal Information by emailing{" "}
                  <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                    info@wearebcc.org
                  </a>
                  .
                </li>
                <li>
                  <strong>Cookies &amp; analytics controls:</strong> Most browsers allow refusing or
                  deleting cookies. Google offers an opt-out browser add-on for Google Analytics.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                V. LINKS TO OTHER WEBSITES &amp; SERVICES
              </h2>
              <p>
                BCC Sites may link to third-party websites, apps, social platforms, or services
                outside BCC control. Links don&apos;t imply endorsement. Those third parties&apos;
                privacy practices govern any data provided to them.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                VI. CHILDREN&apos;S PRIVACY (COPPA &amp; SIMILAR LAWS)
              </h2>
              <p>
                Many BCC programs serve children and teens. Protecting young people&apos;s privacy is
                core to the mission.
              </p>
              <ul className="mt-3 list-disc space-y-3 pl-6">
                <li>
                  <strong>Children under 13:</strong> BCC doesn&apos;t knowingly permit children
                  under 13 to create independent accounts. A parent or legal guardian must complete
                  registration and provide required permissions. If BCC learns it collected Personal
                  Information directly from a child under 13 without required authorization, it will
                  delete it as soon as practicable.
                </li>
                <li>
                  <strong>Parental rights:</strong> Parents/guardians may review, correct, or request
                  deletion of their child&apos;s Personal Information and may refuse further
                  collection or use. Exercise these rights by emailing{" "}
                  <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                    info@wearebcc.org
                  </a>{" "}
                  with &quot;Child Privacy Request&quot; in the subject line.
                </li>
                <li>
                  <strong>Minimum necessary:</strong> Only Personal Information reasonably necessary
                  for a child to participate in an activity is collected.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                VII. GLOBAL ACCESS &amp; INTERNATIONAL DATA TRANSFERS
              </h2>
              <p>
                Sites are operated in the United States and governed by U.S. law. If located outside
                the U.S., be aware that your information may be transferred to, processed, and stored
                in the United States where data protection laws may differ from your home
                jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                VIII. TCPA &amp; MOBILE MESSAGING TERMS (SMS/TEXT PROGRAMS)
              </h2>
              <p className="mb-4">
                This section applies when you provide a mobile telephone number and expressly opt in
                to receive SMS/text messages from BCC.
              </p>

              <h3 className="mt-4 mb-3 text-sm font-bold text-true-black">1. How to Opt In</h3>
              <p>Opt in to BCC text programs by:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  Checking an SMS/text consent box (not pre-checked) on a BCC registration, donation,
                  or sign-up form and submitting your mobile number;
                </li>
                <li>
                  Texting a published BCC keyword to a BCC short code or 10-digit number; or
                </li>
                <li>
                  Providing written or digital consent in another clearly disclosed manner.
                </li>
              </ul>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                2. Program Description &amp; Message Types
              </h3>
              <p>
                By opting in, you agree to receive recurring SMS/text messages from BCC that may
                include program registrations &amp; reminders, waitlist notices &amp; schedule
                changes, learning prompts, volunteer &amp; mentor opportunities, fundraising and
                donation appeals, and impact updates.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                3. Message Frequency
              </h3>
              <p>
                Message frequency varies by program and season. BCC strives to limit messaging to
                what&apos;s relevant and useful.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">4. Cost Disclosure</h3>
              <p>Message &amp; data rates may apply. Check your mobile plan for details.</p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                5. Automated Technology Disclosure
              </h3>
              <p>
                Some BCC text messages may be sent using automated dialing technology or other
                automated means. Consent to receive automated texts isn&apos;t required to
                participate in any BCC program or make a donation.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                6. Opt-Out Instructions
              </h3>
              <p>Cancel SMS/text messages from BCC anytime:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>Reply STOP to any BCC text;</li>
                <li>Reply with recognized keywords: QUIT, END, CANCEL, UNSUBSCRIBE;</li>
                <li>
                  Email{" "}
                  <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                    info@wearebcc.org
                  </a>{" "}
                  with your mobile number and opt-out request; or
                </li>
                <li>Update communication preferences in your BCC account (where available).</li>
              </ul>
              <p className="mt-3">
                SMS opt-out requests are honored within 10 business days (typically much faster).
                Reply-text opt-outs are usually immediate.
              </p>

              <h3 className="mt-6 mb-3 text-sm font-bold text-true-black">
                7. Help &amp; Customer Care
              </h3>
              <p>
                For BCC text help, reply HELP to any BCC message or email{" "}
                <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                  info@wearebcc.org
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                IX. DATA SECURITY &amp; RETENTION
              </h2>
              <p>
                BCC uses administrative, technical, and physical safeguards protecting Personal
                Information against loss, misuse, unauthorized access, disclosure, alteration, and
                destruction. No data transmission or storage system guarantees 100% security. BCC
                retains Personal Information as long as needed to provide requested services, satisfy
                legal requirements, resolve disputes, and enforce agreements. When no longer needed,
                BCC takes steps to delete, de-identify, or aggregate it.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                X. CHANGES TO THIS PRIVACY POLICY
              </h2>
              <p>
                BCC may update this Privacy Policy to reflect operational, legal, or regulatory
                changes. The updated version will be posted on Sites and the &quot;Last updated&quot;
                date revised above. In some cases, BCC may provide additional notice or request
                renewed consent as required by law.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                XI. CONTACT US
              </h2>
              <p>
                For questions, concerns, or requests regarding this Privacy Policy or privacy
                practices, contact BCC:
              </p>
              <div className="mt-4 space-y-1">
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                    info@wearebcc.org
                  </a>
                </p>
                <p>
                  <strong>Mail:</strong> Beyond Code Collective, 1736 Franklin St., Suite 100,
                  Oakland, CA 94612 USA
                </p>
              </div>
            </section>

            <p className="mt-12 border-t border-grey-2 pt-8 text-sm text-grey-3">
              &copy; 2025 Beyond Code Collective, Inc. All Rights Reserved.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </NewsletterProvider>
  );
}

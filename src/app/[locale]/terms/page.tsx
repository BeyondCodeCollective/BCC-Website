import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterProvider } from "@/components/newsletter-modal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Beyond Code Collective",
  description:
    "Beyond Code Collective Terms of Use. Read our terms governing use of our websites and services.",
};

export default function TermsOfUsePage() {
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
              TERMS OF USE
            </h1>
            <p className="mt-4 text-sm text-grey-3">Last updated: July 17, 2025</p>
          </header>

          <div className="legal-content space-y-8 text-base leading-relaxed text-charcoal">
            <p>
              Use of the Sites signifies your agreement to these Terms of Use (&quot;Terms of
              Use&quot;).
            </p>
            <p className="font-semibold">
              PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING THE SITES.
            </p>
            <p>
              The following Terms of Use apply to the Beyond Code Collective website (
              <a href="https://wearebcc.org" className="text-cobalt underline">
                wearebcc.org
              </a>
              ), the BCC Learning Platform, (collectively, the &quot;Sites&quot;) owned and operated
              by Beyond Code Collective (&quot;Beyond Code Collective,&quot; &quot;BCC,&quot;
              &quot;us,&quot; &quot;we,&quot; or &quot;our&quot;).
            </p>
            <p>
              By accessing, browsing, and/or using the Sites, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Use in their entirety, including
              any modifications, which are incorporated by reference. In addition, you agree to
              comply with all applicable laws, rules, and regulations governing your use of the
              Sites. If you do not agree to these Terms of Use, you are not permitted to access,
              browse, or use the Sites.
            </p>
            <p>
              The Sites are intended for individuals 13 years of age or older. If you are under 18,
              your parent or legal guardian must read and accept these Terms of Use on your behalf. If
              you become aware of anyone using the Sites who is under 13 without parental or legal
              guardian consent, please report it to{" "}
              <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                info@wearebcc.org
              </a>
              .
            </p>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                I. PROPRIETARY RIGHTS; USE OF CONTENT
              </h2>
              <p>
                The Sites are owned and operated by Beyond Code Collective and, in certain instances,
                its affiliates, licensors, and third-party service providers. Unless otherwise
                indicated, all content on the Sites (&quot;Content&quot;) is the property of BCC and
                its affiliates, members, licensors, and third-party service providers and is
                protected by U.S. and international copyright, trademark, and intellectual property
                laws.
              </p>
              <p className="mt-4">
                All trademarks, service marks, trade names, logos, and other indicia of origin
                (&quot;Marks&quot;) appearing on the Sites are the property of BCC, its affiliates,
                licensors, and third-party service providers. You may not use any Content or Marks
                without prior written consent.
              </p>
              <p className="mt-4">
                No Content from the Sites may be copied, reproduced, republished, translated,
                uploaded, posted, transmitted, or distributed in any way, except that you may
                download one copy for personal, non-commercial use, provided all copyright and
                proprietary notices remain intact.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                II. YOUR CONDUCT
              </h2>
              <p>When using the Sites, you agree to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Not disrupt or interfere with the security, functionality, or accessibility of the
                  Sites.
                </li>
                <li>
                  Not use the Sites for unlawful, defamatory, harassing, abusive, obscene, vulgar,
                  sexually explicit, or discriminatory purposes.
                </li>
                <li>
                  Not disrupt or interfere with any other user&apos;s enjoyment of the Sites.
                </li>
                <li>
                  Not use framing techniques, meta tags, or &quot;hidden text&quot; incorporating
                  BCC&apos;s intellectual property without express written consent.
                </li>
                <li>
                  Not use the Sites for commercial purposes, including unsolicited advertising or
                  spam.
                </li>
                <li>
                  Not scrape, index, or copy material from the Sites using automated devices or
                  processes.
                </li>
                <li>
                  Not disassemble, decompile, reverse engineer, or attempt to obtain the Sites&apos;
                  source code.
                </li>
                <li>
                  Not attempt unauthorized access to restricted areas of the Sites.
                </li>
              </ul>
              <p className="mt-4">
                You agree to report any fraudulent, abusive, or suspicious activity and to cooperate
                with BCC in any related investigation.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                III. FORUM, BLOG, EVENTS, AND POSTING POLICY
              </h2>
              <p>
                Certain areas of the Sites may allow for the submission of User Content, including
                photos, videos, testimonials, and written posts. By using these features, you agree
                that:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  You will not post unlawful, defamatory, harassing, obscene, or misleading content.
                </li>
                <li>You will not upload copyrighted material without permission.</li>
                <li>You will not post personal information about others without consent.</li>
                <li>You will not post false, misleading, or impersonated content.</li>
                <li>You will not upload harmful software, viruses, or spam.</li>
              </ul>
              <p className="mt-4">
                By submitting User Content, you grant BCC a non-exclusive, worldwide, royalty-free
                license to use, reproduce, modify, and distribute your content across media
                platforms. You retain ownership rights but acknowledge that BCC may remove any content
                at its discretion.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                IV. ACCOUNTS, PASSWORDS, AND SECURITY
              </h2>
              <p>
                Certain areas of the Sites require registration. You agree to provide accurate
                information and maintain confidentiality of your account credentials. You are
                responsible for all activities under your account and must report unauthorized use
                immediately.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                V. LINKS AND THIRD PARTIES
              </h2>
              <p>
                Links to third-party websites are provided for convenience. BCC is not responsible
                for the content, security, or privacy policies of third-party sites. You access them
                at your own risk.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                VI. DIGITAL MILLENNIUM COPYRIGHT ACT
              </h2>
              <p>
                If you believe content on the Sites infringes your copyright, please provide the
                following information to{" "}
                <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                  info@wearebcc.org
                </a>{" "}
                with &quot;DMCA Request&quot; in the subject line:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Your contact information and signature.</li>
                <li>
                  A description of the copyrighted work and its location on the Sites.
                </li>
                <li>
                  A statement of good faith belief that the disputed use is unauthorized.
                </li>
                <li>A statement under penalty of perjury that your claim is accurate.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                VII. PRIVACY POLICY
              </h2>
              <p>
                Please review our{" "}
                <a href="/privacy" className="text-cobalt underline">
                  Privacy Policy
                </a>{" "}
                for details on how we use your personal information.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                VIII. CHANGES TO SITES
              </h2>
              <p>
                BCC may add, change, or discontinue any part of the Sites at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                IX. TERMINATION
              </h2>
              <p>
                BCC may suspend or terminate access to the Sites at its sole discretion, including
                for violations of these Terms of Use.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                X. DISCLAIMER
              </h2>
              <p>
                The Sites and Content are provided &quot;as is&quot; without warranties of any kind.
                BCC disclaims all warranties, including implied warranties of merchantability, fitness
                for a particular purpose, and non-infringement. BCC does not guarantee uninterrupted
                or error-free operation of the Sites.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                XI. LIMITATION OF LIABILITY
              </h2>
              <p>
                BCC is not liable for damages, claims, or losses arising from: use of the Sites or
                Content; inability to use the Sites; unauthorized access to data; system outages,
                service interruptions, or software errors. BCC&apos;s liability is limited to amounts
                paid by you for access to the Sites.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                XII. INDEMNIFICATION
              </h2>
              <p>
                You agree to indemnify BCC from any claims, damages, or liabilities arising from your
                violation of these Terms of Use.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                XIII. PERMISSION FOR WEB LINKING
              </h2>
              <p>
                You may link to the Sites only with prior written consent and in a manner that does
                not misrepresent your affiliation with BCC.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                XIV. FORCE MAJEURE
              </h2>
              <p>
                BCC is not responsible for service interruptions due to circumstances beyond its
                control, including natural disasters, cyberattacks, or network failures.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                XV. GOVERNING LAW
              </h2>
              <p>
                These Terms of Use are governed by the laws of the State of Maryland. Any disputes
                shall be resolved in the state or federal courts in Prince George&apos;s County,
                Maryland.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                XVII. CONSENT TO COMMUNICATIONS UNDER TCPA
              </h2>
              <p>
                By providing your phone number through the Sites or during program registration, you
                expressly consent to receive non-marketing and marketing calls and text messages from
                BCC or our service providers, including through the use of an automatic telephone
                dialing system (autodialer) or pre-recorded voice messages, in compliance with the
                Telephone Consumer Protection Act (&quot;TCPA&quot;).
              </p>
              <p className="mt-4">You understand that:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  Consent is not a condition of participation in BCC programs or use of the Sites.
                </li>
                <li>Message and data rates may apply.</li>
                <li>
                  You can opt out of these communications at any time by replying STOP to a text
                  message or emailing{" "}
                  <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                    info@wearebcc.org
                  </a>{" "}
                  with your opt-out request.
                </li>
              </ul>
              <p className="mt-4">
                You certify that you are the account holder or have the authority to provide this
                consent on behalf of the phone number submitted.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold tracking-[0.1em] text-true-black" style={{ fontFamily: "var(--font-mono)" }}>
                XVIII. CONTACT US
              </h2>
              <p>
                For questions about these Terms of Use or communications practices, please contact
                us at:
              </p>
              <div className="mt-4 space-y-1">
                <p>Beyond Code Collective</p>
                <p>1736 Franklin St., Suite 100</p>
                <p>Oakland, CA 94612</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@wearebcc.org" className="text-cobalt underline">
                    info@wearebcc.org
                  </a>
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

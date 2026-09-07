"use client";

import { Carousel, LogoWall } from "@loamui/ui";
import type { Composition } from "./types";

/* Placeholder marks. On a real page each of these is an img with the
   organisation's name as its alt; here they are inline svgs with role="img"
   and the same name, so the demo needs no assets. Five shapes, from square
   to five times wider than tall, so the shared height has work to do. */

/** A square mark, 1:1. */
function AcmeLogo() {
  return (
    <svg role="img" aria-label="Acme" viewBox="0 0 40 40" fill="currentColor">
      <path d="M4 4h32v32H4Z" fillOpacity=".12" />
      <path d="m20 8 12 24H8Z" />
    </svg>
  );
}

/** A mark and two letters, 2:1. */
function GlobexLogo() {
  return (
    <svg role="img" aria-label="Globex" viewBox="0 0 80 40" fill="currentColor">
      <circle cx="20" cy="20" r="14" fillOpacity=".12" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
      <text x="42" y="28" fontSize="24" fontWeight="700">
        GX
      </text>
    </svg>
  );
}

/** A mark, 1.5:1. */
function UmbrellaLogo() {
  return (
    <svg role="img" aria-label="Umbrella" viewBox="0 0 60 40" fill="currentColor">
      <path d="M6 22a24 24 0 0 1 48 0Z" />
      <path d="M28 22h4v12a4 4 0 0 1-8 0h4Z" />
    </svg>
  );
}

/** A wordmark, 3.5:1. */
function NorthwindLogo() {
  return (
    <svg role="img" aria-label="Northwind" viewBox="0 0 140 40" fill="currentColor">
      <text x="70" y="28" fontSize="24" fontWeight="700" textAnchor="middle">
        Northwind
      </text>
    </svg>
  );
}

/** A spaced wordmark, 5:1. */
function InitechLogo() {
  return (
    <svg role="img" aria-label="Initech" viewBox="0 0 200 40" fill="currentColor">
      <text x="100" y="28" fontSize="22" fontWeight="600" letterSpacing="6" textAnchor="middle">
        INITECH
      </text>
    </svg>
  );
}

/** A second page of marks for the scrolling demo. */
function VandelayLogo() {
  return (
    <svg role="img" aria-label="Vandelay" viewBox="0 0 120 40" fill="currentColor">
      <path d="m8 8 12 24 12-24Z" />
      <text x="40" y="28" fontSize="22" fontWeight="700">
        Vandelay
      </text>
    </svg>
  );
}

function HooliLogo() {
  return (
    <svg role="img" aria-label="Hooli" viewBox="0 0 40 40" fill="currentColor">
      <circle cx="20" cy="20" r="18" fillOpacity=".12" />
      <path d="M12 10h5v8h6v-8h5v20h-5v-8h-6v8h-5Z" />
    </svg>
  );
}

function WonkaLogo() {
  return (
    <svg role="img" aria-label="Wonka" viewBox="0 0 100 40" fill="currentColor">
      <text x="50" y="30" fontSize="28" fontWeight="700" fontStyle="italic" textAnchor="middle">
        Wonka
      </text>
    </svg>
  );
}

function TyrellLogo() {
  return (
    <svg role="img" aria-label="Tyrell" viewBox="0 0 160 40" fill="currentColor">
      <path d="M4 4h32v32H4Z" fillOpacity=".12" />
      <path d="M12 12h16v4h-6v12h-4V16h-6Z" />
      <text x="48" y="28" fontSize="22" fontWeight="600" letterSpacing="3">
        TYRELL
      </text>
    </svg>
  );
}

function StarkLogo() {
  return (
    <svg role="img" aria-label="Stark" viewBox="0 0 60 40" fill="currentColor">
      <path d="M30 4 8 36h44Z" fillOpacity=".12" />
      <path d="M30 12 16 32h28Z" />
    </svg>
  );
}

const logoWall: Composition = {
  slug: "logo-wall",
  name: "Logo wall",
  category: "Page sections",
  description:
    "A row of client or partner logos, each an image with the organisation's name, sized to one shared height so marks of any shape read as one set.",
  lead: 'The unit is the logo: a list item that sizes the image inside it to one shared height, the public --loam-logo-size (2.5rem by default), and lets the width follow from the image\'s own aspect ratio, so a square mark and a wide wordmark sit together. The optional Root is a ul with role="list", because list-style none drops the list semantics in some browsers, so assistive technology announces how many there are. Every image carries the organisation\'s name as its alt, never "logo", and a logo that links out lends that name to its link. No greyscale filter: brands own their colour.',
  importLine: `import { LogoWall } from "@loamui/ui";`,
  parts: [
    {
      name: "LogoWall.Item",
      description:
        "One logo: an li that sizes the img (or inline svg) inside it to --loam-logo-size, 2.5rem by default, its width following the image's own aspect ratio. Wrap the img in an a to link out; the link takes the elements-layer focus ring. Works in a list of your own or inside a Root; pass render={<div />} where there is no list.",
    },
    {
      name: "LogoWall.Root",
      description:
        'Optional. A ul with role="list" that wraps the logos into a centred row and declares its own container. Set --loam-logo-size here to resize every logo at once, and label it with aria-label or aria-labelledby when the page has more than one list.',
    },
  ],
  demos: [
    {
      title: "Trusted by",
      description:
        'Five marks, from square to five times wider than tall, at one height. Each placeholder is an svg with role="img" and the organisation\'s name; on a real page it is an img with that name as its alt. Northwind links out, and the link carries the name.',
      code: `<h2 id="trusted-by">Trusted by</h2>
<LogoWall.Root aria-labelledby="trusted-by">
  <LogoWall.Item>
    <AcmeLogo />
  </LogoWall.Item>
  <LogoWall.Item>
    <a href="https://northwind.example">
      <NorthwindLogo />
    </a>
  </LogoWall.Item>
  <LogoWall.Item>
    <GlobexLogo />
  </LogoWall.Item>
  <LogoWall.Item>
    <InitechLogo />
  </LogoWall.Item>
  <LogoWall.Item>
    <UmbrellaLogo />
  </LogoWall.Item>
</LogoWall.Root>`,
      render: () => (
        <>
          <h2 id="trusted-by">Trusted by</h2>
          <LogoWall.Root aria-labelledby="trusted-by">
            <LogoWall.Item>
              <AcmeLogo />
            </LogoWall.Item>
            <LogoWall.Item>
              <a href="https://northwind.example">
                <NorthwindLogo />
              </a>
            </LogoWall.Item>
            <LogoWall.Item>
              <GlobexLogo />
            </LogoWall.Item>
            <LogoWall.Item>
              <InitechLogo />
            </LogoWall.Item>
            <LogoWall.Item>
              <UmbrellaLogo />
            </LogoWall.Item>
          </LogoWall.Root>
        </>
      ),
    },
    {
      title: "Scrolling",
      description:
        "Ten marks, five to a page, inside a Carousel: each Carousel.Item holds a LogoWall.Root, so the track pages through walls and the reader scrolls when they choose to. An li cannot sit inside an li, so the page, not the logo, is the carousel's item.",
      code: `<Carousel.Root aria-labelledby="partners">
  <h2 id="partners">Partners</h2>
  <Carousel.Track>
    <Carousel.Item>
      <LogoWall.Root>
        <LogoWall.Item>
          <AcmeLogo />
        </LogoWall.Item>
        <LogoWall.Item>
          <NorthwindLogo />
        </LogoWall.Item>
        <LogoWall.Item>
          <GlobexLogo />
        </LogoWall.Item>
        <LogoWall.Item>
          <InitechLogo />
        </LogoWall.Item>
        <LogoWall.Item>
          <UmbrellaLogo />
        </LogoWall.Item>
      </LogoWall.Root>
    </Carousel.Item>
    <Carousel.Item>
      <LogoWall.Root>
        <LogoWall.Item>
          <VandelayLogo />
        </LogoWall.Item>
        <LogoWall.Item>
          <HooliLogo />
        </LogoWall.Item>
        <LogoWall.Item>
          <WonkaLogo />
        </LogoWall.Item>
        <LogoWall.Item>
          <TyrellLogo />
        </LogoWall.Item>
        <LogoWall.Item>
          <StarkLogo />
        </LogoWall.Item>
      </LogoWall.Root>
    </Carousel.Item>
  </Carousel.Track>
  <Carousel.Controls />
</Carousel.Root>`,
      render: () => (
        <Carousel.Root aria-labelledby="partners">
          <h2 id="partners">Partners</h2>
          <Carousel.Track>
            <Carousel.Item>
              <LogoWall.Root>
                <LogoWall.Item>
                  <AcmeLogo />
                </LogoWall.Item>
                <LogoWall.Item>
                  <NorthwindLogo />
                </LogoWall.Item>
                <LogoWall.Item>
                  <GlobexLogo />
                </LogoWall.Item>
                <LogoWall.Item>
                  <InitechLogo />
                </LogoWall.Item>
                <LogoWall.Item>
                  <UmbrellaLogo />
                </LogoWall.Item>
              </LogoWall.Root>
            </Carousel.Item>
            <Carousel.Item>
              <LogoWall.Root>
                <LogoWall.Item>
                  <VandelayLogo />
                </LogoWall.Item>
                <LogoWall.Item>
                  <HooliLogo />
                </LogoWall.Item>
                <LogoWall.Item>
                  <WonkaLogo />
                </LogoWall.Item>
                <LogoWall.Item>
                  <TyrellLogo />
                </LogoWall.Item>
                <LogoWall.Item>
                  <StarkLogo />
                </LogoWall.Item>
              </LogoWall.Root>
            </Carousel.Item>
          </Carousel.Track>
          <Carousel.Controls />
        </Carousel.Root>
      ),
    },
  ],
  whenToUse: [
    "A strip of client, partner or press marks under a hero or above a footer, where the count and the names matter more than any one mark: the list announces how many, and each image names its organisation.",
    "Logos of mixed shapes from sources you do not control, a square app icon beside a wide wordmark, each supplied at its own size; the shared height makes them one set without editing the files.",
  ],
  whenNotToUse: [
    "A marquee that auto-scrolls: motion the reader did not ask for, and a name that moves cannot be read. Put the logos in a Carousel instead; it scrolls when the reader scrolls it.",
    "One brand on its own: a mark that is a link home is Header.Brand, and a mark that carries a claim, an award or a certification, is a figure with a caption that states the claim.",
  ],
};

export default logoWall;

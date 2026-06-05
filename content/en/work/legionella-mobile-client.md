---
title: Legionella mobile client
order: 5
description: Run the Spartan Legionella Test with your phone.
featureImage: '/images/legionella-mobile-client/legionella-mobile-feature.jpg'
tools:
  - {
      name: Adobe XD,
      img: /images/tools/xd.svg,
      href: https://www.adobe.com/ca/products/xd.html,
    }
  - {
      name: Framer,
      img: /images/tools/framer.svg,
      href: https://www.framer.com/,
    }
  - {
      name: React Native,
      img: /images/tools/react.svg,
      href: https://reactnative.dev/,
    }
  - {
      name: Theo,
      img: /images/tools/theo.png,
      href: https://github.com/salesforce-ux/theo,
    }
---

# Legionella mobile client

![Legionella mobile prototype](/images/legionella-mobile-client/legionella-mobile-feature.jpg 'Legionella mobile prototype')

I was the sole designer on a mobile client for Spartan's Legionella Test, working with a mobile developer to bring a laptop-based system to iOS and Android. Most core features were designed and built before the project was cancelled when the company wound down.

## The problem

The original system ran on a laptop connected to the Spartan Cube via cable, one laptop per Cube, wired. Facilities managers running tests across larger sites needed multiple systems, had to manually check each laptop for results, and were dealing with a significant physical footprint. The system worked; real-world use had made the limitations clear.

The redesign addressed these directly:

- Mobile control replacing the dedicated laptop
- Wireless connectivity via Bluetooth Low Energy (BLE)
- Support for monitoring multiple Cubes simultaneously
- Results pushed to a remote server

Core features from the original were carried over: a guided test workflow, step-by-step instructions, and a searchable result log.

## Structure and wireframes

I began by mapping the app's structure around use cases rather than data types, arriving at five sections: test workflow, Cube status, result log, settings, and water source management.

Wireframes followed for the key screens. The instruction screen needed primary actions reachable without stretching on large phones, which ruled out several top-heavy layouts early. For the result log, I worked through four approaches before the wireframes showed that a segmented list with sticky headers gave the best balance of information density and ease of use.

![Instruction screen wireframes](/images/legionella-mobile-client/instructions-wire.png 'Instruction screen wireframes')

![Log screen wireframes](/images/legionella-mobile-client/log-wire.png 'Log screen wireframes')

Navigation was an open question. I built a prototype in Adobe XD, loaded it on my phone, and ran hallway tests. The bottom bar layout won; participants liked the quick path to starting a test, and found the result log card on the landing screen confusing.

![Landing screen wireframes](/images/legionella-mobile-client/landing-wire.png 'Landing screen wireframes')

<video src="/images/legionella-mobile-client/navigation.webm" controls muted style="max-height: 400px;" poster=/images/legionella-mobile-client/navigation-poster.png></video>

## Design and prototype

After wireframing I moved to Framer, writing a fully interactive prototype with live data and coded interactions. This was the primary handoff tool; the developer flagged anything that couldn't be implemented or needed revision, and we worked through it together.

<video src="/images/legionella-mobile-client/prototype.webm" controls muted style="max-height: 400px;" poster=/images/legionella-mobile-client/prototype-poster.png></video>

The Cube status screen required a workaround for BLE's fundamental limitation: Bluetooth only connects 1-to-1, which would have broken multi-Cube monitoring entirely. Working with the developer, we landed on reading the advertising packets Cubes broadcast passively rather than maintaining a continuous connection. For a running test, we combined a timer (tests take just under an hour) with any packet updates available when in range. Users out of range when a test completed got a notification; those nearby received the result from the BLE advertisement directly. Cubes could also be given meaningful names, and the result log supported filtering.

<img src="/images/legionella-mobile-client/applied-filters.png" alt="Applied filters" title="Applied filters" style="max-width: 200px;">

One problem that wasn't resolved before the project ended: the result filter's double slider. The range of meaningful values was tightly clustered at the low end of a 0-1000 scale, making it difficult to use precisely. The fix was planned (replacing it with checkboxes) but wasn't scheduled before cancellation.

## Development

I extended the design tokens from [Schedio](/work/schedio) in Theo to add a TypeScript definition format and React Native-specific transformations, giving the developer a consistent styling foundation. I also contributed to styling code on the implementation side.

## Outcome

Most core features were designed and built before Spartan wound down. The project didn't reach production, but the design work held up; the wireframing and prototype process uncovered real usability issues early, and the BLE constraint produced a workable solution that would have been genuinely useful in the field.

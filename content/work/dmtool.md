---
title: DMTool
description: A tool to make running Dungeons & Dragons easier.
featureImage: /images/dmtool/dmtool-feature.png
links:
  - { title: DMTool, href: https://dmtool.acollier.ca }
  - { title: Code on GitHub, href: https://github.com/alexkcollier/dmtool }
  - { title: Dice roller code, href: https://github.com/alexkcollier/dice-roller-dnd }
tools:
  - { name: Vue.js, img: /images/tools/vue.svg, href: https://vuejs.org }
  - { name: Nuxt.js, img: /images/tools/nuxt.svg, href: https://nuxtjs.org }
  - { name: Sass, img: /images/tools/sass.svg, href: https://sass-lang.com }
  - { name: Firebase, img: /images/tools/firebase.svg, href: https://firebase.google.com/ }
  - { name: PWA, img: /images/tools/pwa.png, href: https://web.dev/progressive-web-apps/ }
---

# DMTool

<img src="/images/dmtool/dmtool-window.png" title="DMTool" alt="DMTool">

Back when I was running a weekly D&D game, I got tired of flipping through all the various books to
find whatever creature, spell, or item I needed to reference. Plus, when you have to look up
multiple things in separate books, it takes up a lot of space.
[D&D Beyond](https://www.dndbeyond.com/) didn't exist yet, so I built my own solution. This is where
I learned Vue and JavaScript, so it was a fantastic learning experience. I know there are things I
didn't do quite "right", but it works well enough for my needs.

<video src="/images/dmtool/dmtool-demo.webm" controls preload="none" muted poster="/images/dmtool/dmtool-demo-poster.png"></video>

When I started out, I only intended for DMTool to be a lookup for magic items, spells, and
creatures. The initial feature set ended up looking like this:

- Creatures page
- Items page
- Spells page
- Rudimentary search by name
- Data filters

After implementing this initial feature set, I began using the app to run the game, and found a few
more features that would be helpful. Those were:

- A way to save a list of creatures so I didnt't have to update my search during encounters
- Proper fuzzy search, since it's hard to remember exact names for so much
- Offline support&mdash;I didn't always have access to internet while playing
- Dice rolling (this was really more of a "for fun" feature)
- Persisting encounter and dice data across browser sessions, so I didn't have to leave the tab open
  all the time

I structured the site based on the data types I was concerned with, and on players' mental model of
the data. This meant a page each for creatures, magic items, spells, encounter tracking, and dice
rolling.

## Design

Since it's a D&D app, I wanted it to match the styling of the 5th edition books. I used
[Bulma](https://bulma.io), and its fonts and colours appropriately to get up and running. Since this
was a personal project, I didn't give much mind to creating any prototypes or mockup; I just
designed straight in code. Between Bulma, and the books, I had enough design guidance to get going.

I did make sure to consider the form-factor of the devices I was designing for, and the reality that
I was working with a large amount of data.

![DMTool uses design patterns suited to the platform it is used on](/images/dmtool/dmtool-responsive.png 'DMTool is reponsive')

On mobile, the primary navigation moves to the bottom for easy thumb access. The search bar also
becomes fixed at the top of the screen. A button to return to the top of the screen appears after
scrolling down, because these pages get _long_.

I made use of animations and transitions on just about every interaction to help the app feel less
like a collection of pages, and more of a fluid system. I kept the primary action readily accessible
to the user, but collapsed more advanced features. Any form inputs, like searching and filtering,
update on user input. They're also persisted across navigation, since it's not unreasonable to need
to reference an item and spell at the same time.

On the otherhand, the [dice roller](https://dmtool.acollier.ca/roll-dice) allows you to set
everything up before the app does anything else.

![DMTool dice roller](/images/dmtool/dmtool-roller.png 'Dice rolling in DMTool')

## Development

DMTool makes use of a [JAMstack](https://jamstack.org/) architecture. Data is stored in Firebase,
Netlify handles builds and deploys, and a Vue/Nuxt SPA handles the front-end concerns. User inputs
are persisted in `localStorage`, while remote data is cached by a service worker.

DMTool was built when I was still really new to development, so the process was far from organized
or linear. I jumped around based on what I felt like doing, or what was broken. It taught me _a lot_
about the tradeoffs you need to make betwen design and development though.

A great example of this is fuzzy search. Generally, I would say it provides a better experience for
the user since it allows them to make mistakes, or simply have a vague idea of what they're looking
for. It's not necessarily trivial to implement though, given the various permutations of search
terms.

My initial take on this was searching for strings that include the search term (rather than starting
with, or exact matches), but that missed the mark. Don't get me wrong, it was a good starting point
and let me get the app running sooner, but search can be so much better.

### Offline support

![DMTool installed on Android](/images/dmtool/dmtool-pwa.png 'DMTool is a progressive web application')

At some point I wanted to be able to use the app without relying on wifi, or my mobile data. I
started looking for solutions that didn't require building an actual mobile app. Eventually I found
that [progressive web application](https://web.dev/progressive-web-apps/) would let me build a
website that I could install on my phone and could behave much like a native app. Obviously, I
jumped on the opportunity.

[`@nuxtjs/pwa`](https://pwa.nuxtjs.org/) let me easily add this functionality to my Vue application.
I configured it to cache assets like fonts and icons on install, since those are used everywhere. To
speed up installs, I only cached item, creature, or spell data after the page had been visited. I
also wrote a
[custom service worker](https://github.com/alexkcollier/dmtool/blob/master/static/data-sw.js) to
handle loading this data form the cache first while making a network request for updated data in the
background. When that request completes, the user will be prompted to refresh.

### `dice-roller-dnd`

To help with the dice roller in dmtool, I also wrote
[`dice-roller-dnd`](https://www.npmjs.com/package/dice-roller-dnd). It supports rolling the standard
RPG dice, as well as dice of any size. It also includes some of the common types of dice rolls in
D&D 5th edition, like advantage/disadvantage, and re-rolling results.

## Future plans

I'm pretty happy with how this project turned out. It's comprehensive and easy to use. That said,
there are some improvements that could be made.

- The encounter manager is really basic, and could be exended.
- When I told my players about it, they mentioned it would be nice for them to track their spell
  lists and inventories in it.
- The ability to hide certain items or creatures from players would be nice. Sometimes you want to
  make sure your players are surprised.
- Move the data to a better datastore and handle it better. I know I'm not handling this the best,
  and the payloads are _huge_.
- Tests and error handling. Sometimes the data isn't what DMTool is expecting, and the app just
  blows up. Tests and error handling would help me catch that sooner and provide a better experience
  for users.

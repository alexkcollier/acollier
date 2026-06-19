---
title: Customizable Dashboard
order: 2
tags: [Design, Development, Data]
featured: true
featureImage: '/images/customizable-dashboard/dashboard-feature.png'
description: Customizable analytics dashboard with a drag-and-drop editor
tools:
  - { name: Figma, img: /images/tools/figma.svg, href: https://www.figma.com }
  - { name: React, img: /images/tools/react.svg, href: https://react.dev }
  - {
      name: TypeScript,
      img: /images/tools/typescript.svg,
      href: https://www.typescriptlang.org,
    }
  - { name: MUI, img: /images/tools/mui.svg, href: https://mui.com }
---

# Customizable Dashboard

![A highly-configurable dashboard allowing at-a-glance insights](/images/customizable-dashboard/dashboard-feature.png 'The dashboard with Add Widget dialog open')

## TL;DR

Designed and built a customizable dashboard from the ground up for an AI text analytics platform serving the CX industry. End-to-end ownership: competitive research, UX design, internal testing, and front-end implementation. The dashboard became the primary entry point to the application and a key factor in closing and renewing multiple clients.

## Context

**Product:** An AI text analytics platform for the CX industry. An NLP pipeline extracted topic-opinion pairs from free-form customer feedback, classifying them as praises, problems, suggestions, questions, or neutral, and scoring them. The platform integrated with many data sources and augmented analysis with generative AI.

**My role:** Sole designer and front-end implementer

**Timeline:** Initial release Q3-Q4 2021, with iterative feature releases through 2025

## The problem

The platform surfaced rich, structured insight from customer feedback (sentiment breakdowns, topic analysis, volume trends, source data) but only through static table and chart views. A fixed dashboard existed, but it was completely uncustomizable; every client saw the same thing regardless of what they actually needed to monitor. There was no way to tailor the interface to a specific use case, and the product's depth was not visible in sales demos. Clients had limited reason to log in regularly.

![The previous dashboard had next to no customization](/images/customizable-dashboard/old-dashboard.png 'The old dashboard')

## What I did

I led the project from competitive research through production implementation, designing and building a fully customizable dashboard with a layout editor, a configurable widget system, multiple chart types, internal sharing, public unauthenticated views, a dashboard switcher, and an add-widget flow.

Three problems shaped the most important decisions.

### The layout editor

Resizing and repositioning widgets only happens in a dedicated edit mode, a deliberate architectural decision that keeps layout changes separate from normal dashboard use. Within that mode, the remaining challenge was making the interactions precise and clear: supporting drag and drop, communicating what resize and reposition gestures would do before a user committed to them, keeping the grid compact without overriding the intended layout, and ensuring click targets were distinct enough to avoid misfires. This required designing and speccing each widget state explicitly (base, edit, resize X, resize Y, hover drag, and dragging), each with its own affordances.

Given the complexity of the grid behaviour (compaction logic, resize constraints, drag interactions), I built code prototypes to explore and validate how the interactions would feel before committing to the full implementation. Some interaction problems only surface at runtime; prototyping in code rather than Figma meant the testing that followed was based on realistic behaviour.

Testing with internal users mostly validated the direction. One exception: the icon indicating a widget could be moved was not legible. We updated it and the problem resolved. The other interaction states and affordances held up without changes.

I scoped out one feature during the project: pre-built dashboard templates. They were unnecessary; users could build a suitable first dashboard quickly, the sales team typically set one up during onboarding, and a duplicate feature already gave anyone a path to reuse a dashboard as a starting point.

The dashboard also introduced a new filter model. The original static dashboard had a global filter applied across the whole view. We made a deliberate decision to remove this in favour of widget-level independence, keeping only sentiment filters as global. Each widget could carry its own filters, local and ephemeral, with the option to promote them to global. The tradeoff was intentional: widget independence was more valuable at this stage than cross-dashboard filtering. This was flagged early by the development team and designed upfront.

<video src="/images/customizable-dashboard/layout-editing.webm" controls preload="none" muted poster="/images/customizable-dashboard/layout-editing.png" alt="The dashboard allowed custom layouts, but tried to fill holes in the layout intelligently" title="Layout editing"></video>

![Drag and drop interactions required in-depth interaction states and specs](/images/customizable-dashboard/interaction-states.png 'The spec for interaction states in widgets')

### The color system

The platform charts were built around a semantic color palette tied to feedback categories (green for praise, yellow for problems, blue for suggestions, light purple for questions, grey for neutral). These colors carried meaning. When we added chart types like time series, where colors represent data series rather than feedback categories, that palette could not be reused; the associations would be misleading, and five colors were not enough anyway. We needed a categorical palette that could distinguish up to 20 series clearly, with no implied meaning.

I followed IBM inclusive color sequence methodology closely, generating tints for each hue using Colorbox.io, working out the full palette in Figma, then adapting and extending our MUI theme to implement it systematically. Each color was designed to meet 3:1 contrast against light backgrounds.

![A core set of colours, selected for data visualization](/images/customizable-dashboard/base-palette.png)

Contrast between colors was handled structurally: the grid was organized using a chevron skip so that only hues with sufficient contrast between them were adjacent in sequence, and a usage rule was established to always iterate through the palette in order rather than picking colors freely. The accessibility guarantees are built into the system; they do not depend on individual judgment calls at implementation time.

![A repeating chevron pattern was used to sequence colours](/images/customizable-dashboard/chevron-skip.png 'The chevron-skip selection methodology')

### Focus Recommendations

Focus Recommendations is the application approach to Key Driver Analysis, combining a topic's correlation with satisfaction score changes against its average satisfaction score to surface what is actively driving client satisfaction or dissatisfaction, and where to focus efforts.

I was heavily involved in Focus Recommendations as a standalone feature. The dashboard widget was the piece that brought it into the broader product, translating the four-quadrant driver chart and actionable insights lists so it worked both on the dedicated Focus Recommendations page and as a resizable widget alongside other dashboard content. Adapting the feature filter logic to coexist with the dashboard filter architecture required close collaboration with development to map the differences and find a clean integration point.

![The Focus Recommendations widgets presented their own unique challenges](/images/customizable-dashboard/focus-recommendations-widget.png 'The Focus Recommendations widget')

_Focus Recommendations is covered in depth as a [separate case study ->](/work/focus-recommendations)._

## Outcome

The dashboard shipped in Q3-Q4 2021 and became the primary entry point to the application and the lead feature in client demos. It was cited as a key factor in closing and renewing several clients, meaningful stakes for a small company where each contract counted.

## After launch

The dashboard continued to evolve. The initial widget set was minimal and largely fixed (sentiment scores, volume, record counts, source breakdowns, top topics). These were progressively replaced by fully customizable chart widgets: bar charts, time series, data tables, pie charts, a number widget, and a reworked heatmap. A third wave added more complex, analytically advanced widgets: rich text notes, matrix questions, and Focus Recommendations.

A dashboard-level filter also shipped in a later cycle, reintroducing cross-dashboard filtering in a more powerful form. Applied across all widgets simultaneously, always narrowing rather than widening their individual filters, and independent of the application's global analysis filters, it allowed users to slice a whole dashboard without losing the independent context each widget carried. The filter model, designed upfront to support widget-level independence, extended cleanly to accommodate it.

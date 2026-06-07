---
title: Focus Recommendations
order: 1
featureImage: '/images/focus-recommendations/focus-recommendations-feature.png'
description: Key driver analysis tool for CX satisfaction scores
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

# Focus Recommendations

![Focus Recommendations provided key insights on what needs attention, now](/images/focus-recommendations/focus-recommendations-feature.png 'The Focus Recommendations page')

## TL;DR

Designed Focus Recommendations, the application's approach to Key Driver Analysis, from the ground up. The feature translated complex correlation and satisfaction data from our NLP/stats team into actionable insight for CX professionals: which topics were driving their scores, and where to focus efforts. It shipped in August 2022, later gained AI-generated recommendations, and became a key demo feature and factor in closing clients. As the product matured, I identified that a newer feature had superseded most of its functionality, and contributed to the roadmap to retire it.

## Context

**My role:** End-to-end design, internal testing and iteration; implementation contributions on the FR chart and Actionable Insights widgets

**Timeline:** Initial release August 2022; Actionable Insights October 2023

## The opportunity

There was nothing like Focus Recommendations in the product before it. The platform was already strong at surfacing what customers were saying, but it did not tell clients what to do about it. FR was conceived to bridge that gap: not just analysis, but recommendations. A client could see which topics were driving their satisfaction score (whether NPS, CSAT, or another scale) up or down, and where to focus their efforts.

The initial concept came from our NLP/stats team. My role was to translate it into something a CX professional building reports for their stakeholders could actually use.

## What I did

I owned the design end-to-end, translating the statistical concept into something usable, testing and iterating internally, and contributing to implementation on the FR chart and Actionable Insights widgets.

Three design problems defined the project.

### Turning correlation into a visual

The four-quadrant chart handled the big picture; plotting topics by correlation and average satisfaction score made priorities immediately clear. The harder problem was the table view: communicating the same information at a topic level, in a single icon, without requiring users to understand what correlation means.

![The chart allows quick identification of what really needs attention](/images/focus-recommendations/focus-recommendations-feature.png 'Close up on the chart')

I landed on a target-like icon: three concentric rings, where more rings filled indicated stronger impact. Positive or negative impact was communicated through color (green for positive, red for negative), deliberately breaking from our praise/problem palette, since this analysis is based on satisfaction scores rather than our sentiment categories. An arrow icon and correlation percentage reinforced the direction for users with color blindness.

![Impact icons expressed magnitude and polarity](/images/focus-recommendations/target-icons.png 'Target icon variants')

![The table view shows a bit more detail](/images/focus-recommendations/table-view.png)

The first version used an absolute threshold to determine how many rings to fill. Testing revealed the problem: datasets vary significantly across clients, and absolute thresholds produced wildly inconsistent results: some clients seeing mostly three-ring topics, others mostly one. We moved to a relative calculation, setting thresholds against the distribution of results within each dataset. The icon became stable and meaningful regardless of dataset characteristics. Labelling went through similar iteration; the language describing quadrants and impact levels needed to be precise without requiring a statistics background.

### Expanding beyond NPS

The initial release supported a single NPS response-question pair, the most common case but one that excluded clients using other satisfaction scales or running complex surveys with multiple rating-response pairs.

We extended coverage in stages. First, a modal that let users order any field (numeric, or non-numeric, a Likert scale, for example) from least to most satisfied and use it as the response variable. Then support for multiple rating-response pairs, enabling analysis of surveys containing several question sets, a meaningful unlock for enterprise clients running complex research.

![Ratings could be easily re-ordered in terms of satisfaction](/images/focus-recommendations/ratings-configuration.png 'The ratings configuration dialog')

### Actionable Insights

In October 2023 we added Actionable Insights: AI-generated recommendations on how to improve the topics identified as key drivers. Rather than surface recommendations for every topic, I defined selection criteria (the three most correlated negative drivers and three most correlated positive), keeping the output focused and actionable rather than exhaustive.

The recommendations appeared as paginated cards above the chart, each covering a single topic with the option to expand for more detail. I included a dismiss mechanism on each card, which served two purposes: letting users clear recommendations they had acted on or found irrelevant, and giving us an implicit feedback signal on recommendation quality. A PDF export of the full recommendations summary supported the workflow of clients building reports for stakeholders.

The list of key opinions in the table view was also migrated to an AI-generated summary around this time, reducing noise and improving readability.

![Actionable Insights provide real recommendations to improve satisfaction](/images/focus-recommendations/actionable-insights.png 'The Actionable Insights cards')

## What came next

As the Agentic Analysis Report neared the end of beta, I recognised that the two features had converged significantly. The Agentic Analysis Report used elasticity (surfaced to users as "impact" to keep the language accessible) and organised its quadrants differently: strengths, weaknesses, nice-to-have, and a fourth left intentionally unlabelled. It did almost everything Focus Recommendations did, in more detail and with better methodology.

The gap was narrow but real: the Agentic Analysis Report did not yet support non-NPS fields or complex multi-pair surveys. I wrote up a roadmap to bring the two features to parity and retire Focus Recommendations, presented it to the product owner, validated the approach, and turned the items into prioritized backlog tickets. The main gaps to close were support for non-NPS fields and complex multi-pair surveys in the Agentic Analysis Report, and bringing its impact-satisfaction chart to the dashboard. Reusable, saveable filtersets were smaller but also on the list.

This was not a decision made at the outset; it was a product judgment call I made as the two features converged, close to the end of the Agentic Analysis Report beta.

_The dashboard widget that brought Focus Recommendations into the broader product is described in the [Customizable Dashboard case study ->](/work/customizable-dashboard)._

## Outcome

Focus Recommendations shipped in August 2022 and became a key demo feature and a factor in closing at least one client. It represented a meaningful expansion of the product value proposition, from surfacing what customers were saying to telling clients what to do about it. The approach it validated was carried forward and improved in the Agentic Analysis Report.

---
title: CYP2C19 UI
order: 7
description: A medical device user interface designed for ease of use.
featureImage: '/images/cyp2c19-ui/cyp2c19-feature.png'
tools:
  - {
      name: Adobe XD,
      img: /images/tools/xd.svg,
      href: https://www.adobe.com/ca/products/xd.html,
    }
---

# CYP2C19 UI

![Spartan's CYP2C19 UI](/images/cyp2c19-ui/cyp2c19-feature.png "Spartan's CYP2C19 UI")

The CYP2C19 UI is the software component of Spartan Bio's CYP2C19, a rapid DNA test run on the Spartan Cube analyser. I led the design with another designer, holding final approval on decisions, through Spartan's formal design control process. The product received FDA clearance and is still being marketed by the company that acquired Spartan's assets.

## The challenge

Medical device software operates under tight constraints. Requirements are set early, documentation is rigorous, and changes after regulatory submission carry significant costs across the organization. Getting the design right before submission matters.

The original goal was a CLIA waived designation from the FDA, which would have allowed anyone to run the test with minimal training (comparable to a blood glucose meter). The chemistry ultimately landed it at high complexity, but the design target shaped our approach throughout: instructions had to be clear enough for non-specialists, workflows had to be reliable enough to run without error, and the interface had to withstand scrutiny.

Features were defined in the concept and feasibility stages alongside regulatory, technical, and end-user requirements:

- Guided workflows for running a test or a control
- A searchable log of test and control results
- User logins and permissions to protect patient data
- An optional, time-based lock
- An optional training module

We built prototypes in XD and used its handoff features in a tight loop with our Windows developer, refining requirements continuously through the process.

![CYP2C19 UI in XD](/images/cyp2c19-ui/cyp2c19-xd.png 'CYP2C19 UI in XD')

## Guided workflows

Ensuring users could successfully run the test every time was central to the product's value. The guided workflow provided step-by-step instructions and illustrations at every stage, so users never had to guess what came next. For the most critical and complex step (tapping and mixing the sample), we included a video directly in the interface.

<video src="/images/cyp2c19-ui/cyp2c19-workflow.webm" controls preload="none" muted poster="/images/cyp2c19-ui/cyp2c19-feature.png"></video>

## Result log

The log gave users access to all past test and control results, searchable for when records accumulated. Selecting a result showed extended detail. An export feature supported users who maintained their own records systems outside the device.

![Empty result log](/images/cyp2c19-ui/log-empty.png 'Empty result log')
![Result log populated with results](/images/cyp2c19-ui/log.png 'Result log populated with results')
![Log filtered to controls](/images/cyp2c19-ui/log-search.png 'Log filtered to controls')
![Result screen](/images/cyp2c19-ui/result.png 'Result screen')

## Logins and security

User logins protected potentially sensitive patient data. The login form gave clear feedback on failed attempts without revealing which credential was wrong. Users could also scan a barcode to authenticate, a common pattern in clinical settings where staff scan ID badges to access equipment.

![Login screen](/images/cyp2c19-ui/login.png 'Login screen')

![Credential validation only shows something is wrong, not what is wrong](/images/cyp2c19-ui/login.png 'Invalid credentials')

An optional time-based lock let users secure the system when away from it. Since the device can run a test while locked, we added test status to the lock screen; with one laptop per Cube, it was important to show whether the system was busy.

![Locked system with test in progress](/images/cyp2c19-ui/lock-screen.png 'Locked system with test in progress')

Lock settings and user management were restricted to the system administrator.

![System settings](/images/cyp2c19-ui/settings.png 'System settings')
![User settings](/images/cyp2c19-ui/settings-users.png 'User settings')

## Training module

A built-in training module walked users through the entire workflow from sample collection to running the analyser, with clear instructions and supplementary guidance at each step. This supported the goal of minimising the training burden for new users.

![Training module](/images/cyp2c19-ui/training.png 'Training module')

## Outcome

The CYP2C19 UI received FDA clearance. The CLIA waived designation we designed toward wasn't achieved (a function of the test chemistry, not the software), but the design approach held up through the regulatory process. A version of the product is still being marketed by the company that acquired Spartan's assets.

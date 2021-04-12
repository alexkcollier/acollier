---
title: CYP2C19 UI
description: A medical device user interface designed for ease of use.
featureImage: /images/cyp2c19-ui/cyp2c19-feature.png
tools:
  - { name: Adobe XD, img: /images/tools/xd.svg, href: https://www.adobe.com/ca/products/xd.html }
---

# CYP2C19 UI

![Spartan's CYP2C19 UI](/images/cyp2c19-ui/cyp2c19-feature.png "Spartan's CYP2C19 UI")

Medical devices can be challenging to design for. There are numerous concerns and regulations that
must to account for, and they require a great deal of rigor in documentation. It's also critical to
get the design right before submission to a regulatory body (like the FDA), since any changes to the
design after that can have major regulatory impact, and impose a huge burden of work across the
organization. The core team working on this interface was myself, another designer, and a Windows
developer.

The CYP2C19 UI is the software component of Spartan Bio's
[CYP2C19 Test](https://spartanbio.com/our-tests/spartan-cyp2c19-test/) and allows a user to run a
DNA test on the [Spartan Cube](https://spartanbio.com/the-spartan-cube/), a rapid DNA analyzer.

One of the goals was to eventually get the Spartan CYP2C19 Test to a "CLIA waived" designation from
the FDA. This would mean that just about anyone could run the test. For reference, many DNA
analyzers&mdash;like the Spartan RX CYP2C19 System, the product's predecessor&mdash;are designated
as high complexity. This means they can only be run in a lab by qualified technicians. An example of
a waived device that anyone can use would be a
[blood glucose meter](https://www.accu-chek.ca/en/microsites/free-diabetes-meter). Waived devices
must be incredibly robust, and be usable with minimal training. This drove us to take great care to
make instructions and training materials simple and user-friendly.

Features this interface includes are:

- Guided workflows for running a test, or a control
- A searchable log of test and control results
- User logins and permissions to protect potentially sensitive patient data
- An optional, time-based lock
- An optional training module

![CYP2C19 UI in XD](/images/cyp2c19-ui/cyp2c19-xd.png 'CYP2C19 UI in XD')

As this was for a medical device, design of the UI fell into Spartan's design control process. The
features above were determined in the concept and feasibility stages, along with a number of
low-level requirements. These were based on regulatory, technical, and end-user requirements.

Once the initial requirements were set, we moved on to design and development of the UI, continually
refining the requirements. We built the prototypes in XD, then used its handoff features and a tight
feedback loop with our developer.

## Guided workflows

Ensuring users could successfully run our test every time was critical to gaining FDA clearance, let
alone CLIA waived status. One of the features we implemented were guided workflows for tests and
controls. Users never had to guess what to do next since they were provided with instructions and
illustrations. For the critical and more complex task of tapping and mixing, we even included a
video of how this process in the UI. You can see what we did for the text workflow in the video
below.

<video src="/images/cyp2c19-ui/cyp2c19-workflow.webm" controls preload="none" muted poster="/images/cyp2c19-ui/cyp2c19-feature.png"></video>

## Searchable log

We included a log so users would be able to go back and check results of a given test at any point
in the future. Since there could potentially be many records in the log, we included a search
function to help users find results more easily. Click on a result in the log would show extended
information about the test result.

![Empty result log](/images/cyp2c19-ui/log-empty.png 'Empty result log')
![Result log populated with results](/images/cyp2c19-ui/log.png 'Result log populated with results')
![Log filtered to controls](/images/cyp2c19-ui/log-search.png 'Log filtered to controls')
![Result screen](/images/cyp2c19-ui/result.png 'Result screen')

Since many of our users would have their own record keeping systems, we also included an export
feature to facilitate entering our results in their systems.

## Logins and lock outs

Although users of this system should be following [HIPPA](https://www.hhs.gov/hipaa/index.html)
guidelines, we also took steps to protect patient data. A key step was to implement user logins in
order to access the system.

![Login screen](/images/cyp2c19-ui/login.png 'Login screen')

The login form was designed to provide clear feedback in a secure way. Instead of entering
credentials, users also had the ability to scan a barcode. This is common in hospital settings where
users are able to scan their ID badges to access equipment.

![Credential validation only shows something is wrong, not what is wrong](/images/cyp2c19-ui/login.png 'Invalid credentials')

An optional setting was included to lock the system after a certain amount of time, so users could
be confident the system had not been tampered with. This lock was able to occur while a test was
running, so we also added test status to the lock screen. The system works with 1 laptop controlling
1 Cube, so it was important to show when the system is busy.

![Locked system with test in progress](/images/cyp2c19-ui/lock-screen.png 'Locked system with test in progress')

The lockout time and users could only be configured by the system's administrator.

![System settings](/images/cyp2c19-ui/settings.png 'System settings')
![User settings](/images/cyp2c19-ui/settings-users.png 'User settings')

## Training Module

To help ensure our users' success in running the system, we included a training module. This module
outlined the entire workflow, from sample collection, to running the analyzer. It included clear
instructions on how to perform each test. In addition to the main instructions, it also provided
some additional pointers.

![Training module](/images/cyp2c19-ui/training.png 'Training module')

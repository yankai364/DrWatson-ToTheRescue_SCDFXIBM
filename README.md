# SCDF Call for Code 2020 - Dr. Watson
**Problem Statement: Integrating with a Smart Environment**
Team Members: Jane Seah, Lim Pei Xuan, Ong Yan Kai, Patrick Lim, Vinnie Chu

## Problem and Motivation
In the event of fire, action needs to be swiftly taken to ensure that occupants egress to safety to the best of their abilities instead of simply waiting for help. If it is an environment that the occupants are familiar with, most would be able to safely exit. However, there are a few possible scenarios that could still put them at risk.

* Lack of familiarity with the building layout
* Blockages occurring due to damage from the fire and lack of awareness on alternative exit routes
* Stranding due to mobility constraints

When situations like this occur, the firemen will have to be able to swiftly identify and gain access to their locations to safely extract the occupants from the fire. This is not an easy task, and the firemen face a myriad of challenges in the process.

* There is an information lag as they rely on the information provided by the caller/witnesses at the scene
	* Occupants at risk may have moved from their last known location
* Additional structural damages and blockages may occur, and exiting via the way they entered may not be an option
	* Searching for alternative routes may take time and lack of familiarity with the building plan may pose further risk

Our team believes that with the rise of "Smart" Infrastructure, we can leverage existing and upcoming technologies to address these challenges. We have built a prototype evacuation and rescue system that could be implemented in existing or new buildings, as long as they have the infrastructure required (WiFi, CCTV Cameras and smoke/fire sensors).

To efficiently and safely evacuate occupants when a fire is detected, the system will make use of WiFi Triangulation to locate occupants and serve personalised optimal escape routes directly to their devices. The algorithm will tap on the data from sensors and CCTV cameras to determine which zones are unsafe/blocked and compute the best route to safety accordingly.

Upon the actuation of the fire alarm, the responders will have access to a dashboard with real-time updates of the situation at the site. The CCTV footage from the site will be processed to automatically identify (Computer Vision) zones that still contain a high number of occupants, as well as the zones where people with mobility impairments were detected (e.g. wheelchair bound occupants). The dashboard will also contain a route finder that computes the fastest and safest way to move between any zone in the building, taking into account damage and blockages.

## Pitch Video
Pitch Video link here

## Solution Architecture
The architecture of your proposed solution*

## Detailed Solution
A hyperlink to your detailed solution* (Long description of your solution)

## Getting Started
(Step-by-step instructions to install the required software and how
to run a demo of your solution)

```sh
pip install requirements.txt
```

## Running the Tests
Running the tests (Explanation and breakdown on how to run tests for the proposed
solution)

## Proof of Concept
(Link to an actual working demo/website)

## Tools and Technologies
i) What your team used to build your solution* (e.g. IBM Cloudant, IBM Cloud
